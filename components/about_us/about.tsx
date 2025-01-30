'use client'
import Navbar from "@/components/reuseables/navbar";
import AboutHeader from "@/components/about_us/header";
import AboutHero from "@/components/about_us/aboutHero";
import RoomAndSuites from "@/components/about_us/roomAndSuites";
import {Reviews, RoomsData} from "@/interfaces/interfaces";
import img1 from '@/public/grid-gallery-1-370x276.jpg'
import img2 from '@/public/grid-gallery-2-370x276.jpg'
import img3 from '@/public/grid-gallery-3-370x276.jpg'
import img4 from '@/public/grid-gallery-4-370x276.jpg'
import img5 from '@/public/grid-gallery-5-370x276.jpg'
import img6 from '@/public/grid-gallery-6-370x276.jpg'
import review1 from '@/public/about-05-100x100.jpg'
import review2 from '@/public/about-02-100x100.jpg'
import review3 from '@/public/about-04-100x100.jpg'

export default function About(){
    const collection:RoomsData[] = [
        {image:img1, heading:'single Room',description:'each room has its own unique decor and Arrangement'},
        {image:img2, heading:'Double Room',description:'each room has its own unique arrangement and decor'},
        {image:img3, heading:'Twin Room',description:'each room has its own unique arrangement and decor'},
        {image:img4, heading:'Family room',description:'each room has its own unique arrangement and decor'},
        {image:img5, heading:'Executive Suite',description:'each room has its own unique arrangement and decor'},
        {image:img6, heading:'VIP Suite',description:'each room has its own unique arrangement and decor'},
    ]
    const review: Reviews[] =[
        {image: review1, heading: 'perfect Resort and spa services', name: "jane neddery", role: "office manager",
            description:'The moment you walk out of the airport, you are greeted with a warm welcome from royal villas staff member, and it doesn\'t stop.' +
                'the staff truly seems to love their job and want to make sure your visit and stay is everything you expect.'},
        {image:review2,heading :'Great atmosphere and level of customer',name:'sam brown',role:'journalist',
        description:'Got a royal villa certificate as a gift a few months ago,an di really had a fantastic spa experience there.i arrived early & was greeted warmly at the door,' +
            'Surprisingly, i didn\'t have to wait .Everything was perfect. Highly recommend this amazing place to everybody.'},
        {image:review3,heading :'Wonderful and friendly environment',name:'Julie adams',role:'babysitter',
            description:'no better way to rediscover the joy in everyday living than that at royal villas. Second time visit and experience was just as powerful as the first.' +
                'They exceeded all my expectations again, this is the first place to visit if you want a better service.'}
    ]
    return (
        <>
            <Navbar index={1}/>
            <AboutHeader text={'About us'}/>
            <AboutHero/>
            <RoomAndSuites data={collection} usersReviews={review}/>
        </>
    )
}