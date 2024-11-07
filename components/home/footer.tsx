'use client'
import {FormEvent, useEffect, useRef, useState} from "react";

export default function Footer(){
    const [email,setEmail] = useState<string >('');
    const [text,setText] = useState<string >('');
    const [showMessage,setShowMessage] = useState<boolean >(false);
    const [bgColor, setBgColor] = useState<string>('');
    const messageRef = useRef<HTMLParagraphElement>(null);

    useEffect(() => {
        if (showMessage) {
            const timer = setTimeout(() => {
                setShowMessage(false);
                setText('');
                if (messageRef.current) {
                    const computedStyle = window.getComputedStyle(messageRef.current);
                    const backgroundColor = computedStyle.getPropertyValue('background-color');
                    setBgColor(backgroundColor === '#ffffff' ? '#ffffff' : '#171717');
                }
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [showMessage]);
    const isValid = (email:string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const handleSubmit=(e:FormEvent)=>{
        e.preventDefault()
        setText('Subscribed successfully')
        setShowMessage(!showMessage)
    }
    return (
        <div>
            <p   ref={messageRef} data-testid={'paragraph'} className={`${showMessage && bgColor?'flex':'hidden'} text-center w-full py-[7px]`}
                 style={{ backgroundColor: 'var(--background, black)' }}>
                {text}
            </p>
            <div className={'flex flex-col md:flex-row justify-between md:justify-around '}>
                <p className={'text-bold text-lg'}>opening Hours</p>
                <div className={'flex flex-col'}>
                    <p>Weekdays: 8:00–20:00</p>
                    <p>Weekends: 9:00–18:00</p>
                    <p>© 2019 Royal Villas. All Rights Reserved.</p>
                </div>
                <div>
                    <p>Address</p>
                    <p>6036 Richmond hwy., Alexandria, VA, 2230</p>
                    <p>Call Us: +1 (409) 987–5874</p>
                </div>
                <div>
                    <p>Join our newsletter</p>
                    <div className={'flex'}>
                        <form action="" onSubmit={handleSubmit}>
                            <input data-testid={'email_input'} type={'email'} value={email}
                                   placeholder={'Enter your email'} className={'w-[70%] text-black h-[40px] rounded-sm'}
                                   onChange={(e) => {setEmail(e.target.value)}}/>
                        </form>
                        <button className={'p-[7px_10px] rounded-sm'} disabled={!isValid(email)}
                                type={'submit'}>Subscribe
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}