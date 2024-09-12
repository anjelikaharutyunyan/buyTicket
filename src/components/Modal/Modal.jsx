import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
import { forwardRef, useImperativeHandle, useState } from 'react';
import PropTypes from 'prop-types';

const Transition = React.forwardRef((props, ref) => {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Modal = forwardRef(({ children }, ref) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useImperativeHandle(ref, () => ({
    openModal: handleOpen,
    closeModal: handleClose,
  }));

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      {children}
    </Dialog>
  );
});

Modal.propTypes = {
  children: PropTypes.node.isRequired,
};


export default Modal;
