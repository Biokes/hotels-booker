'use client'
import React, { useState}  from "react";
import 'react-toastify/dist/ReactToastify.css';
import Image from "next/image";
import styles from "@/styles/about.module.css";
import { RoomsData } from "@/interfaces/interfaces";
import { Button } from "@mui/material";
import SingleBooking from "@/components/reuseables/singleBooking";


export default function Booking(props: { data: RoomsData[] }) {
    const [hoveredIndex, setHoveredIndex] = useState<null| number>(null);
    const [isOpen, setOpen] = useState<boolean>(false)
    return (
        <>
                <div className={'flex flex-col gap-[20px] py-[10px] bg-gray-300'}>
                    <div className={`relative ${styles.roomSection}`}>
                        {props.data.map((item, index) => (
                            <div key={index} className={`md:order-${index} group relative w-full h-full overflow-hidden group cursor-pointer`}
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}>
                                <div className="w-full h-full transition-transform duration-300 ease-in-out transform group-hover:scale-110 group:hover:brightness-[.8] brightness-[.7]">
                                    <Image src={item.image.src} alt="" width={300} height={300} className="object-cover w-full h-full"/>
                                </div>
                                <div className="absolute inset-0 border-2 border-transparent border-white animate-border-animation z-10 pointer-events-none m-[30px] p-[10px]">
                                    <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-20 w-full px-[10px] md:px-0">
                                        <p className={styles.heading}>Price: {item.heading}</p>
                                        <p className={styles.description}>{item.description}</p>
                                    </div>
                                </div>
                                {
                                    hoveredIndex === index && (
                                        <Button className="absolute top-3 right-3 font-semibold px-4 py-2 rounded-lg shadow-lg z-30" variant={'contained'} onClick={()=>{
                                            setOpen(!isOpen)
                                        }}>
                                            Book Now
                                        </Button>
                    )}
                            </div>
                        ))}
                    </div>
                    <SingleBooking open={isOpen } price={}/>
                </div>
        </>
    );
}