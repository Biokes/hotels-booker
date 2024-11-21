import { ReactNode } from "react";
import { StaticImageData } from "next/image";

export interface ProviderProps {
    children: ReactNode;
}

export interface RoomsData {
    image: StaticImageData;
    heading: string;
    description: string;
}

export interface Reviews extends RoomsData {
    name: string;
    role: string;
}

export interface UserState {
    color: string;
    bookingHotel: DataItem;
}
export interface Contact {
    name: string;
    phone: string;
    message: string;
    email: string;
}

export interface Coordinates {
    latitude: number;
    longitude: number;
}

export interface Entity {
    entityId: string;
    entityType: string;
name: string;
    coordinates?: Coordinates;
    levelOfEntityType?: string;
}

export interface Location {
    entityId: string;
    entityType: string;
    name: string;
}

export interface SearchSummary {
    total: number;
    filteredTotal: number;
    inboundTotal: number;
    resultsSummary: string;
    sortBy: string;
    entity: Entity;
    location: Location[];
}
export interface MapBoundary {
    north: number;
    south: number;
    west: number;
    east: number;
}
export interface HotelsRegion {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
}
export interface ReviewSummary {
    score: number;
    imageUrl?: string;
    scoreDesc: string;
    total: number;
    mostPopularWith?: string;
}
export interface ConfidentMessage {
    type: string;
    score: number;
    icon: string;
    message: string;
}
export interface LowestPrice {
    price: string;
    rawPrice: number;
    rawBasePrice?: number;
    rawTaxAndFees?: number;
    partnerId: string;
    partnerType: string;
    partnerName: string;
    partnerLogo: string;
    isOfficial: boolean;
    funnelType: string;
    cug?: string;
    discount?: string;
    amenities: string[];
    isPriceCheapest?: boolean;
    url?: string;
}
export interface OtherPrice {
    partnerId: string;
    name: string;
    logo: string;
    price: string;
    url: string;
    isOfficial: boolean;
    funnelType: string;
    partnerType: string;
    rateFeatures: string[];
}
export interface Hotel {
    id: string;
    name: string;
    stars: string;
    distance: string;
    relevantPoiDistance: string;
    coordinates: Coordinates;
    pivot: boolean;
    images: string[];
    reviewsSummary: ReviewSummary;
    confidentMessages: ConfidentMessage[];
    minPriceDbookRoomId?: string;
    minPriceDbookPartnerId?: string;
    inbound: boolean;
    lowestPrice: LowestPrice;
    otherPrices: OtherPrice[];
    isUpSorted: boolean;
    hotelId: string;
}
export interface FilterValue {
    id: string;
    label: string;
    count: number;
    uniqueId: string;
    minPrice?: number;
    maxPrice?: number;
    icon?: string;
}
export interface Filter {
    type: string;
    title: string;
    values: FilterValue[];
}
export interface Results {
    priceType: string;
    pricePolicy: string;
    searchSummary: SearchSummary;
    mapBoundary: MapBoundary;
    hotelsRegion?: HotelsRegion;
    hotelCards: Hotel[];
    filters: Filter[];
    hotelsCoordinates?: never[];
    sortOptions?: SortOption[];
    travelInfos?: never[];
    partnerList?: string[];
}

export interface Data {
    results: Results;
    status?: Status;
    error?: never;
    correlationId?: string;
}
export interface HotelResponse {
    data: Data;
}
export interface ApiResponse {
    data: Data[];
    status: boolean;
    message: string;
}
export interface HotelInfo {
    name: string;
    images: string[];
    price: string;
    paymentPolicy: string;
    location: string;
    description?: string;
    coordinates: Coordinates;
    rating?: number;
    distance?: string;
    stars?: string;
    popularWith?: string | null;
}

export interface Highlight {
    entityName: string;
    hierarchy: string;
}

export interface DataItem {
    hierarchy: string;
    location: string;
    score: number;
    entityName: string;
    entityId: string;
    entityType: string;
    highlight: Highlight;
    class: string;
    pois?: null;
}
export interface RootObject {
    data: DataItem[];
    status: boolean;
    message: string;
}
export interface JsonResponse {
    data: Data;
    meta: Meta;
    status: boolean;
    message: string;
}
export interface SortOption {
    optionName: string;
    type: string;
}
export interface Status {
    completionPercentage: number;
    searchId: string;
    requestId: string;
    fastSearchStatus: string;
    finalStatus: string;
}
export interface Meta {
    currentPage: number;
    limit: number;
    totalRecords: number;
    totalPage: number;
}
