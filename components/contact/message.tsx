'use client'
import {Button, TextField} from "@mui/material";
import {Contact} from '@/interfaces/interfaces'
import {ChangeEvent, useState} from "react";
import styles from '@/styles/contact.module.css'

export default function Message(){
    const [data,setData] = useState<Contact>({
        name:"", phone:'',
        message:'', email:''
    })

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    const handleSubmit= async ()=>{

    }

    return (
        <div className={'flex flex-col px-[30px]'}>
            <div className="flex flex-col justify-center items-center gap-[30px]">
                <p className={'text-black font-bold'}>Get in touch</p>
                <p className={'text-gray-400 font-thin text-center px-[20px]'}>
                    We are available 24/7 by fax, e-mail or by phone. You can also use our quick
                    contact form to ask a question about our services. We would be pleased to answer
                    your questions.
                </p>
            </div>
            <form className={`flex flex-col ${styles.inputs} px-[10px] gap-[15px]`} onSubmit={handleSubmit}>
                <div className={'flex-col md:flex gap-[20px]'}>
                    <input type="text" name={'name'} value={data.name} onChange={handleChange}/>
                    <input type="text" name={'phone'} value={data.phone} onChange={handleChange}/>
                </div>
                <TextField
                    name="message" rows={5}
                    placeholder="Your Message"
                    value={data.message}
                    onChange={handleChange}
                    className="border rounded p-2 h-32"
                />
                <div className={'flex-col md:flex gap-[20px]'}>
                    <input type="email" name={'email'} value={data.email} onChange={handleChange}/>
                    <Button type={'submit'}>Submit</Button>
                </div>
            </form>
        </div>

    )
}