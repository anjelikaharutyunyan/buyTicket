import { useState } from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const BasicPagination = ({ totalItems, itemsPerPage, onPageChange }) => {
    const [currentPage, setCurrentPage] = useState(1);

    const handlePageChange = (event, page) => {
        setCurrentPage(page);
        if (onPageChange) {
            onPageChange(page);
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', margin: '50px' }}>
            <Stack spacing={3}>
                <Pagination
                    count={Math.ceil(totalItems / itemsPerPage)}
                    page={currentPage}
                    onChange={handlePageChange}
                    color="primary"
                    sx={{
                        '& .MuiPaginationItem-root.Mui-selected': {
                            backgroundColor: 'orange',
                          },
                          '& .MuiPaginationItem-root.Mui-selected:hover': {
                            backgroundColor: '#f9a109',
                          },
                    }}
                />
            </Stack>
        </div>
    );
};

export default BasicPagination;
