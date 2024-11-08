'use client'
import Navbar from "@/components/reuseables/navbar";
import HomeHero from "@/components/home/HomeHero";
import Footer from "@/components/home/footer";

export default function Home(){
    return (
        <>
            <Navbar index={0}/>
            <HomeHero/>
            <Footer/>
        </>
    )
}