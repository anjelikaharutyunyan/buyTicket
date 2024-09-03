import { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebase';
import TicketCard from '../../components/TicketCard/TicketCard';
import { Box, TextField, Button, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

const Ticket = () => {
    const { t } = useTranslation();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [price, setPrice] = useState('');
    const [date, setDate] = useState('');

    const convertToDateObject = (dateStr) => {
        return dateStr ? new Date(dateStr) : null;
    };

    const handlePushData = async () => {
        try {
            const ticketCollection = collection(db, 'ticket');
            await addDoc(ticketCollection, {
                title,
                description,
                image,
                price: parseFloat(price),
                date: convertToDateObject(date),
            });
            setTitle('');
            setDescription('');
            setImage('');
            setPrice('');
            setDate('');
        } catch (error) {
            console.error('Error adding ticket:', error);
        }
    };

    return (
        <Box sx={{ display: 'flex', justifyContent: 'space-evenly', p: 2, mt: '100px', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '40%' }}>
                <Typography variant="h4" gutterBottom>{t('createTicket')}</Typography>
                <TextField
                    label={t('eventTitle')}
                    variant="outlined"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <TextField
                    label={t('eventDescription')}
                    variant="outlined"
                    multiline
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <TextField
                    label={t('image')}
                    variant="outlined"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                />
                <TextField
                    label={t('price')}
                    variant="outlined"
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />
                <TextField
                    label={t('date')}
                    variant="outlined"
                    type="datetime-local"
                    InputLabelProps={{ shrink: true }}
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                />
                <Button variant="contained" color="primary" onClick={handlePushData}>
                    {t('submit')}
                </Button>
            </Box>
            <Box sx={{ marginTop: 2, maxWidth: 270 }}>
                <TicketCard
                    ticket={{ title, description, image, price: parseFloat(price), date: convertToDateObject(date) }}
                    isLiked={false}
                />
            </Box>
        </Box>
    );
};

export default Ticket;
