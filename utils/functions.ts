export default function splitAndConcat(input:string): string{
    return input.split(/\s+/)
            .filter(d=>d.trim().length>0)
            .map((word)=>word.trim())
            .join('%20');
}
