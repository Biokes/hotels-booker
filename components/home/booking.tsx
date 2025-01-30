'use client'
import React  from "react";
import 'react-toastify/dist/ReactToastify.css';
import Image from "next/image";
import styles from "@/styles/about.module.css";
import ReduxProvider from "@/app/ReduxProvider";
import {RoomsData} from "@/interfaces/interfaces";

export default function Booking(props: { data: RoomsData[] }) {

    return (
        <ReduxProvider>
                <div className={'flex flex-col gap-[20px] py-[10px] bg-gray-300'}>
                    <div className={`relative ${styles.roomSection}`}>
                        {props.data.map((item, index) => (
                            <div key={index} className={`md:order-${index} group relative w-full h-full overflow-hidden`}>
                                <div className="w-full h-full transition-transform duration-300 ease-in-out transform group-hover:scale-110 group-hover:brightness-[.8] brightness-[.7]">
                                    <Image src={item.image.src} alt="" width={300} height={300} className="object-cover w-full h-full"/>
                                </div>
                                <div className="absolute inset-0 border-2 border-transparent border-white animate-border-animation z-10 pointer-events-none m-[30px] p-[10px]">
                                    <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-20 w-full px-[10px] md:px-0">
                                        <p className={styles.heading}>Price: {item.heading}</p>
                                        <p className={styles.description}>{item.description}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
        </ReduxProvider>
    );
}