'use client'
import {useRef, useState, useEffect, FormEvent} from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {RootObject, RoomsData, DataItem, HotelResponse, Results} from '@/interfaces/interfaces';
import Image from "next/image";
import styles from "@/styles/about.module.css";
import {MapResultsToHotelInfo, splitAndConcat} from '@/utils/functions';
import {Box, Button, CircularProgress, Modal} from "@mui/material";
import {RootState, useAppDispatch} from "@/redux/store";
import {setBookingHotel, setResult } from "@/redux/userSlice";
import {CloseIcon} from "next/dist/client/components/react-dev-overlay/internal/icons/CloseIcon";
import {useSelector} from "react-redux";

function createSearchUrl(data:{
    checkInDate: string;
    checkOutDate: string;
    adults?: string;
}): string {
    const queryParams = new URLSearchParams(
        Object.entries(data).reduce((acc, [key, value]) => {
            if (value) acc[key] = value;
            return acc;
        }, {} as Record<string, string>)
    );

    return `https://flights-sky.p.rapidapi.com/hotels/search?${queryParams.toString()}`;
}
function MyModal() {
    const dispatch = useAppDispatch()
    const SelectionModal = (props: {
        isOpen: boolean,
        dataSelected: DataItem,
        closeModal: () => void
    }) => {
        const [checkInDate, setCheckInDate] = useState<string>('');
        const [checkOutDate, setCheckOutDate] = useState<string>('');
        const [errors, setErrors] = useState<{ [key: string]: string }>({});
        const [isFormValid, setIsFormValid] = useState<boolean>(false);
        const [returnValue, setReturnValue] = useState<Results>()
            useEffect(() => {
            validateForm();
        }, [checkInDate, checkOutDate]);

        const validateForm = () => {
            const today = new Date().toISOString().split('T')[0];
            const checkIn = checkInDate ? new Date(checkInDate) : null;
            const checkOut = checkOutDate ? new Date(checkOutDate) : null;
            const tempErrors: { [key: string]: string } = {};
            if (!checkInDate) {
                tempErrors.checkInDate = 'Check-in date is required.';
            } else if (checkInDate < today) {
                tempErrors.checkInDate = 'Check-in date cannot be in the past.';
            }
            if (!checkOutDate) {
                tempErrors.checkOutDate = 'Check-out date is required.';
            } else if (checkIn && checkOut && checkOut <= checkIn) {
                tempErrors.checkOutDate = 'Check-out date must be after the check-in date.';
            }
            setErrors(tempErrors);
            setIsFormValid(Object.keys(tempErrors).length === 0);
        };
        const handleSubmit = async (e: FormEvent) => {
            e.preventDefault();
            if (isFormValid) {
                console.log('Form submitted:', {checkInDate, checkOutDate});
            }
            try {
                const url = createSearchUrl({checkInDate: checkInDate, checkOutDate})
                const options = {
                    method: 'GET',
                    headers: {
                        'x-rapidapi-key': 'febfd66cf9msh276ca2c333c55b2p17a072jsnb411682e032e',
                        'x-rapidapi-host': 'flights-sky.p.rapidapi.com'
                    }
                };
                const response = await fetch(url, options);
                const result: HotelResponse = await response.json();
                setReturnValue(result.data.results)
                props.closeModal()
                dispatch(setResult(returnValue as Results))
            } catch (error) {
                if(error instanceof Error) {
                    toast.error('Something went wrong')
                }
                else{
                    toast.error('Something went wrong')
                }
            }
        };
        return (
            <Modal open={props.isOpen} onClose={props.closeModal} sx={{
                position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: {xs:'90%', sm:500}, boxShadow: 12, p: {xs:1 , sm:3},}} className={`${styles.innerProps}`}>
                <Box className={'w-[100%] flex flex-col gap-[10px]'}>
                    <div className={'flex justify-between items-center'}>
                        <p className={'text-[20px] font-[750]'} style={{fontFamily: 'Dm Sans'}}>Filters for
                            selections</p>
                        <div onClick={props.closeModal}>
                            <CloseIcon/>
                        </div>
                    </div>
                    <form
                        className={'flex flex-col gap-[15px] justify-center px-[5px]'}
                        onSubmit={handleSubmit}
                    >
                        <div className={'flex justify-between px-[12px] py-[7px]'}>
                            <section>
                                <p>Checkin date</p>
                                <input className={styles.innerInput} type="date" value={checkInDate} onChange={(e) => setCheckInDate(e.target.value)}
                                       min={new Date().toISOString().split('T')[0]} placeholder="checkInDate" required/>
                                {errors.checkInDate && (
                                    <p style={{color: 'white', fontSize: '10px'}}>{errors.checkInDate}</p>
                                )}
                            </section>
                            <section>
                                <p>Checkout Date</p>
                                <input
                                    className={styles.innerInput}
                                    type="date"
                                    value={checkOutDate}
                                    onChange={(e) => setCheckOutDate(e.target.value)}
                                    min={checkInDate || new Date().toISOString().split('T')[0]}
                                    placeholder="checkOutDate"
                                    required
                                />
                                {errors.checkOutDate && (
                                    <p style={{color: 'whitex', fontSize: '10px'}}>{errors.checkOutDate}</p>
                                )}
                            </section>
                        </div>
                        <section className={`${styles.labels}`}>
                            <div>
                                <p>Number of Adults (Optional)</p>
                                <input type="text" placeholder={'Number of adults'}/>
                            </div>
                        </section>
                        <Button variant={'contained'} className={'w-[150px] text-[12px] ml-[12px]'} type="submit" disabled={!isFormValid}>
                            Search
                        </Button>
                    </form>
                </Box>
            </Modal>
        )
    }
    return SelectionModal;
}
export default function Booking(props: { data: RoomsData[] }) {
    const [cityName, setCityName] = useState<string>('');
    const [isLoading, setLoading] = useState<boolean>(false);
    const [popUp, setPopUp] = useState<boolean>(false);
    const [selectedIndex, setSelectedIndex] = useState<number>(-1)
    const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const [data, setData] = useState<RootObject>({
        message: '',
        status: false,
        data: []
    });
    const dispatch = useAppDispatch()
    const handleModalClose = () => {
        setPopUp(false);
        dispatch(setBookingHotel(selectedData));
    };
    const [hotelsFound, setHotelsFound] = useState<Results>()
    const results: Results|[] = useSelector((state:RootState)=> state.user.result);
    useEffect(()=>{
        if (Array.isArray(results)) {
            setHotelsFound(undefined);
        } else {
            setHotelsFound(results);
        }
    },[results])
    const [selectedData, setSelectedData] = useState<DataItem>({
        class: "",
        entityId: "",
        entityName: "",
        entityType: "",
        hierarchy: "",
        highlight: {
            entityName: '',
            hierarchy: '',
        },
        location: "",
        pois: null,
        score: 0
    })
    dispatch(setBookingHotel(selectedData))
    const [showSearchButton, setShowSearchButton] = useState<boolean>(true);
    const SelectionModal = MyModal();
    const PopUp = (index: number) => {
        setPopUp(!popUp);
        setSelectedIndex(index)
        setSelectedData(data.data[index])
    };
    const search = async (data: string) => {
        try {
            setLoading(true);
            const url = `https://flights-sky.p.rapidapi.com/hotels/auto-complete?query=${splitAndConcat(data)}`;
            const options = {
                method: 'GET',
                headers: {
                    'x-rapidapi-key': 'aefd2f58efmsh400185bf44345bcp1f080cjsne10cc87dc0e1',
                    'x-rapidapi-host': 'flights-sky.p.rapidapi.com'
                }
            };
            const response = await fetch(url, options);
            const gottenResponse: RootObject = await response.json();
            if (!response.status) {
                throw new Error("Something went wrong, try again later");
            }
            setData(gottenResponse);
            setLoading(false);
        }
        catch (error) {
            if (error instanceof Error) {
                toast.error(`Error: ${error.message}`, {
                    position: 'top-right',
                    autoClose: 2000,
                    hideProgressBar: true,
                    pauseOnHover: true,
                })
            }
            else{
                toast.error('Something went wrong', {
                    position: 'top-right',
                    autoClose: 2000,
                    hideProgressBar: true,
                    pauseOnHover: true,
                })
            }
            setLoading(false);
            setData({
                message: '',
                status: false,
                data: []
            });
        }
    };

    return (
        <div>
            {hotelsFound ?
                <div className={'flex flex-col gap-[20px] py-[10px] bg-gray-300'}>
                    <div className={`relative ${styles.roomSection}`}>
                        {props.data.map((item, index) => (
                            <div key={index}
                                 className={`md:order-${index} group relative w-full h-full overflow-hidden`}>
                                <div
                                    className="w-full h-full transition-transform duration-300 ease-in-out transform group-hover:scale-110 group-hover:brightness-[.8] brightness-[.7]">
                                    <Image src={item.image.src} alt="" width={300} height={300}
                                           className="object-cover w-full h-full"/>
                                </div>
                                <div
                                    className="absolute inset-0 border-2 border-transparent border-white animate-border-animation z-10 pointer-events-none m-[30px] p-[10px]">
                                    <div
                                        className="absolute inset-0 flex flex-col items-center justify-center text-white z-20">
                                        <p className={styles.heading}>Price: {item.heading}</p>
                                        <p className={styles.description}>{item.description}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    {showSearchButton ? (
                        <div className="flex justify-center py-[10px]">
                            <Button variant="contained" onClick={() => setShowSearchButton(false)}>Find City</Button>
                        </div>
                    ) : (
                        <div className={`flex flex-col py-[10px] pl-[20px] relative`}>
                            <p className={'text-gray-600'}>Find Hotel By city</p>
                            <input type="text" placeholder="City name..." name={'cityName'} value={cityName}
                                   className={'w-[70%] lg:w-[30%] h-[40px] rounded-md text-black p-[5px]'}
                                   onChange={(e) => {
                                       const value = e.target.value;
                                       setCityName(value);
                                       if (debounceTimeoutRef.current) clearTimeout(debounceTimeoutRef.current);
                                       debounceTimeoutRef.current = setTimeout(() => {
                                           if (value.trim()) {
                                               search(value.trim())
                                           }
                                       }, 2000);
                                   }}
                            />
                            {isLoading ? (
                                <p className={'w-[70%] lg:w-[30%] shadow-md border-[1px] p-1 items-center flex justify-center'}>
                                    <CircularProgress size={40}/>
                                </p>
                            ) : (
                                <div>
                                    {data.data.length > 0 ? (
                                        <div
                                            className={'flex flex-col w-[70%] lg:w-[30%] max-h-[100px] overflow-y-auto border-[1px] gap-[1px] shadow-md mt-[1px]'}>
                                            {data.data.map((options, index) => (
                                                <div key={index} className={styles.options} onClick={() => {
                                                    setSelectedIndex(index);
                                                    PopUp(selectedIndex);
                                                }}>
                                                    <p className={'text-[13px]'}>{options.entityName}</p>
                                                    <p className={'text-[15px] font-[700]'}>{options.hierarchy}</p>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className={'text-[12px] md:text-[14px] font-[900]'}>no result found</p>
                                    )}
                                </div>
                            )}
                        </div>
                    )}
                    <SelectionModal isOpen={popUp} dataSelected={selectedData} closeModal={handleModalClose}/>
                    <ToastContainer/>
                </div>
                :
                <div className={'flex flex-col gap-[10px] px-[10px]'}>
                    {
                        MapResultsToHotelInfo(results as Results).map((item, index)=>(
                            <div key={index} className={'border-[1px] p-[5px] flex'}>
                                <div className={'flex w-[100px] h-[120px]'}>
                                    <Image src={item.images[0]} alt={''} className={'object-center object-cover'}/>
                                </div>
                                <section className={'flex flex-col'}>
                                    <div>
                                        <p>{item.name}</p>
                                        <p>Price : {item.price}</p>
                                    </div>
                                    <div>
                                        <p>{item.rating}</p>
                                        <p>{item.location}</p>
                                    </div>
                                </section>

                            </div>
                        ))
                    }
                </div>
            }

        </div>
    );
}

