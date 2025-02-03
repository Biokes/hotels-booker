'use client'
import Hamburger from 'hamburger-react'
import {useEffect, useState} from "react";
import styles from '@/styles/reuseable.module.css'
import '@/app/globals.css'
import Link from "next/link";
import {RootState} from "@/redux/store";
import { useAppSelector } from '@/redux/store';
import {useDispatch} from "react-redux";
import {toggleModal} from "@/redux/userSlice";
import BookingModal from "@/components/home/bookModal";

export default function Navbar(props: { index: number }) {
    const [isOpen, setOpen] = useState<boolean>(false);
    const color = useAppSelector((state: RootState) => state.user.color);
    const dispatch = useDispatch()

    useEffect(() => {
        document.documentElement.style.setProperty('--background', color === "#000000" ? '#000000' : '#ffffff');
        document.documentElement.style.setProperty('--text-color', color === "#000000" ? '#ffffff' : '#000000');
        document.documentElement.style.setProperty('--border-color', color === "#000000" ? '#ea00fd' : '#46505b');
    }, [color]);
    const toggle =()=>{
        dispatch(toggleModal(!isOpen));
    }
    return (
        <div>
            <div className={`${styles.navbar} ${color === "#000000" ? styles.darkMode : styles.lightMode}`}>
            <section className={'flex md:gap-[10px] items-center'}>
                <div className={`flex md:hidden h-[50px]`} data-testid="menu">
                    <Hamburger toggled={isOpen} toggle={setOpen} color={color === "#ffffff" ? "#050505" : "#ea00fd"}/>
                </div>
                <p className={`${styles.font} ${color === "#ffffff" ? 'text-gray-700' : 'text-[#ea00fd]'} text-nowrap text-lg`}>
                    Royal Villas
                </p>
            </section>
            <section className={styles.navbarTexts}>
                <Link href={'/'} className={`${props.index === 0 ? styles.current : styles.navbarInnerText}`}>Home</Link>
                <Link href={'/about_us'} className={`${props.index === 1 ? styles.current : styles.navbarInnerText} `}>About us</Link>
                <Link href={'/contact'} className={`${props.index === 2 ? styles.current :  styles.navbarInnerText}`}>Contact</Link>
            </section>
            <div className={'flex gap-[10px] justify-center items-center'}>
                    <button className={styles.book} onClick={toggle}>
                        Book Now
                    </button>
            </div>
        </div>
            {isOpen &&
                <div className={`${isOpen ? styles.slideOut :styles.slideIn}  transform transition-all duration-[700]`}>
                    <Link href={'/'} className={` ${props.index === 0 ? styles.current : styles.navbarInnerText} hover:${styles.current}`}>Home</Link>
                    <Link href={'/about_us'} className={` ${props.index === 1 ? styles.current : styles.navbarInnerText} hover:${styles.current}`}>About us</Link>
                    <Link href={'/contact'} className={` ${props.index === 2 ? styles.current : styles.navbarInnerText}  hover:${styles.current}`}>Contact</Link>
                </div>
            }
            <BookingModal />
        </div>
    )
}
