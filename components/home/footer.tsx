'use client'
import { FormEvent, useEffect, useRef, useState } from "react";
import styles from '@/styles/reuseable.module.css'
import {Button} from "@mui/material";

export default function Footer() {
    const [email, setEmail] = useState<string>('');
    const [text, setText] = useState<string>('');
    const [showMessage, setShowMessage] = useState<boolean>(false);
    const messageRef = useRef<HTMLParagraphElement>(null);
    useEffect(() => {
        if (showMessage) {
            const timer = setTimeout(() => {
                setShowMessage(false); // Hide the message after 5 seconds
                setText('');
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [showMessage]);
    const isValid = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        setText('Subscribed successfully');
        setShowMessage(true);
        setEmail('')
    };
    return (
        <div className={'flex flex-col'}>
            <p ref={messageRef} data-testid={'paragraph'}
               className={`text-center w-full py-[7px] ${showMessage ? 'flex' : 'hidden'}`}
               style={{ backgroundColor: 'var(--text-color)' }}>
                {text}
            </p>
            <div className={styles.footerInner}>
                <div>
                    <p className="font-bold text-2xl">Opening Hours</p>
                    <div className={'flex flex-col'}>
                        <p >Weekdays: 8:00–20:00</p>
                        <p >Weekends: 9:00–18:00</p>
                        <p>© 2019 Royal Villas. All Rights Reserved.</p>
                    </div>
                </div>
                <div>
                    <p className="text-bold text-2xl font-bold">Address</p>
                    <p>6036 Richmond hwy., Alexandria, VA, 2230</p>
                    <p>Call Us: +1 (409) 987–5874</p>
                    <p>Email: mainMail@email.com</p>
                </div>
                <div>
                    <p className="text-bold text-2xl font-bold">Join our newsletter</p>
                    <div className={'flex gap-[20px]'}>
                        <form >
                            <input
                                data-testid={'email_input'} type={'email'} value={email} placeholder={'Enter your email'}
                                className={'w-[80%] text-black h-[30px] rounded-sm my-[10px] pl-[10px]'} onChange={(e) => setEmail(e.target.value)}/>
                            <Button sx={{width:'60%', paddingBlock:'5px'}} disabled={!isValid(email)} onClick={handleSubmit}>
                                Subscribe
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
