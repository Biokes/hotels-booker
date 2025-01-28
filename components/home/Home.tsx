'use client'
import Navbar from "@/components/reuseables/navbar";
import HomeHero from "@/components/home/HomeHero";
import Footer from "@/components/home/footer";
import Booking from "@/components/home/booking";
import {RoomsData} from "@/interfaces/interfaces";
import room from '@/public/42f4ea6f90208cd80b8848bca0bcdfc3.jpg'
import vacation from '@/public/17ca06c108252e23ed8f230c894fe736.jpg'
import dubaiHotel from '@/public/7aa19415266b8ad0ad570b7d2ecc3e8e.jpg'
import luxury from '@/public/7f6f0a8668aa2da61d9025859406e2f1.jpg'
import japan from '@/public/download (4).jpeg'
import ReduxProvider from "@/app/ReduxProvider";

export default function Home(){
    const data : RoomsData[] = [
        {
            image: room,
            heading: "$128.50 / night | $899.50 / week",
            description: "A room of luxurious comfort in New York City"
        },
        {
            image: vacation,
            heading: "IDR 3,000,000 / night | IDR 21,000,000 / week",
            description: "A vacation paradise with stunning amenities in Bali"
        },
        {
            image: dubaiHotel,
            heading: "AED 1,285.00 / night | AED 8,995.00 / week",
            description: "A high-end hotel experience in Dubai with skyline views"
        },
        {
            image: luxury,
            heading: "€500.00 / night | €3,500.00 / week",
            description: "A premium luxury suite for ultimate relaxation in Paris"
        },
        {
            image: room,
            heading: "AUD 300.00 / night | AUD 2,100.00 / week",
            description: "A beachfront villa in the stunning Whitsundays, Australia"
        },
        {
            image: japan,
            heading: "JPY 15,000 / night | JPY 105,000 / week",
            description: "A secluded mountain retreat in the Japanese Alps"
        }
    ]
    return (
        <ReduxProvider>
             <Navbar index={0}/>
            <HomeHero/>
            <Booking data={data}/>
            <Footer/>
        </ReduxProvider>
    )
}