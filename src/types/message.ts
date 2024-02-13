export type Message = null | {
    content? : {
        text: string
        highlight? : boolean
    }[], 
    loader? : boolean
}