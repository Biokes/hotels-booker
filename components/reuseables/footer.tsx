'use client'
import { FormEvent, useEffect, useRef, useState } from "react";
import styles from '@/styles/reuseable.module.css'
import {Button} from "@mui/material";

export default function Footer() {
    const [email, setEmail] = useState<string>('');
    const [text, setText] = useState<string>('');
    const [isShowingModal, showModal] = useState<boolean>(false);
    const messageRef = useRef<HTMLParagraphElement>(null);
    useEffect(() => {
        if (isShowingModal) {
            const timer = setTimeout(() => {
                showModal(false);
                setText('');
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [isShowingModal]);
    const isValid =(email:string):boolean => {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    };
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        setText('Subscribed successfully');
        showModal(true);
        setEmail('')
    };
    return (
        <div className={'flex flex-col '}>
            <p ref={messageRef} data-testid={'paragraph'} className={`text-center w-full py-[7px] ${isShowingModal ? 'flex' : 'hidden'}`} style={{ backgroundColor: 'var(--text-color)' }}>
                {text}
            </p>
            <div className={styles.footerInner}>
                <div>
                    <h4 className="font-bold text-2xl">Opening Hours</h4>
                    <div className={'flex flex-col'}>
                        <p >Weekdays: 8:00–20:00</p>
                        <p >Weekends: 9:00–18:00</p>
                        <p>© 2019 Royal Villas. All Rights Reserved.</p>
                    </div>
                </div>
                <div>
                    <h4 className="text-bold text-2xl font-bold">Address</h4>
                    <p>6036 Richmond hwy., Alexandria, VA, 2230</p>
                    <p>Call Us: +1 (409) 987–5874</p>
                    <p>Email: mainMail@email.com</p>
                </div>
                <div>
                    <h4 className="text-bold text-2xl font-bold">Join our newsletter</h4>
                    <div className={'flex gap-[10px] mb-[20px]'}>
                        <form >
                            <input data-testid={'email_input'} type={'email'} value={email} placeholder={'Enter your email'} required
                                className={'w-[80%] text-black h-[40px] rounded-[7px] mb-[5px] pl-[7px] border-[1px] border-gray-500'}
                                   onChange={(e) => {setEmail(e.target.value);}}/>
                            <Button className={`w-[120px]  text-white h-[25px] hover:cursor-pointer text-[12px]`} variant={'contained'} disabled={!isValid(email)}
                                    onClick={handleSubmit}>
                                Subscribe
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
