import { useState, useEffect } from 'react';
import { Clipboard } from '../types/clipboard.js';

export const useClipboard = () => {
    const [clipboard, setClipboard] = useState<Clipboard>(null);

    return {
        value: clipboard,
        setValue: setClipboard
    }
}