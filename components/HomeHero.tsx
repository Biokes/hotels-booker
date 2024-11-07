import styles from '@/styles/reuseable.module.css'
import {useState} from "react";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';

import {Button, MenuItem, TextField} from "@mui/material";
import {Icon} from "@iconify/react";
export default function HomeHero(){
    const [name, setName]= useState<string>('')
    const [arrival, setArrival]= useState<Date| null>(new Date())
    const [departure, setDeparture]=useState<Date| null>(new Date())
    const [adults, setAdult]= useState<number>(1)
    const [children,setChildren] = useState<number>(1)
    const handleSubmit=()=>{

    }

    return (
        <div className={'flex flex-col lg:flex-row md:gap-[20px] '}>
            <div className={styles.homeHeroParent}>
                <p className={styles.relax}>Relax & unwind</p>
                <p className={styles.experience}>Experience the luxurious level</p>
                <p className={styles.treatment}>of our spa treatments</p>
                <button className={styles.learn}>Learn more</button>
            </div>
            <div className={styles.heroForm}>
                <p className={'text-nowrap text-2xl font-bold text-gray-700 mb-[10px]'}>Book Now</p>
                <form onSubmit={handleSubmit} className={'flex flex-col w-full gap-[20px]'}>
                    <div>
                        <p className={'text-gray-700 font-thin text-sm'}>Your name</p>
                        <input placeholder={'Your name'} value={name} style={{width: '80%', height: '40px', background: '#ffffff', borderRadius: '3px', paddingInline: '10px 5px', color: '#000000'}}
                               onChange={(e) => {setName(e.target.value)}}/>
                    </div>
                    <div className={'flex lg:flex-col gap-[20px] w-full'}>
                        <div className={'flex flex-col gap-[10px] '}>
                            <p className={'text-gray-700 font-thin text-sm'}>Arrival Date</p>
                            <div className="relative flex">
                                <DatePicker selected={arrival} onChange={(date) => setArrival(date)} minDate={new Date(new Date().setDate(new Date().getDate()))}
                                            dateFormat="dd-MM-yyyy" placeholderText="23 Dec 2023"
                                            className="p-2 border rounded text-sm outline-none focus:ring-2 focus:ring-[#008eef] text-black focus:border-[#008eef]"/>
                                <span className="absolute flex justify-center pointer-events-none">
                                <Icon icon='gala:calendar'
                                      className="h-[18px] w-[18px] ml-[160px] mt-[10px] text-[#475661]"/>
                            </span>
                            </div>
                        </div>
                        <div className={'flex flex-col gap-[10px]'}>
                            <p className={'text-gray-700 font-thin text-sm'}>Departure Date</p>

                            <div className="relative flex">
                                <DatePicker selected={departure} onChange={(date) => setDeparture(date)}
                                            minDate={new Date(new Date().setDate(new Date().getDate() + 1))}
                                            dateFormat="dd-MM-yyyy" placeholderText="23 Dec 2023"
                                            className="w-full p-2 border rounded text-sm outline-none focus:ring-2 focus:ring-[#008eef] text-black focus:border-[#008eef]"/>
                                <span className="absolute flex justify-center pointer-events-none">
                                <Icon icon='gala:calendar' className="h-[18px] w-[18px] ml-[160px] mt-[10px] text-[#475661]"/>
                            </span>
                            </div>
                        </div>
                    </div>
                    <div className={'flex flex-col gap-[10px]'}>
                        <label className="text-gray-700 font-thin text-sm">No of Children</label>
                        <select value={children} onChange={(e) => setChildren(parseInt(e.target.value))}
                                className="w-4/5 bg-white border border-gray-300 rounded p-2 text-gray-700">
                            <option value="" disabled>Select number of children</option>
                            {[1, 2, 3, 4].map((value) => (<option key={value}
                                                                  value={value}>{value} {value === 1 ? 'Child' : 'Children'}</option>))}
                        </select>
                    </div>
                    <div className={'flex flex-col gap-[10px]'}>
                        <label className="text-gray-700 font-thin text-sm">No of Adults</label>
                        <select value={adults} onChange={(e) => setAdult(parseInt(e.target.value))} className="w-4/5 bg-white border border-gray-300 rounded p-2 text-gray-700">
                            <option value="" disabled>Select number of adults</option>
                            {[1, 2, 3, 4].map((value) => (<option key={value} value={value}>{value} {value === 1 ? 'Adult' : 'Adults'}</option>))}
                        </select>
                    </div>
                </form>
                <Button sx={{textTransform:'none', marginTop:'10px'}} variant={'contained'}>Book Room</Button>
            </div>
        </div>
)
}