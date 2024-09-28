import ReactDOM from 'react-dom';
import { Box, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { collection, deleteDoc, doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase/firebase';
import Loader from '../Loader/Loader';
import CartTicket from './CartTicket';
import { removeFromCart, setCartCount } from '../../Store/cartSlice';

const CartPortal = ({ open, onClose }) => {
  const currentUser = useSelector((state) => state.auth.user);
  const [loading, setLoading] = useState(true);
  const [cartItems, setCartItems] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!currentUser) return;
    const cartCollection = collection(db, 'users', currentUser.uid, 'cart');
    const unsubscribe = onSnapshot(cartCollection, (cartSnapshot) => {
      const cartList = cartSnapshot.docs.map(docSnap => ({
        id: docSnap.id,
        ...docSnap.data()
      }));
      setCartItems(cartList);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching cart tickets:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [currentUser]);

  useEffect(() => {
    dispatch(setCartCount(cartItems.length));
  }, [cartItems, dispatch]);
  const handleRemoveCartItem = async (ticket) => {
    if (!currentUser) return;
    try {
      const cartDocRef = doc(db, 'users', currentUser.uid, 'cart', ticket.id);
      await deleteDoc(cartDocRef);
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
      {loading ? <Loader /> : (
        <Box>
          {cartItems.length > 0 ? (
            cartItems.map((ticket) => (
              <CartTicket
                key={ticket.id}
                ticket={ticket}
                onRemove={handleRemoveCartItem}
              />
            ))
          ) : <Typography>Your cart is empty.</Typography>}
        </Box>
      )}
    </Box>,
    document.body
  );
};

export default CartPortal;
