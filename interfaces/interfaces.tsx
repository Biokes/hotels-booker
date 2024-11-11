import {ReactNode} from "react";
import {StaticImageData} from "next/image";

export interface ProviderProps{
    children: ReactNode
}
export interface RoomsData{
    image:StaticImageData,
    heading:string,
    description:string
}
export interface Reviews extends RoomsData{
    name:string,
    role:string
}
export interface UserState{
    color:string,
    base_url:string,
}