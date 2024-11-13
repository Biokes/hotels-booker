'use client'
import {RoomsData,Reviews} from '@/interfaces/interfaces'
import styles from '@/styles/about.module.css'
import Image from 'next/image'

export default function RoomAndSuites(props:{data: RoomsData[],usersReviews: Reviews[]}){
    return (
        <>
            <div className={'items-center px-[20px] md:px[30px]'}>
                <p style={{color:'var(--text-color)'}} className={'font-bold text-2xl'}>Room and suites</p>
                <p style={{color:'var(--text-color)'}} className={'font-thin text-sm md:text-lg'}>
                    Royal Villas offers the finest accommodations with unique designs that provide both a luxurious and relaxing environment. Specially
                    selected fabrics and finishes vary from room to room, offering guests a variety of beautiful and unique atmospheres to select from.
                </p>
            </div>
            <section className={styles.roomSection}>
                {props.data.map((dataIndex, index) => (
                    <div key={index} className={`md:order-${index} group relative w-full h-full overflow-hidden`}>
                        <div className="w-full h-full transition-transform duration-300 ease-in-out transform group-hover:scale-110 group-hover:brightness-[.8] brightness-[.7]">
                            <Image src={dataIndex.image.src} alt="" width={300} height={300} className="object-cover w-full h-full"/>
                        </div>
                        <div className="absolute inset-0 border-2 lg:border-transparent lg:group-hover:border-white animate-border-animation z-10 pointer-events-none m-[30px] p-[10px]">
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-20">
                                <p className={`${styles.heading} w-[30%]`}>{dataIndex.heading}</p>
                                <p className={styles.description}>{dataIndex.description}</p>
                            </div>
                        </div>
                    </div>

                ))}
            </section>
            <div className={styles.review}>
                <p className={`text-2xl sm:text-4xl font-extrabold capitalize text-center`} style={{backgroundColor:`var(--backgroundColor == #ffffff? #171717: #ffffff)`}}
                >What people say about us
                </p>
                <div className={'flex gap-[10px]'}>
                    <div className={styles.containerBorder}>
                        {
                            props.usersReviews.map((data, index) => (
                                <q key={index} className={styles.scrollContainer}>
                                    <p className={'font-semibold capitalize text-lg'}>{data.heading}</p>
                                    <p className={'capitalize lg:px-[50px]'}>{data.description}</p>
                                    <section className={'flex flex-col justify-center items-center gap-[30px]'}>
                                        <article
                                            className={'w-[100px] overflow-hidden border-[2px] border-gray-400 rounded-5xl '}>
                                            <Image src={data.image} alt='' className={'w-[100px] object-center object-cover h-auto'}/>
                                        </article>
                                        <ul className={'flex gap-[20px]'}>
                                            <p className={'text-amber-600 capitalize font-semibold'}>{data.name}</p>
                                            <p className={'italic uppercase font-semibold '}>{data.role}</p>
                                        </ul>
                                    </section>
                                </q>
                            ))
                        }
                    </div>
                </div>
            </div>
        </>
    )
}