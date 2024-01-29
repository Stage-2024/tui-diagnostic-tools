import { useState } from 'react';
export const usePagination = (itemsPerPage, totalItems) => {
    const [page, setPage] = useState(1);
    const nextPage = () => {
        if (page * itemsPerPage < totalItems) {
            setPage(prevPage => prevPage + 1);
        }
    };
    const prevPage = () => {
        if (page > 1) {
            setPage(prevPage => prevPage - 1);
        }
    };
    const paginatedItems = (items) => items.slice((page - 1) * itemsPerPage, page * itemsPerPage);
    return { page, nextPage, prevPage, paginatedItems };
};
