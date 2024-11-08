'use client'
import styles from '@/styles/about.module.css';
import Image from 'next/image';
import image from '../../public/about-01-546x516.jpg';

export default function AboutHero(){
    return (
        <div className={'flex flex-col md:flex-row my-[30px] md:justify-around '}>
            <section className={'md:w-[500px] h-auto md:h-[500px]'}>
                <Image alt={''} src={image} className={'w-full h-[100%] object-contain object-center'}/>
            </section>
            <div className={styles.heroText}>
                <p>a few word from us</p>
                <div>
                    <p>
                        Tired of your daily routine? Seeking for a place to stay and rest with
                        your family? You are in the right place! Our spa resort and hotel
                        provides luxury and historic accommodations for travelers. It combines
                        modern style and amenities with traditional values.
                    </p>
                    <p>
                        All rooms are equipped with air conditioners and LCD TVs. Free WI-FI
                        service is available throughout the territory of the hotel. Our
                        restaurant food and meals from world cuisines unite people connecting
                        history and traditions. Experience our warm hospitality, high quality
                        of service and exceptional comfort! Make a reservation for your dream
                        vacation today!
                    </p>
                </div>
            </div>
        </div>
    )
}