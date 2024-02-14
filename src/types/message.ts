export type Message = null | {
    content? : {
        text: string
        highlight? : boolean
    }[], 
    loader? : "dots" | "dots4" | "arc" | "flip"
}