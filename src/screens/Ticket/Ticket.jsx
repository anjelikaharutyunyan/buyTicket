import { Card, CardContent, CardMedia, Typography, IconButton } from '@mui/material';
import { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebase';

const Ticket = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [price, setPrice] = useState('');
    const [date, setDate] = useState('');

    const handlePushData = async () => {
        try {
            const ticketCollection = collection(db, 'ticket');
            await addDoc(ticketCollection, {
                title,
                description,
                image,
                price: parseFloat(price),
                date: new Date(date),
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
        <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '300px' }}>
                <h1>Create your own ticket</h1>
                <label>Add event title</label>
                <input
                    type='text'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)} />
                <label>Add description of event</label>
                <input
                    type='text'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)} />
                <label>Add image link</label>
                <input
                    type='text'
                    value={image}
                    onChange={(e) => setImage(e.target.value)} />
                <label>Price</label>
                <input
                    type='number'
                    value={price}
                    onChange={(e) => setPrice(e.target.value)} />
                <label>Date</label>
                <input
                    type='date'
                    value={date}
                    onChange={(e) => setDate(e.target.value)} />
                <button onClick={handlePushData}>Submit</button>
            </div>
            <div style={{ marginTop: '20px' }}>
                <Card sx={{ maxWidth: 270, mb: 2 }}>
                    <CardMedia
                        component="img"
                        height="140"
                        image={image || 'https://via.placeholder.com/140'}
                        alt={title}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {title || 'Ticket Title'}
                        </Typography>
                        <Typography variant="body2" color="text.primary">
                            {new Date(date).toLocaleDateString() || 'dd-mm-yyyy'}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {description || 'Description for event'}
                        </Typography>
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
                            <IconButton color="text.primary" sx={{ mt: 2 }}>
                                ${price || '0.00'}
                            </IconButton>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default Ticket;
