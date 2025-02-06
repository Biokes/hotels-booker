'use client'
import { FormEvent, useEffect, useRef, useState } from "react";
import styles from '@/styles/reuseable.module.css'
import { Button } from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';

export default function Footer() {
    const [email, setEmail] = useState<string>('');
    const [text, setText] = useState<string>('');
    const [isShowingModal, showModal] = useState<boolean>(false);
    const messageRef = useRef<HTMLParagraphElement>(null);
    const [isLoading, setLoading] = useState<boolean>(false)
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
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(!isLoading)
        try {
            const response = await fetch("https://formspree.io/f/mrbeleen", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({ email:email,message:"I want to Join the newsletter." }),
              });
              if (response.ok) {
                setText("Thanks for joining!");
                setEmail("");
                console.log(response)  
              } else {
                  setText("Something went wrong. Please try again later.");
                  console.log(response)  

            }
            setLoading(!isLoading)
            setEmail('')
            setLoading(false)
        }
        catch (error) { 
            if (error instanceof Error) {
                setText("Something went wrong. Please try again later.");
                setLoading(!isLoading)
                console.log(error)  
                return;
            }
            setText("Something went wrong. Please try again.");
            setLoading(false)
        } 
        showModal(true);
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
                            {isLoading ?
                                <Button className={`w-[120px]  text-white h-[25px] hover:cursor-pointer text-[12px]`} variant={'contained'} disabled={!isValid(email)}
                                    onClick={handleSubmit}>
                                    Subscribe
                                </Button>
                                :
                                <CircularProgress color="inherit" size={30} />}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
