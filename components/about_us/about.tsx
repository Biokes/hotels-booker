'use client'
import Navbar from "@/components/reuseables/navbar";
import AboutHeader from "@/components/about_us/header";
import Footer from "@/components/home/footer";
import AboutHero from "@/components/about_us/aboutHero";

export default function About(){
    return (
        <>
            <Navbar index={1}/>
            <AboutHeader/>
            <AboutHero/>
            <Footer/>
        </>
    )
}