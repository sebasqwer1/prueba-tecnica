import { Message } from "./result-message";

export interface Result<T> {
    Data: T | null;
    Succeeded: boolean;
    Message: Message
}