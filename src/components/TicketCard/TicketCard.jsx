import { Card, CardContent, CardMedia, Typography, IconButton } from '@mui/material';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import ShoppingCart from '@mui/icons-material/ShoppingCart';
import Favorite from '@mui/icons-material/Favorite';

const TicketCard = ({ ticket, isLiked, onLike }) => {
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
                <Typography variant="p" color="common.black">
                    {ticket.date}
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
