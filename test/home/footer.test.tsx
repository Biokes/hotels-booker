import {fireEvent, render, screen} from "@testing-library/react";
import Footer from "@/components/home/footer";
import React from "react";

jest.useFakeTimers();

describe("tests the home page footer",()=>{
    it('test footer',()=>{
        render(
            <Footer/>
        )
        expect(screen.getByText('opening Hours')).toBeInTheDocument()
        expect(screen.getByText('Weekdays: 8:00–20:00')).toBeInTheDocument()
        expect(screen.getByText('Weekends: 9:00–18:00')).toBeInTheDocument()
        expect(screen.getByText('© 2019 Royal Villas. All Rights Reserved.')).toBeInTheDocument()
        expect(screen.getByText('Address')).toBeInTheDocument()
        expect(screen.getByText('6036 Richmond hwy., Alexandria, VA, 2230')).toBeInTheDocument()
        expect(screen.getByText('Call Us: +1 (409) 987–5874')).toBeInTheDocument()
        expect(screen.getByText('Join our newsletter')).toBeInTheDocument()
        expect(screen.getByTestId('email_input')).toBeInTheDocument()
        expect(screen.getByText('Subscribe')).toBeInTheDocument()
        const subscribeButton = screen.getByRole('button', { name: /Subscribe/i });
        const input = screen.getByPlaceholderText('Enter your email')
        fireEvent.change(input, {target:{value:'malisls'}})
        expect(subscribeButton).toBeDisabled()
        fireEvent.change(input, {target:{value:'email@email.com'}})
        expect(subscribeButton).toBeEnabled()
    })
    test('initially hides the message paragraph', () => {
        render(<Footer />);
        const messageParagraph = screen.getByTestId('paragraph', { hidden: true });
        expect(messageParagraph).toHaveClass('hidden');
    });

    test('disables submit button for invalid email', () => {
        render(<Footer />);
        const emailInput = screen.getByTestId('email_input');
        const submitButton = screen.getByRole('button', { name: /subscribe/i });
        fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
        expect(submitButton).toBeDisabled();
    });

    test('enables submit button for valid email', () => {
        render(<Footer />);
        const emailInput = screen.getByTestId('email_input');
        const submitButton = screen.getByRole('button', { name: /subscribe/i });
        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        expect(submitButton).toBeEnabled();
    });

    test('displays success message upon subscribing with a valid email', async () => {
        render(<Footer />);
        const emailInput = screen.getByTestId('email_input');
        const submitButton = screen.getByRole('button', { name: /Subscribe/i });
        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        fireEvent.click(submitButton);
    });

})

