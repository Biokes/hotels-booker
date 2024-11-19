// 'use client'
// import ReduxProvider from "@/app/ReduxProvider";
// import styles from '@/styles/reuseable.module.css'
// // import Navbar from "@/components/reuseables/navbar";
// // import Footer from "@/components/home/footer";
// // import {useAppSelector} from "@/redux/store";
// // import {DataItem} from "@/interfaces/interfaces";
// // import {useEffect, useState} from "react";
//
//
// export default function Bookings(){
//     // const [isLoading, setLoading] = useState<boolean>(false)
//     // const dataItems: DataItem[] = useAppSelector(state=>state.user.bookingHotel)
//
//     // useEffect( ()=>{
//     //     dataItems.forEach(async (item)=>{
//     //         const url = `https://flights-sky.p.rapidapi.com/hotels/search?entityId=${item.entityId}`;
//     //         const options = {
//     //             method: 'GET',
//     //             headers: {
//     //                 'x-rapidapi-key': 'febfd66cf9msh276ca2c333c55b2p17a072jsnb411682e032e',
//     //                 'x-rapidapi-host': 'flights-sky.p.rapidapi.com'
//     //             }
//     //         };
//     //
//     //         try {
//     //             const response = await fetch(url, options);
//     //             const result = await response.json();
//     //
//     //         } catch (error) {
//     //             console.error(error);
//     //         }
//     //     })
//     //     setLoading(!isLoading)
//     // },[isLoading])
//     const HotelBooking=()=>{
//
//         return (
//             <div>
//
//             </div>
//         )
//     }
//     const Loading= ()=>{
//         return (
//             <div className={styles.loading}>
//                 <p>Loading</p>
//             </div>
//         )
//     }
//     return (
//         <ReduxProvider>
//             {/*{isLoading? <Loading/> :<HotelBooking/>}*/}
//         </ReduxProvider>
//     )
// }