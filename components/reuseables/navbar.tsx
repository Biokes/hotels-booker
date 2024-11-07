'use client'
import Hamburger from 'hamburger-react'
import {useEffect, useState} from "react";
import styles from '@/styles/reuseable.module.css'
import {Icon} from "@iconify/react";
import '@/app/globals.css'
import Link from "next/link";

export default function Navbar(props:{index:number}){
    const [isOpen, setOpen] = useState<boolean>(false)
    const [isWhite , setScreenColor] = useState<boolean>(false)

    const handleScreenMode=()=>{
        setScreenColor(!isWhite)
    }
    useEffect(()=>{
        if(isWhite){
            document.documentElement.style.setProperty('--background', '#000000');
            document.documentElement.style.setProperty('--text-color', '#ffffff');
            document.documentElement.style.setProperty('--border-color', '#6a326a')
        }else{
            document.documentElement.style.setProperty('--background', '#ffffff');
            document.documentElement.style.setProperty('--text-color', '#000000');
            document.documentElement.style.setProperty('--border-color', '#28323e')
        }
    })
    return (
        <div className={styles.navbar}>
            <section className={'flex md:gap-[10px] items-center'}>
                <div className={`${!isWhite ? 'text-gray-950' : 'text-gray-100'} flex md:hidden`} data-testid="menu">
                    <Hamburger toggled={isOpen} toggle={setOpen}/>
                </div>
                <p className={`${styles.font} ${!isWhite? 'text-gray-700' : 'text-purple-600'} text-nowrap text-lg`}>Royal Villas</p>
            </section>

            <section className={styles.navbarTexts}>
                <Link href={'/'} className={`${props.index===0 ? styles.current : ''}`}>Home</Link>
                <Link href={'/about_us'} className={`${props.index===1 ? styles.current : ''}`}>About us</Link>
                <Link href={'/contact'} className={`${props.index===2 ? styles.current : ''}`}>Contact</Link>
            </section>
            <div className={'flex gap-[10px] justify-center items-center'}>
                <p className={'p-[10px] text-nowrap'} style={{ color: 'var(--text-color)' }}>Book Now</p>
                <div data-testid={'navbar_icon'} className={'border-[1px] rounded-3xl cursor-pointer'} onClick={handleScreenMode}>
                    {!isWhite ?
                        <Icon icon="material-symbols-light:light-mode-outline-rounded" width="2rem" height="2rem" style={{color: "#050505", padding:'5px'}}/>
                        :
                        <Icon icon="ic:twotone-light-mode" width="2rem" height="2rem"  style={{color:"#8ca104", padding:'5px'}}/>
                    }
                </div>
            </div>
        </div>
    )
}