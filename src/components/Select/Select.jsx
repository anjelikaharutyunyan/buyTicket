import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../../firebase/firebase';

export default function BasicSelect({ filteredTickets, setFilteredTickets }) {
    const [sortOrder, setSortOrder] = useState('');

    useEffect(() => {
        const ticketsCollection = collection(db, 'ticket');
        let firestoreQuery = ticketsCollection;
        
        switch (sortOrder) {
            case 'latest':
                firestoreQuery = query(ticketsCollection, orderBy('date', 'desc'));
                break;
            case 'low':
                firestoreQuery = query(ticketsCollection, orderBy('price', 'asc'));
                break;
            case 'high':
                firestoreQuery = query(ticketsCollection, orderBy('price', 'desc'));
                break;
            default:
                firestoreQuery = query(ticketsCollection); 
                break;
        }
        const unsubscribe = onSnapshot(firestoreQuery, (snapshot) => {
            const tickets = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setFilteredTickets(tickets);
        });
        return () => unsubscribe();
    }, [sortOrder, setFilteredTickets]);

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
