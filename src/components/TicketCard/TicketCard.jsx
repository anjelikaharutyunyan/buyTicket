import { Card, CardContent, CardMedia, Typography, IconButton } from '@mui/material';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import ShoppingCart from '@mui/icons-material/ShoppingCart';
import Favorite from '@mui/icons-material/Favorite';
import { Timestamp } from 'firebase/firestore';

function formatTimestamp(date) {
    if (date instanceof Timestamp) {
        date = date.toDate();  
    }
    if (date instanceof Date) {
        return date.toLocaleString('hy-AM', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });
    }
    return 'Invalid date';
}

const TicketCard = ({ ticket, isLiked, onLike }) => {
    const formattedDate = formatTimestamp(ticket.date); 
    return (
        <Card sx={{ maxWidth: 270, mb: 2 }}>
            <CardMedia
                component="img"
                height="140"
                image={ticket.image}
                alt={ticket.title}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {ticket.title}
                </Typography>
                <Typography variant="body2" color="text.primary">
                    {formattedDate || 'No date available'} 
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {ticket.description}
                </Typography>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
                    <IconButton color="text.primary" sx={{ mt: 2 }}>
                        ${ticket.price}
                    </IconButton>
                    <IconButton onClick={onLike} sx={{ mt: 2 }}>
                        {isLiked ? <Favorite color="error" /> : <FavoriteBorder />}
                    </IconButton>
                    <IconButton sx={{ mt: 2 }}>
                        <ShoppingCart />
                    </IconButton>
                </div>
            </CardContent>
        </Card>
    );
};

export default TicketCard;
