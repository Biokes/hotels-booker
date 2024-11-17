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
}
export interface Contact{
    name:string,
    phone:string,
    message:string,
    email:string
}
export interface Coordinates {
    lat: string;
    long: string;
}

export interface RegionNames {
    fullName: string;
    shortName: string;
    displayName: string;
    primaryDisplayName: string;
    secondaryDisplayName: string;
    lastSearchName: string;
}

export interface HierarchyInfo {
    country: {
        name: string;
        isoCode2: string;
        isoCode3: string;
    };
    airport: {
        airportCode: string;
        airportId: string;
        metrocode: string;
        multicity: string;
    };
}

export interface RegionResult {
    gaiaId: string;
    type: string;
    regionNames: RegionNames;
    coordinates: Coordinates;
    hierarchyInfo: HierarchyInfo;
    locationId: string;
}

export interface ResponseData {
    data: {
        q: string;
        rid: string;
        rc: string;
        sr: RegionResult[];
    };
}
