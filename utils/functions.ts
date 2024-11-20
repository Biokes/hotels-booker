import {Coordinates, DataItem, HotelResponse, LowestPrice, Results} from '@/interfaces/interfaces'
export function splitAndConcat(input:string): string{
    return input.split(/\s+/)
            .filter(d=>d.trim().length>0)
            .map((word)=>word.trim())
            .join('%20');
}
export async function ImportHotels(args: DataItem[]): Promise<HotelResponse[]> {
    const results: HotelResponse[] = [];
    for (const item of args) {
        const url = `https://flights-sky.p.rapidapi.com/hotels/search?entityId=${item.entityId}`;
        const options = {
            method: 'GET',
            headers: {
                'x-rapidapi-key': 'febfd66cf9msh276ca2c333c55b2p17a072jsnb411682e032e',
                'x-rapidapi-host': 'flights-sky.p.rapidapi.com',
            },
        };
        try {
            const response = await fetch(url, options);
            if (!response.status) {
                console.error(`Error fetching data for entityId: ${item.entityId}, Status: ${response.status}`);
                continue;
            }
            const data: HotelResponse = await response.json();
            results.push(data);
        } catch (error) {
            console.error(`Error fetching data for entityId: ${item.entityId}`, error);
        }
    }
    return results;
}
export const DefaultResults: Results = {
    priceType: "perNight",
    pricePolicy: "freeCancellation",
    searchSummary: {
        total: 0,
        filteredTotal: 0,
        inboundTotal: 0,
        resultsSummary: "No results found.",
        sortBy: "default",
        entity: {
            entityId: "1",
            entityType: "hotel",
            name: "Default Entity",
            coordinates: { latitude: 0, longitude: 0 },
        },
        location: [
            {
                entityId: "1",
                entityType: "location",
                name: "Default Location",
            },
        ],
    },
    mapBoundary: {
        north: 90,
        south: -90,
        west: -180,
        east: 180,
    },
    hotelCards: [
        {
            id: "1",
            name: "Default Hotel",
            stars: "3",
            distance: "5 km",
            relevantPoiDistance: "2 km",
            coordinates: { latitude: 0, longitude: 0 },
            pivot: false,
            images: ["image_url_1", "image_url_2"],
            reviewsSummary: {
                score: 4.2,
                scoreDesc: "Good",
                total: 150,
            },
            confidentMessages: [
                {
                    type: "discount",
                    score: 90,
                    icon: "discount_icon.png",
                    message: "Best Price",
                },
            ],
            lowestPrice: {
                price: "$100",
                rawPrice: 100,
                partnerId: "partner_1",
                partnerType: "OTA",
                partnerName: "Partner Name",
                partnerLogo: "partner_logo.png",
                isOfficial: true,
                funnelType: "default",
                amenities: ["Free Wi-Fi", "Breakfast", "Parking"],
            },
            otherPrices: [],
            isUpSorted: false,
            hotelId: "hotel_1",
            inbound: true,
        },
    ],
    filters: [],
    hotelsCoordinates: [],
    sortOptions: [],
    travelInfos: [],
    partnerList: [],
};

export const MapResultsToHotelInfo = (results: Results): {
    images: string[];
    distance: string;
    price: string;
    name: string;
    coordinates: Coordinates;
    rating: number | undefined;
    popularWith: string | null;
    location: string;
    stars: string;
    paymentPolicy: LowestPrice | string;
}[] => {
    // Guarding against an empty array or invalid results
    if (!results || results.hotelCards.length === 0) {
        return []; // If no results, return an empty array.
    }

    return results.hotelCards.map((hotel): {
        images: string[];
        distance: string;
        price: string;
        name: string;
        coordinates: Coordinates;
        rating: number | undefined;
        popularWith: string | null;
        location: string;
        stars: string;
        paymentPolicy: LowestPrice | string;
    } => {
        return {
            name: hotel.name,
            images: hotel.images,
            price: hotel.lowestPrice.price,
            paymentPolicy: hotel.lowestPrice || "no data available",
            location: hotel.relevantPoiDistance,
            coordinates: hotel.coordinates,
            rating: hotel.reviewsSummary ? hotel.reviewsSummary.score : undefined,
            distance: hotel.distance || "no data available",
            stars: hotel.stars || "1",
            popularWith: hotel.confidentMessages.length > 0 ? hotel.confidentMessages[0].message : null,
        };
    });
};
