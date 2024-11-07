import {fireEvent, render, screen} from "@testing-library/react";
import HomeHero from "@/components/home/HomeHero";
import {Provider} from "react-redux";
import {configureStore} from "@reduxjs/toolkit";
import UserSlice from "@/redux/userSlice";
import {useRouter} from "next/router";

describe('',()=>{
    const store = configureStore({
        reducer: {
            users: UserSlice
        },
    });
    it('test that hero has text',()=>{
       render(
           <Provider store={store}>
               <HomeHero/>
           </Provider>
       )
        expect(screen.getByText('Relax & unwind')).toBeInTheDocument()
        expect(screen.getByText('Experience the luxurious level')).toBeInTheDocument()
        expect(screen.getByText('of our spa treatments')).toBeInTheDocument()
        expect(screen.getByText('Learn more')).toBeInTheDocument()
    })
    it('tests hero button routes to another page when clicked',()=>{
        const mockNavigate = jest.fn();
        ( useRouter as jest.Mock).mockReturnValue({
            push:mockNavigate,
        })
        render(
            <Provider store={store}>
                <HomeHero/>
            </Provider>
        )
        const button = screen.getByRole('button', { name: /Learn more/ })
        fireEvent.click(button)
        expect(mockNavigate).not.toHaveBeenCalled()
    })
})