'use client';
import styles from '@/styles/reuseable.module.css';
// import {FormEvent, useState} from 'react';
// import { Button } from '@mui/material';
// import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
// import splitAndConcat from "@/utils/functions";
// import {ResponseData} from "@/interfaces/interfaces";
// import {toast} from "react-toastify";

export default function HomeHero() {
    // const [name, setName] = useState<string>('');
    // const [arrival, setArrival] = useState<Date | null>(new Date());
    // const [departure, setDeparture] = useState<Date | null>(new Date());
    // const [adults, setAdult] = useState<number>(1);
    // const [location,setLocation] = useState<string>('')
    // const [locationId, setLocationId] = useState<string>('')
    // const [isLoading, setIsLoading] = useState<boolean>(false);
    // const [isValid, setValid] = useState<boolean>(/^[A-Za-z\s]+$/.test(name.trim())
    //     && arrival !== null && departure !== null && departure >= arrival && adults > 0);
    // const handleSubmit = async (e: FormEvent) => {
    //     setValid(false)
    //     e.preventDefault();
    //     const isOnline = () => navigator.onLine;
    //     try {
    //         setIsLoading(!isLoading)
    //         if (!isOnline) {
    //             throw new Error("no internet connection")
    //         }
    //         const data = {
    //             name: name,
    //             arrival: arrival,
    //             departure: departure,
    //             adult: adults,
    //             location: location
    //         };
    //         let url = `https://hotels-com6.p.rapidapi.com/hotels/auto-complete?query=${splitAndConcat(data.location)}`;
    //         const options = {
    //             method: 'GET',
    //             headers: {
    //                 'x-rapidapi-key': 'febfd66cf9msh276ca2c333c55b2p17a072jsnb411682e032e',
    //                 'x-rapidapi-host': 'hotels-com6.p.rapidapi.com'
    //             }
    //         };
    //         try {
    //             const response = await fetch(url, options);
    //             const result: ResponseData = await response.json();
    //             setLocationId(result?.data?.sr?.[0]?.locationId ?? '');
    //             console.log(locationId)
    //             url = `https://hotels-com6.p.rapidapi.com/hotels/search?locationId=${locationId}&rooms=%5B%7B%22adults%22%3A%2${adults}%7D%5D`;
    //             try {
    //                 const response = await fetch(url, options);
    //                 const result = await response.text();
    //                 console.log(result);
    //
    //             } catch (error) {
    //                 if (error instanceof Error) {
    //                     toast.error(error.message, {
    //                         position: 'top-right',
    //                         autoClose: 5000,
    //                         progress: undefined,
    //                         pauseOnHover: true,
    //
    //                     })
    //                 } else {
    //                     toast.error("Something went wrong", {
    //                         position: 'top-right',
    //                         autoClose: 5000,
    //                         progress: undefined,
    //                         pauseOnHover: true,
    //
    //                     })
    //                 }
    //                 console.error(error);
    //                 console.error(error);
    //             }
    //             console.log(result);
    //             console.log(locationId)
    //             if(!result.data){
    //                 toast.success("No match found")
    //             }
    //         } catch (error) {
    //             if (error instanceof Error) {
    //                 toast.error(error.message, {
    //                     position: 'top-right',
    //                     autoClose: 5000,
    //                     progress: undefined,
    //                     pauseOnHover: true,
    //
    //                 })
    //                 console.error(error);
    //             }
    //         }
    //     } catch (error) {
    //         if (error instanceof Error) {
    //             toast.error(error.message, {
    //                 position: 'top-right',
    //                 autoClose: 5000,
    //                 progress: undefined,
    //                 pauseOnHover: true,
    //
    //             })
    //             console.error(error);
    //         } else {
    //             toast.error("Something went wrong", {
    //                 position: 'top-right',
    //                 autoClose: 5000,
    //                 progress: undefined,
    //                 pauseOnHover: true,
    //
    //             })
    //         }
    //
    //     } finally {
    //         setName('');
    //         setArrival(null);
    //         setDeparture(null);
    //         setLocation('');
    //         setAdult(0);
    //         setIsLoading(!isLoading)
    //     }
    // }

    return (
        // <LocalizationProvider dateAdapter={AdapterDateFns}>
            <div className={'flex flex-col lg:flex-row md:gap-[20px]'}>
                <div className={styles.homeHeroParent}>
                    <p className={styles.relax}>Relax & unwind</p>
                    <p className={styles.experience}>Experience the luxurious level</p>
                    <p className={styles.treatment}>of our spa treatments</p>
                    {/*<button className={styles.learn}>Learn more</button>*/}
                </div>
                {/*<div className={styles.heroForm}>*/}
                {/*    <p className="text-nowrap text-2xl font-bold text-gray-700 mb-[10px] sm:pl-[10%] lg:pl-0 sm:mt-[25px] lg:mt-0">Book Now</p>*/}
                {/*    <form onSubmit={handleSubmit} className="flex flex-col w-full gap-[20px] sm:pl-[10%] lg:pl-0">*/}
                {/*        <div>*/}
                {/*            <p className="text-gray-700 font-thin text-sm">Your name</p>*/}
                {/*            <input placeholder="Your name" value={name} className={"w-4/5 sm:w-[500px] lg:w-4/5  h-10 bg-white rounded-sm px-[10px] py-0 text-black"}*/}
                {/*                   onChange={(e) => setName(e.target.value)}/>*/}
                {/*        </div>*/}
                {/*        <div className="flex flex-col gap-[20px] w-full sm:flex-row lg:flex-col">*/}
                {/*            <div>*/}
                {/*                <div className="relative flex w-4/5 justify-between">*/}
                {/*                    <DesktopDatePicker label="Arrival Date" value={null} onChange={(date) => setArrival(date)} minDate={new Date()}*/}
                {/*                        format="dd-MM-yyyy" sx={{width: '120%',border: '1px solid', borderColor: 'transparent', borderRadius: '4px', fontSize: '0.875rem', color: 'black',*/}
                {/*                            outline: 'none', '&:focus': {ring: 2, ringColor: '#008eef', borderColor: '#008eef',},}}*/}
                {/*                    />*/}
                {/*                </div>*/}
                {/*            </div>*/}
                {/*            <div className="flex flex-col gap-[10px]">*/}
                {/*                <div className="relative flex w-4/5">*/}
                {/*                    <DesktopDatePicker label="Departure Date" value={null} onChange={(date) => setDeparture(date)}*/}
                {/*                        minDate={arrival ?? new Date()} format="dd-MM-yyyy"*/}
                {/*                       sx={{width: '120%', border: '1px solid', borderColor: 'transparent', borderRadius: '4px', fontSize: '0.875rem', color: 'black',*/}
                {/*                           outline: 'none', '&:focus': {ring: 2, ringColor: '#008eef', borderColor: '#008eef',},}}*/}
                {/*                    />*/}
                {/*                </div>*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*        <div className={'flex gap-[10px] lg:gap-0 flex-col sm:flex-row lg:flex-col'}>*/}
                {/*            <div className="flex flex-col gap-[10px] w-[250px] lg:w-[300px]">*/}
                {/*                <label className="text-gray-700 font-thin text-sm">Enter Location</label>*/}
                {/*                <input placeholder={'New York'} value={location} onChange={(e) => setLocation(e.target.value)}*/}
                {/*                        className="w-[110%] lg:w-4/5 sm:w-[100%] bg-white border border-gray-300 rounded p-2 text-gray-700"/>*/}
                {/*            </div>*/}
                {/*            <div className="flex flex-col gap-[10px] w-[250px] lg:w-[300px]">*/}
                {/*                <label className="text-gray-700 font-thin text-sm h-[20px]">No of Adults</label>*/}
                {/*                <select*/}
                {/*                    value={adults}*/}
                {/*                    onChange={(e) => setAdult(parseInt(e.target.value))}*/}
                {/*                    className="w-[110%] lg:w-4/5 sm:w-[100%] bg-white border border-gray-300 rounded p-2 text-gray-700"*/}
                {/*                >*/}
                {/*                    <option value="" disabled>*/}
                {/*                        Select number of adults*/}
                {/*                    </option>*/}
                {/*                    {[1, 2, 3, 4].map((value) => (*/}
                {/*                        <option key={value} value={value}>*/}
                {/*                            {value} {value === 1 ? 'Adult' : 'Adults'}*/}
                {/*                        </option>*/}
                {/*                    ))}*/}
                {/*                </select>*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*        <Button sx={{ textTransform: 'none', marginTop: '10px', text: 'no-wrap', width:"200px" }} variant="contained" disabled={!isValid} type="submit">*/}
                {/*            Check Availability*/}
                {/*        </Button>*/}
                {/*    </form>*/}
                {/*</div>*/}
            </div>

        // </LocalizationProvider>
    );
}
