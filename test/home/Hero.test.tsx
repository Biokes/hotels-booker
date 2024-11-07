import {fireEvent, render, screen} from "@testing-library/react";
import HomeHero from "@/components/HomeHero";

describe('',()=>{
    it('test that hero has text',()=>{
       render(
            <HomeHero/>
       )
        expect(screen.getByText('Relax & unwind')).toBeInTheDocument()
        expect(screen.getByText('Experience the luxurious level')).toBeInTheDocument()
        expect(screen.getByText('of our spa treatments')).toBeInTheDocument()
        expect(screen.getByText('Learn more')).toBeInTheDocument()
    })
    it('tests hero button routes to another page when clicked',()=>{
        render(<HomeHero/>)
        const button = screen.getByRole('button', { name: /Learn more/ })
        fireEvent.click(button)

    })
})