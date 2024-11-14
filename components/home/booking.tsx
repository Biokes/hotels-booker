import {FormEvent, useState} from "react";
import {Button} from "@mui/material";
import {Icon} from "@iconify/react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {RoomsData} from '@/interfaces/interfaces'
import Image from "next/image";
import styles from "@/styles/about.module.css";
import splitAndConcat from '@/utils/functions'


export default function Booking(props:{data:RoomsData[]}){
    const [cityName, setCityName] = useState<string>('')
    const [isValidName, setValidName] = useState<boolean>(false)
    const [isLoading, setLoading] = useState<boolean>(false)
    const validate = (data:string)=> /^[a-zA-Z\s'-]+$/.test(data.trim())
    const search = async (e:FormEvent)=>{
        e.preventDefault()
        try{
            setLoading(true)
            const url = `https://flights-sky.p.rapidapi.com/hotels/auto-complete?query=${splitAndConcat(cityName)}`;
            const options = {
                method: 'GET',
                headers: {
                    'x-rapidapi-key': 'aefd2f58efmsh400185bf44345bcp1f080cjsne10cc87dc0e1',
                    'x-rapidapi-host': 'flights-sky.p.rapidapi.com'
                }
            };
            const response = await fetch(url, options);
            console.log(await response.json())
            if( response.ok){
                toast.success('Successfully gotten',{
                    position: 'top-right',
                    progress: undefined,
                    autoClose:5000,
                    hideProgressBar:true,
                    pauseOnHover:true,
                })
            } else {
                throw new Error("Something went wrong,try again later")
            }
            setCityName('')
            setLoading(false)
            setValidName(false)
        }
        catch(error:unknown){
            console.log("Error :",error)
            setCityName('')
            setLoading(false)
            setValidName(false)
            toast.error('Something went wrong',{
                position: 'top-right',
                progress: undefined,
                autoClose:5000,
                hideProgressBar:true,
                pauseOnHover:true,
            })
        }

    }
    return (
        <div className={'flex flex-col gap-[20px] py-[10px] bg-gray-300'}>
             <div className={styles.roomSection}>
                 {(props.data.map((item,index)=> (
                     <div key={index} className={`md:order-${index} group relative w-full h-full overflow-hidden`}>
                         <div className="w-full h-full transition-transform duration-300 ease-in-out transform group-hover:scale-110 group-hover:brightness-[.8] brightness-[.7]">
                             <Image src={item.image.src} alt="" width={300} height={300}
                                    className="object-cover w-full h-full"/>
                         </div>
                         <div className="absolute inset-0 border-2 border-transparent border-white animate-border-animation z-10 pointer-events-none m-[30px] p-[10px]">
                             <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-20">
                                 <p className={styles.heading}>Price: {item.heading}</p>
                                 <p className={styles.description}>{item.description}</p>
                             </div>
                         </div>
                     </div>
                 )))}
             </div>
            <div className={'flex flex-col py-[10px] pl-[20px]'}>
                <p className={'text-gray-600'}>Find Hotel By city</p>
                <form onSubmit={search} className={'flex flex-col w-full  gap-[10px]'}>
                    <input type="text" placeholder="City name..." name={'cityName'} value={cityName}
                           className={'w-[70%] lg:w-[30%] h-[40px] rounded-md text-black p-[5px]'}
                           onChange={(e) => {
                               setCityName(e.target.value)
                               setValidName(validate(cityName.trim()))
                           }}/>
                    <Button type={'submit'} disabled={!isValidName || isLoading} variant={'contained'}
                            className={`w-[30%] h-[30px] text-white lg:w-[15%] lg:h-[40px] md:text-lg hover:cursor-pointer`}>
                        {isLoading ? <Icon icon='line-md:loading-loop' width={15} height={15}/> : "Find city"}
                    </Button>
                </form>
            </div>
            <ToastContainer/>
        </div>

    )
}