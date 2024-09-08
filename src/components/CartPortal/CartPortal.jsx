import ReactDOM from 'react-dom';
import { Box, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const CartPortal = ({ open, onClose }) => {
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
      <Box>
        {/* Render cart items here */}
        <Typography>Your cart is empty.</Typography>
      </Box>
    </Box>,
    document.body
  );
};

export default CartPortal;
