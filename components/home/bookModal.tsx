'use client'
import {Modal, Box, Typography, IconButton, DialogActions, Button} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import React, {ReactNode, useEffect, useState} from 'react';
import Image from 'next/image';
import styles from '@/styles/reuseable.module.css';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import {useDispatch, useSelector} from "react-redux";
import {toggleModal} from "@/redux/userSlice";
import {RootState} from "@/redux/store";
export default function BookingModal() {
    const [formValues, setFormValues]= useState({
        location:'',
        checkInDate:'',
        price:''
    }) ;
    const dispatch = useDispatch()
    const isOpen = useSelector((state:RootState) => state.user.isOpen)
    const toggle = ()=>{
        dispatch(toggleModal(!isOpen))
    }
    const handleChange=(event: React.ChangeEvent<HTMLInputElement>)=>{
        const { name, value } = event.target;
        setFormValues(prevValues => ({...prevValues,[name]: value
        }));
    }

    const isFormValid=()=>{
        return formValues.location.trim().length>0 && formValues.checkInDate
    }
    function  ModalForm(){
        return  (
            <div>
                <form>
                    <Box className={'flex justify-between items-center border-b-[1px]'}>
                        <Typography variant="h6" component="h2" sx={{
                            color: '#475661', fontSize: {xs: '15px', sm: '20px'}, width: '80%', margin: '10px'
                        }}>
                            Search by Location
                        </Typography>
                        <IconButton onClick={toggle} className={'hover:bg-red-500 hover:text-white transform transition-all duration-[300]'}>
                            <CloseIcon/>
                        </IconButton>
                    </Box>
                    <Box sx={{paddingInline: {xs: '20px', md: '30px]'}, paddingTop: '20px'}}>
                        <section className={styles.sectionPack}>
                            <div>
                                <p>Location</p>
                                <input type="text" placeholder="Eg. Lagos" name={'location'} onChange={handleChange} />
                            </div>
                        </section>
                        <section className={styles.sectionPack}>
                            <Box>
                                <p>Arrival Date</p>
                                <input type="date" onChange={handleChange} placeholder={'2025-12-20'} name={'checkInDate'}
                                       min={new Date().toISOString().split('T')[0]} required
                                />
                            </Box>
                        </section>
                    </Box>
                    <DialogActions sx={{mt: 3}}>
                        <Button variant="outlined" onClick={toggle} className={'hover:bg-red-400 hover:text-white'} >Cancel</Button>
                        <Button variant="contained" onClick={proceedToCheckHotels} disabled={!isFormValid()}>
                            Proceed
                        </Button>
                    </DialogActions>
                </form>
            </div>
        )
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
    const searchAgain = ()=>{
        setModalContent(ModalForm);
    }
    const hotelsInLocation = () => (
        <div>
            <Box className={'flex justify-between items-center border-b-[1px] transform transition-all duration-[300] '}>
                <div className={'flex gap-[10px]'}>
                    <IconButton onClick={searchAgain}>
                        <KeyboardBackspaceIcon/>
                    </IconButton>
                    <Typography variant="h6" component="h4" sx={{
                        color: '#475661', fontSize: {xs: '15px', sm: '17px'}, width: '80%', margin: '7px'
                    }}>
                        Available Hotels
                    </Typography>
                </div>
                <IconButton onClick={toggle} className={'hover:bg-red-500 hover:text-white transform transition-all duration-[300]'}>
                    <CloseIcon/>
                </IconButton>
            </Box>
            <div className={'flex flex-col gap-[10px] overflow-auto mt-[20px]'}>
                {hotelsData.map((hotel, index) => (
                    <div key={index}
                         className={`flex gap-[10px] border-[1px] border-gray-200 rounded-md p-[10px] bottom-1 hover:bg-gray-200
                                     hover:cursor-pointer transform transition-all duration-[300] hover:rounded-md`}
                         onClick={()=>setFormValues(prevValues => ({...prevValues,['price']: hotel.price}))}>
                        <div className={'w-[40%] h-[40%] overflow-hidden rounded-md border-[2px]'}>
                            <Image src={hotel.imageURl} alt={'hotel'} width={200} height={200} className={'w-full h-full object-center object-cover'} />
                        </div>
                        <section className={styles.hotelCardTexts}>
                            <h4>{hotel.name}</h4>
                            <p >price: <strong>N {hotel.price}</strong></p>
                            <p>ratings: <strong>{hotel.rating}</strong></p>
                        </section>
                    </div>
                ))}
            </div>
            <DialogActions sx={{mt: 3}}>
                <Button variant="outlined" onClick={toggle} className={'hover:bg-red-400 hover:text-white'} >Cancel</Button>
            </DialogActions>
        </div>

    );
    const proceedToCheckHotels = () => {
        setModalContent(hotelsInLocation());
    };
    const [modalContent, setModalContent] = useState<ReactNode>(ModalForm);
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
                    {modalContent}
                </Box>
            </Modal>
        </>
    );
}