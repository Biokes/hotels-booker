import {fireEvent, render, screen} from '@testing-library/react'
import Navbar from "@/components/reuseables/navbar";

describe("tests The navbar component",()=>{

    it('tests that when the icon is clicked it changes the background color',async () => {
        const navbar = render(<Navbar index={0}/>)
        const modeIcon = await screen.findByTestId('navbar_icon')
        expect(navbar).toHaveStyle('background-color: #ffffff')
        fireEvent.click(modeIcon)
        expect(modeIcon).toHaveStyle('background-color: #000000')

    })

    it('test that the navbar hamburgers shows on small screen',()=>{
        render(
            <Navbar index={0}/>
        )
        Object.defineProperty(global, 'innerWidth', {
            configurable: true,
            value: 375
        });
        global.dispatchEvent(new Event('resize'));
        expect(screen.getByText('Contact')).not.toBeInTheDocument()
        expect(screen.getByText('Home')).not.toBeInTheDocument()
        expect(screen.getByText('About us')).not.toBeInTheDocument()
        expect(screen.getByText('Book Now')).not.toBeInTheDocument()
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