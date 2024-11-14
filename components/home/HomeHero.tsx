'use client';
import styles from '@/styles/reuseable.module.css';
import { FormEvent, useState } from 'react';
import { Button } from '@mui/material';
import { DateRange } from '@mui/icons-material';
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

export default function HomeHero() {
    const [name, setName] = useState<string>('');
    const [arrival, setArrival] = useState<Date | null>(new Date());
    const [departure, setDeparture] = useState<Date | null>(new Date());
    const [adults, setAdult] = useState<number>(1);
    const [children, setChildren] = useState<number>(1);
    const isValid = /^[A-Za-z\s]+$/.test(name.trim()) && arrival && departure && (adults > 0 || children > 0);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const data = {
            name: name,
            arrival: arrival,
            departure: departure,
            children: children,
            adult: adults,
        };
        try {
            const response = await fetch(`http://localhost:8080/hotels/available/details`, {
                method: 'GET',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            const responseData = await response.json();

            setName('');
            setArrival(null);
            setDeparture(null);
            setChildren(0);
            setAdult(0);
            if (responseData) {
                return true;
            }
        } catch (error) {
            return error;
        }
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <div className="flex flex-col lg:flex-row md:gap-[20px]">
                <div className={styles.homeHeroParent}>
                    <p className={styles.relax}>Relax & unwind</p>
                    <p className={styles.experience}>Experience the luxurious level</p>
                    <p className={styles.treatment}>of our spa treatments</p>
                    <button className={styles.learn}>Learn more</button>
                </div>
                <div className={styles.heroForm}>
                    <p className="text-nowrap text-2xl font-bold text-gray-700 mb-[10px]">Book Now</p>
                    <form onSubmit={handleSubmit} className="flex flex-col w-full gap-[20px]">
                        <div>
                            <p className="text-gray-700 font-thin text-sm">Your name</p>
                            <input
                                placeholder="Your name"
                                value={name}
                                style={{width: '80%', height: '40px', background: '#ffffff', borderRadius: '3px', paddingInline: '10px 5px', color: '#000000',}}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="flex flex-col gap-[20px] w-full">
                            <div>
                                {/*<p className="text-gray-700 font-thin text-sm">Arrival Date</p>*/}
                                <div className="relative flex w-4/5 justify-between">
                                    <DesktopDatePicker
                                        label="Arrival Date"
                                        value={arrival}
                                        onChange={(date) => setArrival(date)}
                                        minDate={new Date()}
                                        format="dd-MM-yyyy"
                                        sx={{width: '120%', padding: 2, border: '1px solid', borderColor: 'transparent', borderRadius: '4px', fontSize: '0.875rem', color: 'black',
                                            outline: 'none', '&:focus': {ring: 2, ringColor: '#008eef', borderColor: '#008eef',},}}
                                    />
                                    {/*<span className="absolute flex justify-center pointer-events-none">*/}
                                    {/*    <DateRange*/}
                                    {/*        className="h-[18px] w-[18px] ml-[200px] mt-[10px] text-[#475661]"*/}
                                    {/*    />*/}
                                    {/*</span>*/}
                                </div>
                            </div>
                            <div className="flex flex-col gap-[10px]">
                                <p className="text-gray-700 font-thin text-sm">Departure Date</p>
                                <div className="relative flex w-4/5">
                                    <DesktopDatePicker label="Departure Date" value={departure} onChange={(date) => setDeparture(date)}
                                        minDate={new Date(new Date().setDate(new Date().getDate() + 1))} format="dd-MM-yyyy"
                                       sx={{width: '120%', padding: 2, border: '1px solid', borderColor: 'transparent', borderRadius: '4px', fontSize: '0.875rem', color: 'black',
                                           outline: 'none', '&:focus': {ring: 2, ringColor: '#008eef', borderColor: '#008eef',},}}
                                    />
                                    <span className="absolute flex justify-center pointer-events-none">
                                        <DateRange className="h-[18px] w-[18px] ml-[200px] mt-[10px] text-[#475661]"/>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-[10px]">
                            <label className="text-gray-700 font-thin text-sm">No of Children</label>
                            <select
                                value={children}
                                onChange={(e) => setChildren(parseInt(e.target.value))}
                                className="w-4/5 bg-white border border-gray-300 rounded p-2 text-gray-700"
                            >
                                <option value="" disabled>
                                    Select number of children
                                </option>
                                {[1, 2, 3, 4].map((value) => (
                                    <option key={value} value={value}>
                                        {value} {value === 1 ? 'Child' : 'Children'}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="flex flex-col gap-[10px]">
                            <label className="text-gray-700 font-thin text-sm">No of Adults</label>
                            <select
                                value={adults}
                                onChange={(e) => setAdult(parseInt(e.target.value))}
                                className="w-4/5 bg-white border border-gray-300 rounded p-2 text-gray-700"
                            >
                                <option value="" disabled>
                                    Select number of adults
                                </option>
                                {[1, 2, 3, 4].map((value) => (
                                    <option key={value} value={value}>
                                        {value} {value === 1 ? 'Adult' : 'Adults'}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <Button sx={{ textTransform: 'none', marginTop: '10px', text: 'no-wrap' }} variant="contained" disabled={!isValid} type="submit">
                            Check Availability
                        </Button>
                    </form>
                </div>
            </div>
        </LocalizationProvider>
    );
}
