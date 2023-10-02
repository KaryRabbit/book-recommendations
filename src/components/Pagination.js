import { TablePagination } from '@mui/material';
import React from 'react';

const Pagination = (props) => {
  const handleChangeRowsPerPage = (event) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    const newPage = Math.floor(
      (props.page * props.itemsPerPage) / newRowsPerPage
    );
    props.onPaginationChange(newPage, newRowsPerPage);
  };

  return (
    <TablePagination
      component="div"
      count={props.total}
      page={props.page}
      rowsPerPage={props.itemsPerPage}
      rowsPerPageOptions={[10, 20, 40]}
      onRowsPerPageChange={handleChangeRowsPerPage}
      onPageChange={props.handlePageChange}
    />
  );
};

export default Pagination;
