import { SwitchAction } from "./switchAction.js"

export default interface Switch {
    default: SwitchAction, 
    [key: string]: SwitchAction
}