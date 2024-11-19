'use client'
import {useRef, useState} from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {RootObject, RoomsData, DataItem} from '@/interfaces/interfaces';
import Image from "next/image";
import styles from "@/styles/about.module.css";
import { splitAndConcat } from '@/utils/functions';
import {Box, Button, CircularProgress, Modal, TextField} from "@mui/material";
import {useAppDispatch} from "@/redux/store";
import {setBookingHotel} from "@/redux/userSlice";

function MyModal() {
    const SelectionModal = (props: {
        isOpen: boolean,
        close: () => void,
        dataSelected: DataItem,
        closeModal: () => void
    }) => {
        return (
            <Modal open={props.isOpen} onClose={props.closeModal} sx={{
                position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400,
                bgcolor: 'background.paper', border: '2px solid #000', boxShadow: 24, p: 2,
            }}>
                <Box>
                    <div className={'flex justify-between items-center'}>
                        <p className={'text-[15px] font-[750]'} style={{fontFamily: 'Dm Sans'}}>Booking filters</p>
                    </div>
                    <form>
                        <div className={'flex justify-between'}>
                            <section>
                                <p>Checkin date</p>
                                <input type='date' placeholder='checkInDate' required/>
                            </section>
                            <section>
                                <p>Checkout Date</p>
                                <input type="date" placeholder='checkOutDate' required/>
                            </section>
                        </div>
                        <section>
                            <div>
                                <p>Number of Adults (Optional)</p>
                                <TextField type="text" label={'Number of adults'} placeholder={'Number of adults'}/>
                            </div>
                            <div>
                                <p>Number of Children (Optional)</p>
                                <TextField type="text" label={'Number of Children'} placeholder={'Number of Children'}/>
                            </div>
                            <div>
                                <p>Number of Adults (Optional)</p>
                                <TextField type="text" label={''}/>
                            </div>
                        </section>

                        <Button variant={'contained'}>Search</Button>
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
    const [selectedData , setSelectedData] = useState<DataItem>({
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

    const close =()=>{setPopUp(false); }
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
        <div className={'flex flex-col gap-[20px] py-[10px] bg-gray-300'}>
            <div className={`relative ${styles.roomSection}`}>
                {props.data.map((item, index) => (
                    <div key={index} className={`md:order-${index} group relative w-full h-full overflow-hidden`}>
                        <div className="w-full h-full transition-transform duration-300 ease-in-out transform group-hover:scale-110 group-hover:brightness-[.8] brightness-[.7]">
                            <Image src={item.image.src} alt="" width={300} height={300} className="object-cover w-full h-full" />
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
            {showSearchButton ? (
                <div className="flex justify-center py-[10px]">
                    <Button variant="contained" onClick={() => setShowSearchButton(false)}>Find City</Button>
                </div>
            ) : (
                <div className={`flex flex-col py-[10px] pl-[20px] relative`}>
                    <p className={'text-gray-600'}>Find Hotel By city</p>
                    <input type="text" placeholder="City name..." name={'cityName'} value={cityName} className={'w-[70%] lg:w-[30%] h-[40px] rounded-md text-black p-[5px]'}
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
                            <CircularProgress size={40} />
                        </p>
                    ) : (
                        <div>
                            {data.data.length > 0 ? (
                                <div className={'flex flex-col w-[70%] lg:w-[30%] max-h-[100px] overflow-y-auto border-[1px] gap-[1px] shadow-md mt-[1px]'}>
                                    {data.data.map((options, index) => (
                                        <div key={index} className={styles.options} onClick={()=> {
                                            setSelectedIndex(index)
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
            <SelectionModal isOpen={popUp} close={close} dataSelected={selectedData} closeModal={handleModalClose}/>
            <ToastContainer />
        </div>
    );
}

