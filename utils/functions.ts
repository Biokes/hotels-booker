import {DataItem, HotelResponse} from '@/interfaces/interfaces'
export function splitAndConcat(input:string): string{
    return input.split(/\s+/)
            .filter(d=>d.trim().length>0)
            .map((word)=>word.trim())
            .join('%20');
}
// export async function ImportHotels(args: DataItem[]){
//     args.forEach((item)=>{
//         const url = `https://flights-sky.p.rapidapi.com/hotels/search?entityId=${item.entityId}`;
//         const options = {
//             method: 'GET',
//             headers: {
//                 'x-rapidapi-key': 'febfd66cf9msh276ca2c333c55b2p17a072jsnb411682e032e',
//                 'x-rapidapi-host': 'flights-sky.p.rapidapi.com'
//             }
//         }
//         try {
//             const response:Promise<Response>   = fetch(url, options);
//             console.log("Response :", response)
//             const data: HotelResponse = response.json()
//             return response;
//         } catch (error) {
//             console.error(error);
//         }
//     })
// }
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
