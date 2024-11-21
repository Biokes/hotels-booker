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
export function createSearchUrl(data:{
    entityId: string;
    checkin: string;
    checkout: string;
    adults?: string;
}): string {
    const queryParams = new URLSearchParams(
        Object.entries(data).reduce((acc, [key, value]) => {
            if (value) acc[key] = value;
            return acc;
        }, {} as Record<string, string>)
    );

    return `https://flights-sky.p.rapidapi.com/hotels/search?${queryParams.toString()}`
}


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
    if (!results || results.hotelCards.length === 0) {
        return [];
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
