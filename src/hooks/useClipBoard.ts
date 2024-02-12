import { useState, useEffect } from 'react';
import { ClipBoard } from '../types/clipBoard.js';

export const useClipBoard = () => {
    const [clipBoard, setClipBoard] = useState<ClipBoard>({item: null});

    return {
        value: clipBoard,
        setValue: setClipBoard
    }
}