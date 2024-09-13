import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardMedia, Typography, IconButton } from '@mui/material';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import ShoppingCart from '@mui/icons-material/ShoppingCart';
import Favorite from '@mui/icons-material/Favorite';
import { Timestamp } from 'firebase/firestore';
import { collection, doc, getDocs, query, setDoc } from 'firebase/firestore';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { db } from '../../firebase/firebase';
import { addToCart } from '../../Store/cartSlice';
import { styled } from '@mui/material/styles';

const StyledCard = styled(Card)(({ theme }) => ({
    width: 270,
    marginBottom: theme.spacing(2),
    transition: 'transform 0.3s ease',
    '&:hover': {
        transform: 'scale(1.05)', // Scale card by 5% on hover
    },
    cursor: 'pointer',
}));

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

const no_available_image = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQO5kCepNdhZvDKJtmPAIWnloSdTal7N1CQaA&s';

const TicketCard = ({ ticket, isLiked, onLike, onCart, handleOpenModal }) => {
    const formattedDate = formatTimestamp(ticket.date);
    const [favorites, setFavorites] = useState([]);
    const [pendingAction, setPendingAction] = useState(null);
    const currentUser = useSelector((state) => state.auth.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchFavorites = async () => {
            if (!currentUser) return;

            const favoritesRef = collection(db, "users", currentUser.uid, "favorites");
            const q = query(favoritesRef);
            const querySnapshot = await getDocs(q);
            const favoriteTickets = querySnapshot.docs.map((doc) => doc.data());
            setFavorites(favoriteTickets);
        };

        fetchFavorites();
    }, [currentUser]);

    useEffect(() => {
        if (currentUser && pendingAction) {
            if (pendingAction.type === 'addToCart') {
                handleAddToCart();
            } else if (pendingAction.type === 'addToFavorites') {
                handleLike();
            }
            setPendingAction(null);
        }
    }, [currentUser, pendingAction]);

    const handleAddToCart = async () => {
        if (!currentUser) {
            setPendingAction({ type: 'addToCart' });
            handleOpenModal();
            return;
        }
        try {
            dispatch(addToCart());
            const cartRef = doc(db, "users", currentUser.uid, "cart", ticket.id);
            await setDoc(cartRef, ticket);
            onCart(ticket);
        } catch (error) {
            console.error("Error adding to cart: ", error);
        }
    };

    const handleLike = async () => {
        if (!currentUser) {
            setPendingAction({ type: 'addToFavorites' });
            handleOpenModal();
            return;
        }
        try {
            const favoritesRef = doc(db, "users", currentUser.uid, "favorites", ticket.id);
            await setDoc(favoritesRef, ticket);
            onLike(ticket);
        } catch (error) {
            console.error("Error adding to favorites: ", error);
        }
    };

    return (
        <StyledCard>
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
                    <IconButton onClick={handleLike} sx={{ mt: 2 }}>
                        {isLiked ? <Favorite color="error" /> : <FavoriteBorder />}
                    </IconButton>
                    <IconButton sx={{ mt: 2 }} onClick={handleAddToCart}>
                        <ShoppingCart />
                    </IconButton>
                </div>
            </CardContent>
        </StyledCard>
    );
};

export default TicketCard;
