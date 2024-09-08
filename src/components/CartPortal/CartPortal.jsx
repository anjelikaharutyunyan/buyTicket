import ReactDOM from 'react-dom';
import { Box, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/firebase';
import Loader from '../Loader/Loader';
import CartTicket from './CartTicket';

const CartPortal = ({ open, onClose }) => {
  const currentUser = useSelector((state) => state.auth.user);
  const [loading, setLoading] = useState(true);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      setLoading(true);
      try {
        if (!currentUser) return;
        const cartCollection = collection(db, 'users', currentUser.uid, 'cart');
        const cartSnapshot = await getDocs(cartCollection);
        const cartList = cartSnapshot.docs.map(docSnap => ({
          id: docSnap.id,
          ...docSnap.data()
        }));
        setCartItems(cartList);
      } catch (error) {
        console.error("Error fetching cart tickets:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, [currentUser]);

  const handleRemoveCartItem = async (ticket) => {
    console.log('Removing ticket with id:', ticket.id);
    console.log('Ticket object:', ticket); 
    if (!currentUser) return;

    try {
        const cartDocRef = doc(db, 'users', currentUser.uid, 'cart', ticket.id);
        await deleteDoc(cartDocRef);

        setCartItems(prev => prev.filter(t => t.id !== ticket.id));
    } catch (error) {
        console.error('Error removing cart ticket: ', error);
    }
};


  if (!open) return null;

  return ReactDOM.createPortal(
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        right: 0,
        bottom: 0,
        width: '300px',
        backgroundColor: 'white',
        boxShadow: 3,
        zIndex: 1300,
        overflow: 'auto',
        padding: 2,
      }}
    >
      <IconButton
        onClick={onClose}
        sx={{ position: 'absolute', top: 10, right: 10 }}
      >
        <CloseIcon />
      </IconButton>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Cart
      </Typography>
      {loading ? <Loader /> : <Box>
        {cartItems.length > 0 ? (
          cartItems.map((ticket, index) => (
            <CartTicket
              key={ticket.id}
              ticket={ticket}
              onRemove={handleRemoveCartItem}
            />
          ))
        ) : <Typography>Your cart is empty.</Typography>}
      </Box>}
    </Box>,
    document.body
  );
};

export default CartPortal;
