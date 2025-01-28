'use client'
import { Modal, Box, Typography, IconButton, DialogActions, Button } from '@mui/material';
// import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import CloseIcon from '@mui/icons-material/Close';
// import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
// import { useDispatch } from 'react-redux';
// import Image from 'next/image';
import 'react-datepicker/dist/react-datepicker.css';
// import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
// import {DatePicker} from "@mui/x-date-pickers";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function BookingModal({ isOpen, onClose }: ModalProps){
    const handleSubmit = () => {

    };

    if (!isOpen) return null;

    return (
        <>
            <div className="fixed inset-0 bg-customBlue_dark bg-opacity-80 z-40" onClick={onClose}></div>

            <Modal open={isOpen} onClose={onClose}>
                <Box sx={{
                        position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                        width: { xs: '90%', sm: '70%' }, backgroundColor: 'background.paper', boxShadow: 24,
                        p: { xs: 2, sm: 4 }, borderRadius: 2, zIndex: 50,overflowY: 'auto', maxHeight: '80vh',
                    }}>
                    <IconButton onClick={onClose} sx={{ position: 'absolute', top: 8, right: 8 }}>
                        <CloseIcon />
                    </IconButton>

                    <Typography variant="h6" component="h2" sx={{ mb: 2, color: '#475661', fontSize: { xs: '1.2rem', sm: '1.5rem' } }}>
                        Book
                    </Typography>

                    <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
                        {/*<Box sx={{ mb: 2 }}>*/}
                        {/*    <Typography variant="body2" sx={{ mb: 1, color: '#475661' }}>Cohort Name</Typography>*/}
                        {/*    <TextField fullWidth placeholder="Ex. Cohort 1" variant="outlined" size="small"*/}
                        {/*               value={cohortName} onChange={(e) => {*/}
                        {/*        e.preventDefault()*/}
                        {/*        setCohortName(e.target.value)*/}
                        {/*    }} InputProps={{ style: { color: '#475661' } }}/>*/}
                        {/*</Box>*/}

                        {/*<Box sx={{ mb: 2 }}>*/}
                        {/*    <Typography variant="body2" sx={{ mb: 1, color: '#475661' }}>Description</Typography>*/}
                        {/*    <TextField*/}
                        {/*        fullWidth*/}
                        {/*        multiline*/}
                        {/*        rows={3}*/}
                        {/*        placeholder="Ex. A space for Python developers"*/}
                        {/*        variant="outlined"*/}
                        {/*        size="small"*/}
                        {/*        value={description}*/}
                        {/*        onChange={(e) => {*/}
                        {/*            e.preventDefault()*/}
                        {/*            setDescription(e.target.value)*/}
                        {/*        }}*/}
                        {/*        InputProps={{ style: { color: '#475661' } }}*/}
                        {/*    />*/}
                        {/*</Box>*/}

                        {/*<Box sx={{ mb: 2 }}>*/}
                        {/*    <Typography variant="body2" sx={{ mb: 1, color: '#475661' }}>Program</Typography>*/}
                        {/*    /!*<TextField*!/*/}
                        {/*    /!*    select*!/*/}
                        {/*    /!*    fullWidth*!/*/}
                        {/*    /!*    // value={program}*!/*/}
                        {/*    /!*    // onChange={(e) => setProgram(e.target.value)}*!/*/}
                        {/*    /!*    variant="outlined"*!/*/}
                        {/*    /!*    size="small"*!/*/}
                        {/*    /!*    InputProps={{ style: { color: '#475661' } }}*!/*/}
                        {/*    /!*>*!/*/}
                        {/*        <MenuItem value="" disabled>*/}
                        {/*            Select Program*/}
                        {/*        </MenuItem>*/}
                        {/*        {[*/}
                        {/*            { id: 1, name: "Product Design" },*/}
                        {/*            { id: 2, name: "Software Engineering" },*/}
                        {/*            { id: 3, name: "Techpreneurship" },*/}
                        {/*            { id: 4, name: "Dev-ops" },*/}
                        {/*            { id: 5, name: "Creative Design" },*/}
                        {/*            { id: 6, name: "UX Writer" },*/}
                        {/*        ].map((program) => (*/}
                        {/*            <MenuItem key={program.id} value={program.name}>*/}
                        {/*                {program.name}*/}
                        {/*            </MenuItem>*/}
                        {/*        ))}*/}
                        {/*    </TextField>*/}
                        {/*</Box>*/}

                        {/*<Box sx={{ mb: 2, display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>*/}
                        {/*    <div>*/}
                        {/*        <p className={'text-xs'}>Start Date</p>*/}
                        {/*        <div className="relative flex">*/}
                        {/*            <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} placeholderText="23 Dec 2021"*/}
                        {/*                        minDate={new Date()} dateFormat="dd-MM-yyyy"*/}
                        {/*                        className="w-full p-2 border rounded text-sm outline-none focus:ring-2 focus:ring-[#008eef]*/}
                        {/*                        focus:border-[#008eef]"/>*/}
                        {/*            <span className="absolute flex justify-center pointer-events-none">*/}
                        {/*                <CalendarTodayIcon className="h-[18px] w-[18px] ml-[160px] mt-[10px] text-[#475661]"/>*/}
                        {/*            </span>*/}
                        {/*        </div>*/}
                        {/*    </div>*/}
                        {/*    <div>*/}
                        {/*        <p className={'text-xs'}>End Date</p>*/}
                        {/*        <div className="relative flex">*/}
                        {/*            <DatePicker selected={endDate} onChange={(date) => setEndDate(date)}*/}
                        {/*                        minDate={new Date(new Date().setDate(new Date().getDate() + 1))}*/}
                        {/*                        dateFormat="dd-MM-yyyy" placeholderText="23 Dec 2023"*/}
                        {/*                        className="w-full p-2 border rounded text-sm outline-none focus:ring-2 focus:ring-[#008eef]*/}
                        {/*                        focus:border-[#008eef]"/>*/}
                        {/*            <span className="absolute flex justify-center pointer-events-none">*/}
                        {/*                <CalendarTodayIcon className="h-[18px] w-[18px] ml-[160px] mt-[10px] text-[#475661]"/>*/}
                        {/*            </span>*/}
                        {/*        </div>*/}
                        {/*    </div>*/}
                        {/*</Box>*/}

                        {/*<Box sx={{mb: 2}}>*/}
                        {/*    <Typography variant="body2" sx={{mb: 1, color: '#475661'}}>Add a cohort avatar</Typography>*/}
                        {/*    <Box sx={{*/}
                        {/*            border: '2px dashed lightblue',*/}
                        {/*            borderRadius: '8px',*/}
                        {/*            textAlign: 'center',*/}
                        {/*            cursor: 'pointer',*/}
                        {/*            mt: 1,*/}
                        {/*            backgroundColor: '#eaf5fa',*/}
                        {/*            height: '100px',*/}
                        {/*            overflow: 'hidden'*/}
                        {/*        }}>*/}
                        {/*</Box>*/}

                        <DialogActions sx={{ mt: 2 }}>
                            <Button variant="outlined" onClick={onClose}>Cancel</Button>
                            <Button variant="contained" type="submit">
                                Create Cohort
                            </Button>
                        </DialogActions>
                    </form>
                </Box>
            </Modal>
        </>
    );
};

