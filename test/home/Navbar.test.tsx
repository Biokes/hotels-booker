import {fireEvent, render, screen} from '@testing-library/react'
import Navbar from "@/components/reuseables/navbar";

describe("tests The navbar component",()=>{

    it('tests that when the icon is clicked it changes the background color',async () => {
        render(<Navbar index={0}/>)
        const modeIcon = await screen.findByTestId('navbar_icon')
        expect(modeIcon).not.toHaveStyle('background-color: white');
        fireEvent.click(modeIcon)
        expect(modeIcon).not.toHaveStyle('background-color: black')

    })

    it('test that the navbar hamburgers does not show on large screen',()=>{
        render(
            <Navbar index={0}/>
        )
        expect(screen.getByText('Contact')).toBeInTheDocument();
        expect(screen.getByText('Home')).toBeInTheDocument();
        expect(screen.getByText('About us')).toBeInTheDocument();
        expect(screen.getByText('Book Now')).toBeInTheDocument();
    })
})