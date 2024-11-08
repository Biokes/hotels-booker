'use client'
import Navbar from "@/components/reuseables/navbar";
import AboutHeader from "@/components/about_us/header";
import Footer from "@/components/home/footer";

export default function About(){
    return (
        <>
            <Navbar index={1}/>
            <AboutHeader/>
            <Footer/>
        </>
    )
}