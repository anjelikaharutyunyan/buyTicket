import * as React from 'react';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import useSoonestDates from '../../hooks/useSoonestDate';
import { tickets } from '../TicketCard/constants';

export default function BasicSelect() {
    const [sortOrder, setSortOrder] = useState('latest');
    const [sortedTickets, setSortedTickets] = useState([]);
    
    // Call the hook at the top level
    const soonestTickets = useSoonestDates(tickets);

    useEffect(() => {
        let sorted = [...tickets];
        
        switch (sortOrder) {
            case 'latest':
                sorted = soonestTickets; // Use the tickets sorted by soonest date
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
        
        setSortedTickets(sorted);
    }, [sortOrder, tickets, soonestTickets]);

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
