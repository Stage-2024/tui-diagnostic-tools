import { useState } from 'react';

export const usePagination = (itemsPerPage: number, totalItems: number) => {
  const [page, setPage] = useState<number>(1);

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

  const paginatedItems = (items: any[]) => items.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  return { page, nextPage, prevPage, paginatedItems };
};
