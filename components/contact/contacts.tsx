import Navbar from "@/components/reuseables/navbar";
import AboutHeader from "@/components/about_us/header";
import Footer from "@/components/home/footer";
import Message from "@/components/contact/message";

export default function ContactPage(){
    return (
        <>
            <Navbar index={2}/>
            <AboutHeader text={'Contacts'}/>
            <Message/>
            <Footer/>
        </>
    )
}