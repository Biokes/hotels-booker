import {render,screen} from "@testing-library/react";
import AboutHero from "@/components/about_us/aboutHero";

describe('testing about hero',()=>{
    it('tests hero texts',()=>{
        render(
            <AboutHero/>
        )
        expect(screen.getByText('A Few Word About Us')).toBeInTheDocument()
    })
})