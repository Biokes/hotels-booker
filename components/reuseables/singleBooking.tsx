'use client'
import React, {useEffect, useState} from 'react'
import {Button, IconButton, TextField,Modal,Box} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import styles from "@/styles/reuseable.module.css";
import AddCardIcon from "@mui/icons-material/AddCard";

export default function SingleBooking({ price,open }: {price:string,open:boolean}) {
    const [isOpen,setOpening] = useState<boolean>(false)
    function toggleModal(){
        setOpening(!isOpen)
    }
    const confirm = () => {
        return (
            <div className='flex flex-col justify-end gap-[10px]'>
                <IconButton onClick={toggleModal} className={'w-[30px]'}>
                    <CloseIcon/>
                </IconButton>
                <div className='flex flex-col justify-center items-center w-full'>
                    <p className='text-[15px] capitalize text-black'>Payment successful.</p>
                    <p className='text-[15px] text-black'>Thanks</p>
                </div>
            </div>
        )
    }
    useEffect(() => {
        toggleModal()
    }, [isOpen,open]);
    const MakePayment = ({ price }: {price:string}) => {

        const [cardData, setCardData] = useState<{
            cardNumber: string,
            expiryDate: string,
            cvv: string
        }>({cardNumber: "",cvv: '',expiryDate:''})
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
                <div className={`flex justify-between items-center px-[10px] w-full ${styles.textFieldContainer}`}>

                    <div className='flex gap-[5px] ml-[50%] md:ml-[60%]'>
                        <p className='text-[#807D80] text-[15px] font-bold text-nowrap'>Pay with Card </p>
                        <AddCardIcon sx={{ color:'#807D80'}} />
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
                <Button disabled={!isFormValid} variant={'contained'} onClick={() => { pay(); }} sx={{marginLeft:'50px'}}>Pay {price}</Button>
            </div>
        )
    }
    return (
        <>
            <div className="fixed inset-0 bg-blue-200 bg-opacity-80 z-40" onClick={toggleModal}></div>
            <Modal open={isOpen} onClose={toggleModal}>
                <Box sx={{
                    position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                    width: { xs: '90%', sm: '70%', md: '40%' }, backgroundColor: 'background.paper', boxShadow: 24,
                    p: 2, borderRadius: 2, zIndex: 50, overflowY: 'auto', maxHeight: '87vh',
                }}>
                    <MakePayment price={price}/>
                </Box>
            </Modal>
        </>
    )
}


