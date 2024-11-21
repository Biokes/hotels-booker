'use client'
import React, {useRef, useState, useEffect} from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {RootObject, RoomsData, DataItem, HotelResponse, Results, Data} from '@/interfaces/interfaces';
import Image from "next/image";
import styles from "@/styles/about.module.css";
import {MapResultsToHotelInfo, splitAndConcat, createSearchUrl} from '@/utils/functions';
import {Box, Button, CircularProgress, Modal} from "@mui/material";
import { useAppDispatch} from "@/redux/store";
import {setBookingHotel} from "@/redux/userSlice";
import {CloseIcon} from "next/dist/client/components/react-dev-overlay/internal/icons/CloseIcon";
import replaceImage from '@/public/download (4).jpeg'
import GradeIcon from '@mui/icons-material/Grade';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';

export default function Booking(props: { data: RoomsData[] }) {
    const [responseData, setResponseData]= useState<Data| []>([])
    const [result , setResult] = useState<Results>()

    function MyModal(args: { entityId:string, returnValue: Results | undefined; setReturnValue: React.Dispatch<React.SetStateAction<Results | undefined>>}) {

        const SelectionModal = (props: { isOpen: boolean, closeModal: () => void }) => {
            const [checkInDate, setCheckInDate] = useState<string>('');
            const [checkOutDate, setCheckOutDate] = useState<string>('');
            const [errors, setErrors] = useState<{ [key: string]: string }>({});
            const [isFormValid, setIsFormValid] = useState<boolean>(false);
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
            const [isCalled ,setIsCalled] = useState(false)

            useEffect(() => {
             validateForm()
            }, [checkInDate, checkOutDate]);

            const handleSubmit = async (e: React.FormEvent<Element> | undefined) => {
                e?.preventDefault();
                props.closeModal()
                if (isFormValid) {
                    console.log('Form submitted:', {checkInDate, checkOutDate});
                }
                try {
                    if (!navigator.onLine) {
                        throw new Error("No internet connection available. Please check your connection.");
                    }
                    const url = createSearchUrl({entityId: args.entityId,checkin: checkInDate,checkout: checkOutDate})
                    const options = {
                        method: 'GET',
                        headers: {
                            'x-rapidapi-key': '611886a669msh1f79e30ab465d64p195c6bjsn7c486ef58ded',
                            'x-rapidapi-host': 'flights-sky.p.rapidapi.com'
                        }
                    };
                    let response = await fetch(url, options);
                    let result: HotelResponse = await response.json();
                    setResponseData(result.data)
                    setIsCalled(!isCalled)
                    for(let count = 0; count < 5; count++){
                        if(!Array.isArray(responseData) && responseData.status?.completionPercentage != 100) {
                            await new Promise((resolve) => setTimeout(resolve, 2000));
                            response = await fetch(url, options);
                            result = await response.json();
                            setResponseData(result.data)
                            console.log(result)
                            console.log('Condition = ', !Array.isArray(responseData) && responseData.status?.completionPercentage != 100)
                        }
                        if(count== 4){
                            console.log(responseData)
                        }
                    }

                    args.setReturnValue(result.data.results)
                } catch (error) {
                    if(error instanceof Error) {
                        toast.error(`Error: ${error.message === 'failed to fetch' ? 'pls Check your internet connection' : error.message}`)
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
                        <form className={'flex flex-col gap-[15px] justify-center px-[5px]'} onSubmit={handleSubmit}>
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
                                    <input className={styles.innerInput} type="date" value={checkOutDate} placeholder="checkOutDate" required onChange={(e) => setCheckOutDate(e.target.value)}
                                           min={checkInDate ? new Date(new Date(checkInDate).getTime() + 24 * 60 * 60 * 1000).toISOString().split('T')[0] : new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toISOString().split('T')[0]}/>
                                    {errors.checkOutDate && (<p style={{color: 'white', fontSize: '10px'}}>{errors.checkOutDate}</p>)}
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
    const [showSearchButton, setShowSearchButton] = useState<boolean>(true);
    const SelectionModal = MyModal({entityId:selectedData.entityId, returnValue: result,setReturnValue: setResult});
    const PopUp = (index: number) => {
        setPopUp(!popUp);
        setSelectedIndex(index)
        setCityName('')
        setSelectedData(data.data[index])
    };
    const search = async (data: string) => {
        try {
            if (!navigator.onLine) {
                throw new Error("No internet connection available. Please check your connection.");
            }
            setLoading(true);
            const url = `https://flights-sky.p.rapidapi.com/hotels/auto-complete?query=${splitAndConcat(data)}`;
            const options = {
                method: 'GET',
                headers: {
                    'x-rapidapi-key': '611886a669msh1f79e30ab465d64p195c6bjsn7c486ef58ded',
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
                toast.error(`Error: ${error.message==='failed to fetch'?'pls Check your internet connection':error.message}`, {
                    position: 'top-right',
                    autoClose: 2000,
                    hideProgressBar: true,
                    pauseOnHover: true,
                })
                console.log("Error message:=> ",error.message)
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
    }

    return (
        <div>
            {isLoading?
                <div>
                    <div className={Array.isArray(hotelsFound) ? 'hidden' : 'flex flex-col gap-[20px] py-[10px] bg-gray-300'}>
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
                                <Button variant="contained" onClick={() => setShowSearchButton(false)}>Find
                                    City</Button>
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
                                           }, 1000);
                                       }}
                                />
                                {isLoading ? (
                                    <p className={'w-[70%] lg:w-[30%] shadow-md border-[1px] p-1 items-center flex justify-center'}>
                                        <CircularProgress size={40}/>
                                    </p>
                                ) : (
                                    <div>
                                        {cityName &&
                                        data.data.length > 0 ? (
                                            <div
                                                className={'flex flex-col w-[70%] lg:w-[30%] max-h-[100px] overflow-y-auto border-[1px] gap-[1px] shadow-md mt-[1px]'}>
                                                {data.data.map((options, index) => (
                                                    <div key={index} className={styles.options} onClick={() => {
                                                        setSelectedIndex(index);
                                                        PopUp(selectedIndex);
                                                        setSelectedData(options);
                                                        setCityName('')
                                                    }}>
                                                        <p className={'text-[13px]'}>{options.entityName}</p>
                                                        <p className={'text-[15px] font-[700]'}>{options.hierarchy}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <p className={'text-[12px] md:text-[14px] font-[900]'}>no result found</p>
                                        )

                                        }
                                    </div>
                                )}
                            </div>
                        )}
                        <SelectionModal isOpen={popUp} closeModal={handleModalClose}/>
                        <ToastContainer/>
                    </div>
                    <div>
                        <p className={'w-[100%] h-[300px] items-center flex justify-center'}>
                            <CircularProgress size={50}/>
                            <p style={{color: 'var(--text-color)'}} className={'text-[17px]'}>Loading..</p>
                        </p>
                    </div>
                </div>
                :
                <div
                    className={!Array.isArray(hotelsFound) ? 'hidden' : 'flex flex-col gap-[10px] px-[10px] py-[20px] pl-[35px] bg-gray-100'}>
                    <p className={'text-[20px] font-[900]'} style={{color: 'black'}}>Found Results</p>
                    <div>
                        <div className={'flex flex-col gap-[15px] columns-[250px] justify-between px-[15px]'}>
                            {
                                MapResultsToHotelInfo(result as Results).map((item, index) => {
                                        console.log(item.images)
                                        const imageUrl = item.images[0]?.startsWith('http') ? item.images[0] : replaceImage
                                        return (
                                            <div key={index}
                                                 className={'border-[1px] p-[5px] flex w-full sm:w-[400px] -ml-[10px] sm:-ml-0 justify-center items-center hover:border-[2px]'}>
                                                <div className={'flex w-[50px] h-[50px]'}>
                                                    <Image src={imageUrl} alt={''} width={100} height={100}
                                                           className={'object-center object-cover'}/>
                                                </div>
                                                <section
                                                    className={'flex justify-center flex-col gap-[5px] w-full px-[15px] md:px-0'}>
                                                    <div className={'flex justify-between items-center'}>
                                                        <p style={{color: 'black', fontWeight: 720}}
                                                           className={'text-[20px] w-[80%] overflow-ellipsis'}>{item.name}</p>
                                                    </div>
                                                    <div className={'flex justify-between py-[7px]'}>
                                                        <section className={'flex gap-[15px] justify-center'}>
                                                            <LocalOfferIcon className={'w-[20px] h-[20px]'}
                                                                            style={{color: 'var(--text-color)'}}/>
                                                            <p style={{color: 'black'}}>{item.price} Per Night</p>
                                                        </section>
                                                        <section className={'flex gap-[15px] justify-center'}>
                                                            <GradeIcon className={'w-[20px] h-[20px]'}
                                                                       style={{color: 'gold'}}/>
                                                            <p style={{color: 'black'}}>{item.rating}</p>
                                                        </section>
                                                    </div>
                                                </section>
                                            </div>
                                        )
                                    }
                                )
                            }
                        </div>
                        <div className="flex justify-center py-[10px] w-[100%] items-center mt-[20px]">
                            <Button variant="contained" onClick={() => {
                                setHotelsFound(undefined)
                            }}>Find City</Button>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
}

