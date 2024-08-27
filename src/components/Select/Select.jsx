import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function BasicSelect({ filteredTickets, setFilteredTickets }) {
    const [sortOrder, setSortOrder] = useState('');

    useEffect(() => {
        let sorted = [...filteredTickets];
        
        switch (sortOrder) {
            case 'latest':
                sorted.sort((a, b) => {
                    const parseDate = (dateString) => {
                        const [day, month, year] = dateString.split('.').map(Number);
                        return new Date(`${year}-${month}-${day}`);
                    };
                    return parseDate(b.date) - parseDate(a.date);
                });
                break;
        
            case 'low':
                sorted.sort((a, b) => a.price - b.price);
                break;
            case 'high':
                sorted.sort((a, b) => b.price - a.price);
                break;
            default:
                break;
        }
        
        setFilteredTickets(sorted);
    }, [sortOrder, filteredTickets, setFilteredTickets]);

    const handleChange = (event) => {
        setSortOrder(event.target.value);
    };

    return (
        <Box sx={{ width: 200 }}>
            <FormControl fullWidth>
                <InputLabel id="sort-by-label">Sort by</InputLabel>
                <Select
                    labelId="sort-by-label"
                    id="sort-by-select"
                    value={sortOrder}
                    label="Sort by"
                    onChange={handleChange}
                >
                    <MenuItem value="latest">Latest</MenuItem>
                    <MenuItem value="low">Price: low to high</MenuItem>
                    <MenuItem value="high">Price: high to low</MenuItem>
                </Select>
            </FormControl>
        </Box>
    );
}
