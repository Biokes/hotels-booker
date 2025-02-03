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
    // const [location , setLocation] = useState<string>('')
    // const [checkInDate , setCheckInDate] = useState<string>('')
    // const [isValid, setValid] = useState<boolean>(false)
    const dispatch = useDispatch()
    const isOpen = useSelector((state:RootState) => state.user.isOpen)
    const toggle = ()=>{
        dispatch(toggleModal(false))
    }
    // useEffect(() => {
    //     setValid( location.trim().length>0 && checkInDate.trim().length>0)
    //     isFormValid()
    // }, [location, checkInDate]);
    // const isFormValid=()=>{
    //          return location.trim().length>0 && checkInDate.trim().length>0
    // }
    // function  ModalForm(){
    //     return  (
    //         <div>
    //                 <Box className={'flex justify-between items-center border-b-[1px]'}>
    //                     <Typography variant="h6" component="h2" sx={{
    //                         color: '#475661', fontSize: {xs: '15px', sm: '20px'}, width: '80%', margin: '10px'
    //                     }}>
    //                         Search by Location
    //                     </Typography>
    //                     <IconButton onClick={toggle} className={'hover:bg-red-500 hover:text-white transform transition-all duration-[300]'}>
    //                         <CloseIcon/>
    //                     </IconButton>
    //                 </Box>
    //                 <Box sx={{paddingInline: {xs: '20px', md: '30px]'}, paddingTop: '20px'}}>
    //                     <section className={styles.sectionPack}>
    //                         <div>
    //                             <p>Location</p>
    //                         <input type="text" placeholder="Eg. Lagos" value={location} name={'location'} onChange={(event)=>{
    //                                 setLocation(event.target.value);
    //                             }} />
    //                         </div>
    //                     </section>
    //                     <section className={styles.sectionPack}>
    //                         <Box>
    //                             <p>Arrival Date</p>
    //                         <input type="date" value={checkInDate} onChange={(event)=>{
    //                                 setCheckInDate(event.target.value)
    //
    //                             }} placeholder={'2025-12-20'} name={'checkInDate'}
    //                                    min={new Date().toISOString().split('T')[0]} required
    //                             />
    //                         </Box>
    //                     </section>
    //                 </Box>
    //                 <DialogActions sx={{mt: 3}}>
    //                     <Button variant="outlined" onClick={toggle} className={'hover:bg-red-400 hover:text-white'} >Cancel</Button>
    //                     <Button variant="contained" onClick={proceedToCheckHotels} disabled={!isValid}>
    //                         Proceed
    //                     </Button>
    //                 </DialogActions>
    //         </div>
    //     )
    // }
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
    const hotelsInLocation = () => {


        return (
            <div>
                <Box className={'flex justify-between items-center border-b-[1px] transform transition-all duration-[300] '}>
                    <div className={'flex gap-[10px]'}>
                        <IconButton onClick={() => {toggle()}} className={'hidden'}>
                            <KeyboardBackspaceIcon />
                        </IconButton>
                        <Typography variant="h6" component="h4" sx={{
                            color: '#475661', fontSize: { xs: '15px', sm: '17px' }, width: '80%', margin: '7px'
                        }}>
                            Available Hotels
                        </Typography>
                    </div>
                    <IconButton onClick={toggle} className={'hover:bg-red-500 hover:text-white transform transition-all duration-[300]'}>
                        <CloseIcon />
                    </IconButton>
                </Box>
                <div className={'flex flex-col gap-[10px] overflow-auto mt-[20px]'}>
                    {hotelsData.map((hotel, index) => (
                        <div key={index}
                            className={`flex gap-[10px] border-[1px] border-gray-200 rounded-md p-[10px] bottom-1 ${styles.animate}
                                    hover:cursor-pointer transform transition-all duration-[300] hover:rounded-md`}
                        >
                            <div className={'w-[150px] h-[150px] overflow-hidden rounded-md border-[2px]'}>
                                <Image src={hotel.imageURl} alt={'hotel'} width={150} height={150} className={'w-full h-full object-center object-cover'} />
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
    useEffect(() => {
        setModalContent(hotelsInLocation());
    },[]);
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
                    {modalContent}
                </Box>
            </Modal>
        </>
    );
}