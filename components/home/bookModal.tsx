'use client'
import {Modal, Box, Typography, IconButton, DialogActions, TextField,Button} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import {ReactNode, useState} from 'react'
import Image from 'next/image'
import styles from '@/styles/reuseable.module.css'
interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function BookingModal({ isOpen, onClose }: ModalProps){
    const [formValues, setFormValues] = useState({
        location: '',
        checkInDate: '',
        checkOutDate: ''
    });
    const defaultContent =()=> (
        <div>
            <div className={'flex justify-between items-center border-b-[1px]'}>
                <Typography variant="h6" component="h2" sx={{ color: '#475661', fontSize: { xs: '1.2rem', sm: '1.5rem' },width:'80%%', margin:'10px' }}>
                    Search by Location
                </Typography>
                <IconButton onClick={onClose} className={'hover:bg-red-500 hover:text-white transform transition-all duration-[300]'}>
                    <CloseIcon />
                </IconButton>
            </div>
            <form onSubmit={(e) => {
                e.preventDefault();
                proceedToCheckHotels();
            }}>
                <Box className={'px-[20px] md:px-[30px] pt-[20px]'}>
                    <Box className={styles.sectionPack}>
                        <div>
                            <p>Location</p>
                            <input className={styles.inputTags} type="text" placeholder="Eg. Lagos" value={formValues.location} max="2025-12-31"
                                       onChange={(e) => {
                                       setFormValues({...formValues, location: e.target.value})
                                   }}
                            />
                        </div>
                    </Box>
                    <Box className={styles.sectionPack}>
                        <div>
                            <p>Arrival Date</p>
                            <input className={styles.inputTags} type="date" value={formValues.checkInDate}
                                       onChange={(e) => {
                                       setFormValues({...formValues, checkInDate: e.target.value})
                                   }}
                                       min={new Date().toISOString().split('T')[0]} required={true}
                            />
                        </div>
                        <div>
                            <p>Departure Date</p>
                            <input className={styles.inputTags} type="date" value={formValues.checkOutDate} required={true}
                                       onChange={(e) => {
                                       setFormValues({...formValues, checkOutDate: e.target.value})
                                   }}
                                       min={formValues.checkInDate  ?
                                       new Date(new Date(formValues.checkInDate ).getTime() + 24 * 60 * 60 * 1000).toISOString().split('T')[0] :
                                       new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toISOString().split('T')[0]}
                            />
                        </div>
                    </Box>
                </Box>
                <DialogActions sx={{ mt:3 }}>
                    <Button variant="outlined" onClick={onClose}>Cancel</Button>
                    <Button variant="contained" type="submit"
                            disabled={!formValues.location.trim() || !formValues.checkInDate || !formValues.checkOutDate ||
                                new Date(formValues.checkOutDate) < new Date(formValues.checkInDate)}
                    >
                        Proceed
                    </Button>
                </DialogActions>
            </form>
        </div>
    )

    const [modalContent, setModalContent] = useState<ReactNode>(defaultContent())
    const hotelsData= [
        {
            imageURl: "https://media.istockphoto.com/id/119926339/photo/resort-swimming-pool.jpg?s=612x612&w=0&k=20&c=9QtwJC2boq3GFHaeDsKytF4-CavYKQuy1jBD2IRfYKc=",
            price:"400,000",
            name:"The Guest House",
            rating:'4.7'
        },
        {
            imageURl: "https://as2.ftcdn.net/jpg/00/09/21/15/1000_F_9211505_d4hxfNtPeTfgt7AeGmoO7u79P2hwxkoQ.jpg",
            price:"300,000",
            name:'Lodge Hotels',
            rating:"4.5"
        },
        {
            imageURl: "https://as2.ftcdn.net/jpg/02/95/21/53/1000_F_295215313_mTUn9iAqmfVHCiEGfOuaz9tmjG0JDa1p.jpg",
            price:"200,000",
            name:'Green light Suites',
            rating:'4.5'
        },
    ]
    const hotelsInLocation =()=>(
            <div className={'flex flex-col gap-[10px] overflow-auto'}>
                {
                    hotelsData.map((index) => (
                        <div key={index.name} className={'flex gap-[10px] border-[1px] border-gray-200 rounded-[20px] px-[5px]'}>
                            <div className={'w-[40%] h-[40%]'}>
                                <Image src={index.imageURl} alt={'hotel'} className={'w-full h-full'}/>
                            </div>
                            <section className={'flex flex-col gap-[7px]'}>
                                <p className={'text-[13px] font-[650]'}>{index.name}</p>
                                <p className={'text-[13px] font-thin'}>price: <strong>N {index.price}</strong></p>
                                <p>ratings: <strong>{index.rating}/5</strong></p>
                            </section>
                        </div>
                    ))
                }
            </div>
    )
    const proceedToCheckHotels = () => {
        setModalContent(hotelsInLocation())
    };

    if (!isOpen) return null;
    return (
        <>
            <div className="fixed inset-0 bg-customBlue_dark bg-opacity-80 z-40" onClick={onClose}></div>
            <Modal open={isOpen} onClose={onClose}>
                <Box sx={{
                        position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                        width: { xs: '90%', sm: '70%', md:'40%' }, backgroundColor: 'background.paper', boxShadow: 24,
                        p: 2, borderRadius: 2, zIndex: 50,overflowY: 'auto', maxHeight: '80vh',
                    }}>
                    {modalContent}
                </Box>
            </Modal>
        </>
    );
};