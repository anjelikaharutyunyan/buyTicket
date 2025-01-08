import * as React from 'react';
import ReactDOM from 'react-dom';
import { useSelector } from "react-redux"

import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebase';

import { Avatar, Box, Button, IconButton, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';


const Profile = ({ open, onClose }) => {
    const currentUser = useSelector((state) => state.auth.user)
    const [name, setName] = React.useState(currentUser.name)
    const [email, setEmail] = React.useState(currentUser.email)


    const handleSaveChanges = async () => {
        try {
            const userDocRef = doc(db, 'users', currentUser.uid);
            await updateDoc(userDocRef, { name, email })
        } catch {
            console.log('failed to update profile')
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
                sx={{
                    position: 'absolute',
                    top: 16,
                    right: 16,
                    bgcolor: 'rgba(0, 0, 0, 0.04)',
                    '&:hover': {
                        bgcolor: 'rgba(0, 0, 0, 0.1)',
                    },
                }}
            >
                <CloseIcon />
            </IconButton>
            <Box
                sx={{
                    pt: 10,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 2,
                }}
            >
                <Avatar
                    sx={{
                        bgcolor: 'primary.main',
                        width: 56,
                        height: 56,
                        fontSize: '1.5rem',
                    }}
                >
                    {currentUser.name.slice(0, 1)}
                </Avatar>
                <TextField
                    id="name-field"
                    label="Name"
                    variant="outlined"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    sx={{
                        width: '100%',
                        maxWidth: 300,
                    }}
                />
                <TextField
                    id="email-field"
                    label="Email"
                    variant="outlined"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    InputProps={{
                        readOnly: true,
                    }}
                    sx={{
                        width: '100%',
                        maxWidth: 300,
                    }}
                />
            </Box>
            <Button
                variant="contained"
                color="primary"
                onClick={handleSaveChanges}
                sx={{
                    mt: 2,
                    ml: 5,
                    width: 'fit-content',
                    px: 4,
                }}
            >
                Save Changes
            </Button>

        </Box>,
        document.body
    );
}

export default Profile