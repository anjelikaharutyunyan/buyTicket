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
    return 'dd.mm.yyyy';
}
const no_available_image = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQO5kCepNdhZvDKJtmPAIWnloSdTal7N1CQaA&s'

const TicketCard = ({ ticket, isLiked, onLike }) => {
    const formattedDate = formatTimestamp(ticket.date); 
    return (
        <Card sx={{ width: 270, mb: 2 }}>
            <CardMedia
                component="img"
                height="140"
                image={ticket.image || no_available_image}
                alt={ticket.title}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {ticket.title || 'title'}
                </Typography>
                <Typography variant="body2" color="text.primary">
                    {formattedDate} 
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {ticket.description || 'event description'}
                </Typography>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
                    <IconButton color="text.primary" sx={{ mt: 2 }}>
                        ${ticket.price || '0'}
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
