import { useState, useEffect } from 'react';
import { Message } from '../types/message.js';

export const useInfo = () => {
    const [message, setMessage] = useState<Message>(null);


    return {
        message,
        setMessage
    }
}