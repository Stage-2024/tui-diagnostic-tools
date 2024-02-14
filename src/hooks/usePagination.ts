import { useState } from 'react';

export const usePagination = <T>(itemsPerPage: number, totalItems: T[]) => {
  const [page, setPage] = useState<number>(1);
  const pageCount = Math.ceil(totalItems.length / itemsPerPage)

  const nextPage = () => {
    setPage((prevPage) => prevPage % pageCount + 1);
  };

  const prevPage = () => {
    if (page > 1) {
      setPage(prevPage => prevPage - 1);
    } else {
      setPage(pageCount)
    }
  };

  const items: T[] = totalItems.slice((page - 1) * itemsPerPage, page * itemsPerPage);
  return { page, pageCount, nextPage, prevPage, items };
};
