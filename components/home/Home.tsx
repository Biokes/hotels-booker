'use client'
import Navbar from "@/components/reuseables/navbar";
import HomeHero from "@/components/home/HomeHero";

export default function Home(){
    return (
        <>
            <Navbar index={0}/>
            <HomeHero/>
        </>
    )
}