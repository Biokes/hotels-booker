'use client'
import Navbar from "@/components/reuseables/navbar";
import AboutHeader from "@/components/about_us/header";
import Footer from "@/components/reuseables/footer";
import Message from "@/components/contact/message";
import ReduxProvider from "@/app/ReduxProvider";
import BookingModal from "@/components/home/bookModal";

export default function ContactPage(){
    return (
        <>
            <Navbar index={2}/>
            <AboutHeader text={'Contacts'}/>
            <Message/>
        </>
    )
}