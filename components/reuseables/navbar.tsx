'use client'
import Hamburger from 'hamburger-react'
import {useEffect, useState} from "react";
import styles from '@/styles/reuseable.module.css'
import { Icon } from "@iconify/react";
import '@/app/globals.css'
import Link from "next/link";
import {RootState, useAppDispatch} from "@/redux/store";
import { useAppSelector } from '@/redux/store';
import { setColor } from "@/redux/userSlice";
import BookModal from "@/components/home/bookModal";

export default function Navbar(props: { index: number }) {
    const [isOpen, setOpen] = useState<boolean>(false);
    const color = useAppSelector((state: RootState) => state.user.color);
    const dispatch = useAppDispatch();
    const [isModalOpen, setModalOpen] = useState<boolean>(false)
    const handleScreenMode = () => {
        const newColor = color === "#ffffff" ? "#000000" : "#ffffff";
        dispatch(setColor(newColor));
    };

    useEffect(() => {
        document.documentElement.style.setProperty('--background', color === "#000000" ? '#000000' : '#ffffff');
        document.documentElement.style.setProperty('--text-color', color === "#000000" ? '#ffffff' : '#000000');
        document.documentElement.style.setProperty('--border-color', color === "#000000" ? '#ea00fd' : '#46505b');
    }, [color]);
    const toggleModal =()=>{
        setModalOpen(!isModalOpen);
    }
    return (
        <div className={'py-[10px]'}>
            <div className={`${styles.navbar} ${color === "#000000" ? styles.darkMode : styles.lightMode}`}>
            <section className={'flex md:gap-[10px] items-center'}>
                <div className={`flex md:hidden`} data-testid="menu">
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
                    <button className={styles.book} onClick={toggleModal}>
                        Book Now
                    </button>
                <div data-testid={'navbar_icon'} className={'border-[2px] rounded-3xl cursor-pointer hidden md:flex shadow'} onClick={handleScreenMode} style={{borderColor:'var(--border-color)'}}>
                    {color === "#ffffff" ?
                        <Icon icon="material-symbols-light:light-mode-outline-rounded" width="2rem" height="2rem" style={{ color: "#050505", padding: '5px'}} />
                        :
                        <Icon icon="ic:twotone-light-mode" width="2rem" height="2rem" style={{ color: "#ea00fd", padding: '5px'}} />
                    }
                </div>
            </div>
        </div>
            {isOpen &&
                <div className={`${isOpen ? styles.slideOut :styles.slideIn}  transform transition-all duration-[700]`}>
                    <Link href={'/'} className={` ${props.index === 0 ? styles.current : styles.navbarInnerText} hover:${styles.current}`}>Home</Link>
                    <Link href={'/about_us'} className={` ${props.index === 1 ? styles.current : styles.navbarInnerText} hover:${styles.current}`}>About us</Link>
                    <Link href={'/contact'} className={` ${props.index === 2 ? styles.current : styles.navbarInnerText}  hover:${styles.current}`}>Contact</Link>
                    <div data-testid={'navbar_icon'} className={'border-[2px] rounded-3xl cursor-pointer'} onClick={handleScreenMode} style={{borderColor:'var(--border-color)'}}>
                        {color === "#ffffff" ?
                            <Icon icon="material-symbols-light:light-mode-outline-rounded" width="2rem" height="2rem" style={{ color: "#050505", padding: '5px'}} />
                            :
                            <Icon icon="ic:twotone-light-mode" width="2rem" height="2rem" style={{ color: "#ea00fd", padding: '5px'}}/>
                        }
                    </div>
                </div>
            }
            {
                isModalOpen && (
                    <BookModal isOpen={isModalOpen} onClose={toggleModal}/>
                )
            }
        </div>
    )
}
