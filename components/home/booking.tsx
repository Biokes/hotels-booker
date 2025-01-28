'use client'
import React  from "react";
// {useRef, useState, useEffect}

// import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import {RootObject, RoomsData, DataItem, HotelResponse, Results, Data} from '@/interfaces/interfaces';
import Image from "next/image";
import styles from "@/styles/about.module.css";
// import {MapResultsToHotelInfo, splitAndConcat, createSearchUrl} from '@/utils/functions';
// import {Box, Button, CircularProgress, Modal} from "@mui/material";
// import { useAppDispatch} from "@/redux/store";
// import {setBookingHotel} from "@/redux/userSlice";
// import {CloseIcon} from "next/dist/client/components/react-dev-overlay/internal/icons/CloseIcon";
// import replaceImage from '@/public/download (4).jpeg'
// import GradeIcon from '@mui/icons-material/Grade';
// import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import ReduxProvider from "@/app/ReduxProvider";
import {RoomsData} from "@/interfaces/interfaces";

export default function Booking(props: { data: RoomsData[] }) {
    // const [responseData, setResponseData]= useState<Data| []>([])
    // const [result , setResult] = useState<Results>()
    // const [hotelsFound, setHotelsFound] = useState<Results>()
    // const [cityName, setCityName] = useState<string>('');
    // const [isLoading, setLoading] = useState<boolean>(false);
    // const [popUp, setPopUp] = useState<boolean>(false);
    // const [selectedIndex, setSelectedIndex] = useState<number>(-1)
    // const [data, setData] = useState<RootObject>({message: '', status: false, data: []});
    // const [isResultLoading, setResultLoading] = useState(false)
    // const dispatch = useAppDispatch()
    // const [isInputShowing, setInputShowing] = useState<boolean>(true)
    // const [selectedData, setSelectedData] = useState<DataItem>({
    //     class: "",
    //     entityId: "",
    //     entityName: "",
    //     entityType: "",
    //     hierarchy: "",
    //     highlight: {
    //         entityName: '',
    //         hierarchy: '',
    //     },
    //     location: "",
    //     pois: null,
    //     score: 0
    // })
    // const [showSearchButton, setShowSearchButton] = useState<boolean>(true);
    // function MyModal(args: { entityId:string, returnValue: Results | undefined;
    //                  setReturnValue: React.Dispatch<React.SetStateAction<Results | undefined>>,
    //                  setResultLoader:React.Dispatch<React.SetStateAction<boolean>>}) {
    //     const SelectionModal = (props: { isOpen: boolean, closeModal: () => void }) => {
    //         const [checkInDate, setCheckInDate] = useState<string>('');
    //         const [checkOutDate, setCheckOutDate] = useState<string>('');
    //         const [errors, setErrors] = useState<{ [key: string]: string }>({});
    //         const [isFormValid, setIsFormValid] = useState<boolean>(false);
    //         const validateForm = () => {
    //             const today = new Date().toISOString().split('T')[0];
    //             const checkIn = checkInDate ? new Date(checkInDate) : null;
    //             const checkOut = checkOutDate ? new Date(checkOutDate) : null;
    //             const tempErrors: { [key: string]: string } = {};
    //             if (!checkInDate) {
    //                 tempErrors.checkInDate = 'Check-in date is required.';
    //             } else if (checkInDate < today) {
    //                 tempErrors.checkInDate = 'Check-in date cannot be in the past.';
    //             }
    //             if (!checkOutDate) {
    //                 tempErrors.checkOutDate = 'Check-out date is required.';
    //             } else if (checkIn && checkOut && checkOut <= checkIn) {
    //                 tempErrors.checkOutDate = 'Check-out date must be after the check-in date.';
    //             }
    //             setErrors(tempErrors);
    //             setIsFormValid(Object.keys(tempErrors).length === 0);
    //         };
    //         const [isCalled ,setIsCalled] = useState(false)
    //
    //         useEffect(() => {
    //          validateForm()
    //         }, [checkInDate, checkOutDate, validateForm]);
    //
    //         const handleSubmit = async (e: React.FormEvent<Element> | undefined) => {
    //             e?.preventDefault();
    //             args.setResultLoader(true)
    //             props.closeModal()
    //             if (isFormValid) {
    //                 console.log('Form submitted:', {checkInDate, checkOutDate});
    //             }
    //             try {
    //                 if (!navigator.onLine) {
    //                     throw new Error("No internet connection available. Please check your connection.");
    //                 }
    //                 const url = createSearchUrl({entityId: args.entityId,checkin: checkInDate,checkout: checkOutDate})
    //                 const options = {
    //                     method: 'GET',
    //                     headers: {
    //                         'x-rapidapi-key': '611886a669msh1f79e30ab465d64p195c6bjsn7c486ef58ded',
    //                         'x-rapidapi-host': 'flights-sky.p.rapidapi.com'
    //                     }
    //                 };
    //                 let response = await fetch(url, options);
    //                 let result: HotelResponse = await response.json();
    //                 setResponseData(result.data)
    //                 setIsCalled(!isCalled)
    //                 for(let count = 0; count <4; count++){
    //                     console.log(!Array.isArray(responseData) && responseData.status?.completionPercentage != 100)
    //                     console.log(!Array.isArray(responseData))
    //                     if(Array.isArray(responseData)) {
    //                         console.log('Response Date = ',responseData)
    //                         break;
    //                     }
    //                     else if(responseData.status?.completionPercentage !== 100){
    //                         await new Promise((resolve) => setTimeout(resolve, 2000));
    //                         response = await fetch(url, options);
    //                         result = await response.json();
    //                         setResponseData(result.data)
    //
    //                     }
    //                     if(count== 4){
    //                         console.log(responseData)
    //                     }
    //                 }
    //                 args.setReturnValue(result.data.results)
    //             } catch (error) {
    //                 if(error instanceof Error) {
    //                     toast.error(`Error: ${error.message === 'failed to fetch' ? 'pls Check your internet connection' : error.message}`)
    //                 }
    //                 else{
    //                     toast.error('Something went wrong')
    //                 }
    //             }
    //             finally{
    //                 setResultLoading(false)
    //             }
    //         };
    //
    //         return (
    //             <Modal open={props.isOpen} onClose={props.closeModal} sx={{
    //                 position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
    //                 width: {xs:'90%', sm:500}, boxShadow: 12, p: {xs:1 , sm:3},}} className={`${styles.innerProps}`}>
    //                 <Box className={'w-[100%] flex flex-col gap-[10px]'}>
    //                     <div className={'flex justify-between items-center'}>
    //                         <p className={'text-[20px] font-[750]'} style={{fontFamily: 'Dm Sans'}}>Filters for
    //                             selections</p>
    //                         <div onClick={props.closeModal}>
    //                             <CloseIcon/>
    //                         </div>
    //                     </div>
    //                     <form className={'flex flex-col gap-[15px] justify-center px-[5px]'} onSubmit={handleSubmit}>
    //                         <div className={'flex justify-between px-[12px] py-[7px]'}>
    //                             <section>
    //                                 <p>Checkin date</p>
    //                                 <input className={styles.innerInput} type="date" value={checkInDate} onChange={(e) => setCheckInDate(e.target.value)}
    //                                        min={new Date().toISOString().split('T')[0]} placeholder="checkInDate" required/>
    //                                 {errors.checkInDate && (
    //                                     <p style={{color: 'white', fontSize: '10px'}}>{errors.checkInDate}</p>
    //                                 )}
    //                             </section>
    //                             <section>
    //                                 <p>Checkout Date</p>
    //                                 <input className={styles.innerInput} type="date" value={checkOutDate} placeholder="checkOutDate" required onChange={(e) => setCheckOutDate(e.target.value)}
    //                                        min={checkInDate ? new Date(new Date(checkInDate).getTime() + 24 * 60 * 60 * 1000).toISOString().split('T')[0] : new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toISOString().split('T')[0]}/>
    //                                 {errors.checkOutDate && (<p style={{color: 'white', fontSize: '10px'}}>{errors.checkOutDate}</p>)}
    //                             </section>
    //                         </div>
    //                         <section className={`${styles.labels}`}>
    //                             <div>
    //                                 <p>Number of Adults (Optional)</p>
    //                                 <input type="text" placeholder={'Number of adults'}/>
    //                             </div>
    //                         </section>
    //                         <Button variant={'contained'} className={'w-[150px] text-[12px] ml-[12px]'} type="submit" disabled={!isFormValid}>
    //                             Search
    //                         </Button>
    //                     </form>
    //                 </Box>
    //             </Modal>
    //         )
    //     }
    //     return SelectionModal;
    // }
    // useEffect(()=>{
    //     setResult(undefined);
    //     setResultLoading(false)
    //     setLoading(false)
    //     setResponseData([])
    // }, [])
    // const handleModalClose = () => {
    //     setPopUp(false);
    //     dispatch(setBookingHotel(selectedData));
    // };
    //
    // const SelectionModal = MyModal({entityId:selectedData.entityId, returnValue: result,setReturnValue: setResult, setResultLoader: setResultLoading});
    //
    // const PopUp = (index: number) => {
    //     setPopUp(!popUp);
    //     setSelectedIndex(index)
    //     setCityName('')
    //     setSelectedData(data.data[index])
    // };
    //
    // const search = async (data: string) => {
    //     try {
    //         if (!navigator.onLine) {
    //             throw new Error("No internet connection available. Please check your connection.");
    //         }
    //         setLoading(true);
    //         const url = `https://flights-sky.p.rapidapi.com/hotels/auto-complete?query=${splitAndConcat(data)}`;
    //         const options = {
    //             method: 'GET',
    //             headers: {
    //                 'x-rapidapi-key': '611886a669msh1f79e30ab465d64p195c6bjsn7c486ef58ded',
    //                 'x-rapidapi-host': 'flights-sky.p.rapidapi.com'
    //             }
    //         };
    //         const response = await fetch(url, options);
    //         const gottenResponse: RootObject = await response.json();
    //         if (!response.status) {
    //             throw new Error("Something went wrong, try again later");
    //         }
    //         setData(gottenResponse);
    //         setLoading(false);
    //     }
    //     catch (error) {
    //         if (error instanceof Error) {
    //             toast.error(`Error: ${error.message==='failed to fetch'?'pls Check your internet connection':error.message}`, {
    //                 position: 'top-right',
    //                 autoClose: 2000,
    //                 hideProgressBar: true,
    //                 pauseOnHover: true,
    //             })
    //             console.log("Error message:=> ",error.message)
    //         }
    //         else{
    //             toast.error('Something went wrong', {
    //                 position: 'top-right',
    //                 autoClose: 2000,
    //                 hideProgressBar: true,
    //                 pauseOnHover: true,
    //             })
    //         }
    //         setLoading(false);
    //         setData({
    //             message: '',
    //             status: false,
    //             data: []
    //         });
    //     }
    // }
    //
    // function findHotelAction(e: React.ChangeEvent<HTMLInputElement>) {
    //     const value = e.target.value;
    //     const debounceTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    //     setCityName(value);
    //     if (debounceTimeoutRef.current) clearTimeout(debounceTimeoutRef.current);
    //     debounceTimeoutRef.current = setTimeout(() => {
    //         if (value.trim()) {
    //             search(value.trim())
    //         }
    //     }, 1000);
    // }

    return (
        <ReduxProvider>
                <div className={
                    // Array.isArray(hotelsFound) ? 'hidden' :
                        'flex flex-col gap-[20px] py-[10px] bg-gray-300'}>
                    <div className={`relative ${styles.roomSection}`}>
                        {props.data.map((item, index) => (
                            <div key={index} className={`md:order-${index} group relative w-full h-full overflow-hidden`}>
                                <div className="w-full h-full transition-transform duration-300 ease-in-out transform group-hover:scale-110 group-hover:brightness-[.8] brightness-[.7]">
                                    <Image src={item.image.src} alt="" width={300} height={300} className="object-cover w-full h-full"/>
                                </div>
                                <div className="absolute inset-0 border-2 border-transparent border-white animate-border-animation z-10 pointer-events-none m-[30px] p-[10px]">
                                    <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-20">
                                        <p className={styles.heading}>Price: {item.heading}</p>
                                        <p className={styles.description}>{item.description}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            {/*    {showSearchButton ? (*/}
            {/*        <div className="flex justify-center py-[10px]">*/}
            {/*            <Button variant="contained" onClick={() => {setShowSearchButton(false);}}>Find City</Button>*/}
            {/*        </div>*/}
            {/*    ) : (*/}
            {/*        <div className={!isInputShowing ? 'hidden':'flex flex-col py-[10px] pl-[20px] relative'}>*/}
            {/*            <p className={'text-gray-600'}>Find Hotel By city</p>*/}
            {/*            <input type="text" placeholder="City name..." name={'cityName'} value={cityName} className={'w-[70%] lg:w-[30%] h-[40px] rounded-md text-black p-[5px]'} onChange={(e) => {findHotelAction(e);}}/>*/}
            {/*            {isLoading ? (*/}
            {/*                <p className={'w-[70%] lg:w-[30%] shadow-md border-[1px] p-1 items-center flex justify-center'}>*/}
            {/*                    <CircularProgress size={40}/>*/}
            {/*                </p>*/}
            {/*            ) : (*/}
            {/*                <div>*/}
            {/*                    {cityName && data.data.length > 0 ? (*/}
            {/*                        <div className={'flex flex-col w-[70%] lg:w-[30%] max-h-[100px] overflow-y-auto border-[1px] gap-[1px] shadow-md mt-[1px]'}>*/}
            {/*                            {data.data.map((options, index) => (*/}
            {/*                                <div key={index} className={styles.options} onClick={() => {*/}
            {/*                                    setSelectedIndex(index);PopUp(selectedIndex);setSelectedData(options);*/}
            {/*                                    setCityName('');setInputShowing(false)}}>*/}
            {/*                                    <p className={'text-[13px]'}>{options.entityName}</p>*/}
            {/*                                    <p className={'text-[15px] font-[700]'}>{options.hierarchy}</p>*/}
            {/*                                </div>*/}
            {/*                            ))}*/}
            {/*                        </div>*/}
            {/*                    ) : (*/}
            {/*                        <p className={'text-[12px] md:text-[14px] font-[900]'}>no result found</p>*/}
            {/*                    )*/}

            {/*                    }*/}
            {/*                </div>*/}
            {/*            )}*/}
            {/*        </div>*/}
            {/*    )}*/}
            {/*</div>*/}
            {/*<div className={isResultLoading? 'flex':'hidden'}>*/}
            {/*    <div className={'w-[100%] h-[300px] items-center flex justify-center'}>*/}
            {/*        <CircularProgress size={50}/>*/}
            {/*        <p style={{color: 'var(--text-color)'}} className={'text-[17px]'}>Loading..</p>*/}
            {/*    </div>*/}
            {/*</div>*/}
            {/*<div className={isResultLoading? 'hidden' : `flex flex-col gap-[10px] px-[10px] py-[20px] pl-[10px ]sm:pl-[35px] bg-gray-300`}>*/}
            {/*    {*/}
            {/*        result ? (*/}
            {/*            <>*/}
            {/*                <p className={'text-[20px] font-[900]'} style={{color: 'black'}}>Found Results</p>*/}
            {/*                <div className={` flex flex-col gap-[15px] sm:columns-[300px] w-full h-auto max-h-[300px] overflow-y-auto justify-between px-[15px]`}>*/}
            {/*                    {*/}
            {/*                        MapResultsToHotelInfo(result ?? ({} as Results)).map((item, index) => {*/}
            {/*                            const imageUrl = item.images[0]?.startsWith('http') ? item.images[0] : replaceImage*/}
            {/*                            return (*/}
            {/*                                <div key={index} className={'border-[1px] p-[5px] flex w-full sm:w-[400px] h-[200px] -ml-[10px] sm:-ml-0 justify-center items-center hover:border-[1px]'}>*/}
            {/*                                    <div className={'flex w-[100px] h-[100px] sm:w-[50px] sm:h-[50px]'}>*/}
            {/*                                        <Image src={imageUrl} alt={''} width={120} height={120} className={'object-center object-cover'}/>*/}
            {/*                                    </div>*/}
            {/*                                    <section className={'flex justify-center flex-col gap-[5px] px-[15px] md:px-0 w-[70%] sm:w-[200px]'}>*/}
            {/*                                        <div className={'flex justify-between items-center'}>*/}
            {/*                                            <p style={{color: 'black', fontWeight: 720}} className={'text-[12px] sm:text-[17px] w-[80%] overflow-hidden whitespace-nowrap text-ellipsis'}>{item.name}</p>*/}
            {/*                                        </div>*/}
            {/*                                        <div className={'flex justify-between py-[7px]'}>*/}
            {/*                                            <section className={'flex gap-[15px] justify-center'}>*/}
            {/*                                                <LocalOfferIcon className={'w-[20px] h-[20px]'} style={{color: 'var(--text-color)'}}/>*/}
            {/*                                                <p style={{color: 'black'}} className={'text-black flex items-center w-[70%] text-[9px] sm:text-[12px] whitespace-nowrap overflow-hidden text-ellipsis'}>*/}
            {/*                                                    {item.price} Per Night*/}
            {/*                                                </p>*/}
            {/*                                            </section>*/}
            {/*                                            <section className={'flex gap-1 sm:gap-[15px] justify-center items-center'}>*/}
            {/*                                                <GradeIcon className={'w-[20px] h-[20px]'} style={{color: 'gold'}}/>*/}
            {/*                                                <p style={{color: 'black'}} className={'text-[10px]'}>{item.rating?? '3'}</p>*/}
            {/*                                            </section>*/}
            {/*                                        </div>*/}
            {/*                                    </section>*/}
            {/*                                </div>*/}
            {/*                            )*/}
            {/*                        })*/}
            {/*                    }*/}
            {/*                </div>*/}
            {/*            </>*/}
            {/*        ) : (*/}
            {/*            <div className={isInputShowing?'':'hidden'}>*/}
            {/*                <p className={'text-[15px] text-center text-black '}>No Results</p>*/}
            {/*            </div>*/}
            {/*        )*/}
            {/*    }*/}
            {/*    <div className={!isInputShowing ? "flex justify-center py-[10px] w-[100%] items-center mt-[20px]":'hidden'}>*/}
            {/*        <Button variant="contained" onClick={() => {setHotelsFound(undefined);setInputShowing(true)*/}
            {/*            setShowSearchButton(false)}}>*/}
            {/*            Find City*/}
            {/*        </Button>*/}
            {/*    </div>*/}
            {/*</div>*/}
            {/*<SelectionModal isOpen={popUp} closeModal={handleModalClose}/>*/}
            {/*<ToastContainer/>*/}
        </ReduxProvider>
    );
}