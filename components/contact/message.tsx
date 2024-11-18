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
        <div className={'flex flex-col px-[30px] md:flex-row py-[20px] md:justify-around bg-gray-200'}>
            <div className="flex flex-col justify-center items-center gap-[30px] md:w-[400px]">
                <p className={'text-black font-bold text-[20px]'}>Get in touch</p>
                <p className={'text-gray-400 font-thin text-center px-[20px] text-[17px]'}>
                    We are available 24/7 by fax, e-mail or by phone. You can also use our quick
                    contact form to ask a question about our services. We would be pleased to answer
                    your questions.
                </p>
            </div>
            <form className={`flex flex-col ${styles.inputs} p-[10px] gap-[15px] md:p-5 md:shadow-[10px] md:w-[600px] border-[1px] bg-gray-200`} onSubmit={handleSubmit}>
                <div className={'flex-col flex md:flex-row gap-[20px] w-[100%]'}>
                    <TextField type="text" placeholder={'Your name'} name={'name'} className={'w-[100%] md:w-[50%] rounded-md'} value={data.name} onChange={handleChange}/>
                    <TextField type="text" name={'phone'} placeholder={'Your Phone number'} value={data.phone}  className={'w-[100%] md:w-[50%] rounded-md'} onChange={handleChange}/>
                </div>
                <TextField name="message" rows={10} placeholder="Your Message" value={data.message} onChange={handleChange}/>
                <div className={'flex-col flex md:flex-row gap-[20px] justify-between items-center'}>
                    <TextField type="email" placeholder={'Email'} className={'w-full md:w-[90%]'} name={'email'} value={data.email} onChange={handleChange}/>
                    <Button type={'submit'} className={`text-white hover:cursor-pointer text-[12px] md:h-[25px]`}
                     variant={'contained'} disabled={!data.message.trim()&& !data.name.trim && !data.phone.trim()} onClick={handleSubmit}>
                        Submit
                    </Button>
                </div>
            </form>
        </div>

    )
}