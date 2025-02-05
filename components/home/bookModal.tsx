'use client'
import {Modal, Box, Typography, IconButton, DialogActions, Button, TextField} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import React, {ReactNode, useEffect, useState} from 'react';
import Image from 'next/image';
import styles from '@/styles/reuseable.module.css';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import {useDispatch, useSelector} from "react-redux";
import {toggleModal} from "@/redux/userSlice";
import {RootState} from "@/redux/store";
import AddCardIcon from '@mui/icons-material/AddCard';

export default function BookingModal() {
    const dispatch = useDispatch()
    const isOpen = useSelector((state:RootState) => state.user.isOpen)
    const toggle = ()=>{
        dispatch(toggleModal(false))
    }
    const hotelsData = [
        {
            imageURl: "https://media.istockphoto.com/id/119926339/photo/resort-swimming-pool.jpg?s=612x612&w=0&k=20&c=9QtwJC2boq3GFHaeDsKytF4-CavYKQuy1jBD2IRfYKc=",
            price: "400,000",
            name: "The Guest House",
            rating: '4.7'
        },
        {
            imageURl: "https://as2.ftcdn.net/jpg/00/09/21/15/1000_F_9211505_d4hxfNtPeTfgt7AeGmoO7u79P2hwxkoQ.jpg",
            price: "300,000",
            name: 'Lodge Hotels',
            rating: "4.5"
        },
        {
            imageURl: "https://as2.ftcdn.net/jpg/02/95/21/53/1000_F_295215313_mTUn9iAqmfVHCiEGfOuaz9tmjG0JDa1p.jpg",
            price: "200,000",
            name: 'Green light Suites',
            rating: '4.5'
        },
    ];
    const [isOpenPayment, setOpenPayment] = useState<boolean>(false);
    const [hotelSelected, setSelection] = useState<{imageURl:string,price:string,name:string,rating:string}>({imageURl:'',price:'',name:'',rating:''})
    const togglePaymentSelectionModal = () => { 
        setOpenPayment(!isOpenPayment)
    }
    const hotelsInLocation = () => {
        return (
            <div className={'w-full h-full'}>
                <Box className={'flex justify-between items-center border-b-[1px] transform transition-all duration-[300] '}>
                    <div className={'flex gap-[10px]'}>
                        <IconButton onClick={() => {toggle()}} className={'hidden'}>
                            <KeyboardBackspaceIcon />
                        </IconButton>
                        <Typography variant="h6" component="h4" sx={{
                            color: '#475661', fontSize: { xs: '15px', sm: '17px' }, width: '80%', margin: '7px'
                        }} className={'text-nowrap'}>
                            Available Hotels
                        </Typography>
                    </div>
                    <IconButton onClick={toggle} className={'hover:bg-red-500 hover:text-white transform transition-all duration-[300]'}>
                        <CloseIcon />
                    </IconButton>
                </Box>
                <div className={'flex flex-col gap-[10px] overflow-auto mt-[20px] h-[80%]'}>
                    {hotelsData.map((hotel, index) => (
                        <div className={`flex gap-[10px] border-[1px] border-gray-200 rounded-md p-[7px] bottom-1 hover:cursor-pointer transform transition-all duration-[300] hover:rounded-md`}
                            key={index} onClick={() => {setSelection(hotel);togglePaymentSelectionModal()}}>
                            <div className={'w-[100px] h-[100px] overflow-hidden rounded-md border-[2px]'}>
                                <Image src={hotel.imageURl} alt={'hotel'} width={100} height={100} className={'w-full h-full object-center object-cover'} />
                            </div>
                            <section className={styles.hotelCardTexts}>
                                <h4>{hotel.name}</h4>
                                <p >price: <strong>N {hotel.price}</strong></p>
                                <p>ratings: <strong>{hotel.rating}</strong></p>
                            </section>
                        </div>
                    ))}
                </div>
               
                <DialogActions sx={{ mt: 3 }}>
                    <Button variant="outlined" onClick={toggle} className={'hover:bg-red-400 hover:text-white'} >Cancel</Button>
                </DialogActions>
            </div>  
        )
    }
    const confirm = () => {
        return (
            setModalContent(
                <div className='flex flex-col justify-end gap-[10px]'>
                    <IconButton onClick={() => {toggle()}}>
                        <CloseIcon/>
                    </IconButton>
                    <p className='text-[15px] capitalize text-black'>Payment made successfully</p>
                </div>
            )
        );
    }

    const MakePayment = ({ price }: {price:string}) => {
       
        const [cardData, setCardData] = useState<{ cardNumber: string, expiryDate: string, cvv: string }>({cardNumber: "",cvv: '',expiryDate:''})
        const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            let value = e.target.value.replace(/\D/g, '');
            value = value.slice(0, 16);
            const formattedValue = value.match(/.{1,4}/g)?.join(" ") || "";
            setCardData((prev) => ({ ...prev, cardNumber: formattedValue }));
        };
        
        const handleExpiryDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 4) value = value.slice(0, 4);
            let month = value.slice(0, 2);
            let year = value.slice(2, 4);
            const currentYear = new Date().getFullYear() % 100;
            if (month.length === 2 && (parseInt(month, 10) < 1 || parseInt(month, 10) > 12)) {
                month = "12";
            }
            if (year.length === 2 && (parseInt(year, 10) < currentYear || parseInt(year, 10) > currentYear + 10)) {
                year = currentYear.toString();
            }
            const formattedValue = month + (year ? "/" + year : "");
            setCardData((prev) => ({ ...prev, expiryDate: formattedValue }));
        };
        
            
        const pay = () => {
            setOpenPayment(false);
            confirm()
        }

        const handleCVVChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            let value = e.target.value.replace(/\D/g, ''); 
            if (value.length > 3) value = value.slice(0, 3);
            setCardData({ ...cardData, cvv: value });
        };

        const validateExpiryDate = (date: string) => {
            const [month, year] = date.split('/');
            const currentYear = new Date().getFullYear() % 100;
            const currentMonth = new Date().getMonth() + 1;
            if (!month ||!year ||+month < 1 ||+month > 12 ||+year < currentYear ||(+year === currentYear && +month < currentMonth)) {return false;}
            return true;
        };

        const [isFormValid,setFormValid] = useState<boolean>(false);
        useEffect(() => {
            setFormValid((cardData.cardNumber.replace(/\s/g, "").length >= 16 ||  validateExpiryDate(cardData.expiryDate))
                && cardData.cvv.length >= 3 && cardData.cvv.length <= 4)
        }, [cardData.cvv, cardData.cardNumber, cardData.expiryDate]);

        return (
            <div className='w-full p-[10px]'>
                <div className={`flex justify-betweeen items-center px-[10px] ${styles.textFieldContainer}`}>
                    <IconButton onClick={() => {togglePaymentSelectionModal()}}>
                        <KeyboardBackspaceIcon />
                    </IconButton>
                    <div className='flex gap-[5px] ml-[100px]'>
                        <p className='text-blue-400 text-[15px] font-bold text-nowrap'>Pay with Card </p>
                        <AddCardIcon sx={{ color:'blue'}} />
                    </div>
                </div>
                <div className={`mt-[20px] flex-col flex justify-center items-center gap-[10px] mb-[10px] ${styles.textFields}`}>
                    <TextField
                        label="Card Number"
                        variant="outlined"
                        value={cardData.cardNumber}
                        onChange={handleCardNumberChange}
                        inputProps={{ maxLength: 19, minLength:16}}
                    />
                    <TextField
                        label="Expiry Date (MM/YY)"
                        variant="outlined"
                        value={cardData.expiryDate}
                        onChange={handleExpiryDateChange}
                        inputProps={{ maxLength: 5 }}
                    />
                    <TextField
                        label="CVV"
                        variant="outlined"
                        value={cardData.cvv}
                        onChange={handleCVVChange}
                        inputProps={{ maxLength: 3 }}
                        type="number"
                    />
                </div>
                <Button disabled={!isFormValid} variant={'contained'} onClick={() => { pay()}}>Pay {price}</Button>
            </div>
        )
    }
    useEffect(() => {
        setModalContent(hotelsInLocation());
    }, []);
    
    const [modalContent, setModalContent] = useState<ReactNode>(hotelsInLocation());
    if (!isOpen) return null;
    return (
        <>
            <div className="fixed inset-0 bg-customBlue_dark bg-opacity-80 z-40" onClick={toggle}></div>
            <Modal open={isOpen} onClose={toggle}>
                <Box sx={{
                    position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                    width: { xs: '90%', sm: '70%', md: '40%' }, backgroundColor: 'background.paper', boxShadow: 24,
                    p: 2, borderRadius: 2, zIndex: 50, overflowY: 'auto', maxHeight: '87vh',
                }}> 
                    {!isOpenPayment ? modalContent : <MakePayment price={hotelSelected.price} />}
                </Box>
            </Modal>
        </>
    );
}