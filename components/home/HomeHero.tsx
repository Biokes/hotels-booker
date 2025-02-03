'use client'
import styles from '@/styles/reuseable.module.css';
import { Button } from '@mui/material';
import { useState, useEffect } from 'react';
import {setDetails, toggleModal} from "@/redux/userSlice";
import {useDispatch} from "react-redux";
// type Booking = {
//     location: string,
//     checkInDate: string,
//     price:number
// }
export default function HomeHero() {
    const [checkInDate, setCheckInDate] = useState<string>('')
    const [location, setLocation] = useState<string>('')
    const [isValid, setValid] = useState<boolean>(false)
    const dispatch = useDispatch()

    const openModal=()=>{
        dispatch(toggleModal(true),setDetails({location:location, checkInDate: checkInDate}));
        setLocation('');
        setCheckInDate('');
        setValid(false)
    }
    useEffect(()=>{
        setValid(location.trim().length > 0 && checkInDate.length > 0)
    },[location, checkInDate])
    return (
        <div className={'flex flex-col lg:flex-row md:gap-[20px]'}>
            <div className={styles.homeHeroParent}>
                <p className={styles.relax}>Relax & unwind</p>
                <p className={styles.experience}>Experience the luxurious level</p>
                <p className={styles.treatment}>of our spa treatments</p>

                <div className={styles.input}>
                    <p className={'pl-[20px] text-gray-100 text-[15px] font-[650]'}>Make a search</p>
                    <div>
                        <input type="text" value={location} placeholder='los angeles' onChange={(e) => {setLocation(e.target.value);}} />
                        <input type="date" value={checkInDate} onChange={(e) => {setCheckInDate(e.target.value)}} />
                    </div>
                    <Button variant={"contained"} disabled={!isValid} onClick={openModal}>
                        Search
                    </Button>
                </div>
               
            </div>
           
        </div>

    );
}
