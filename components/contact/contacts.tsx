'use client'
import Navbar from "@/components/reuseables/navbar";
import AboutHeader from "@/components/about_us/header";
import Footer from "@/components/home/footer";
import Message from "@/components/contact/message";
import ReduxProvider from "@/app/ReduxProvider";

export default function ContactPage(){
    return (
        <ReduxProvider>
            <Navbar index={2}/>
            <AboutHeader text={'Contacts'}/>
            <Message/>
            <Footer/>
        </ReduxProvider>
    )
}