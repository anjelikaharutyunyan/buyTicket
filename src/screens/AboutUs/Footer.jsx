import React from 'react';
import { Container, Typography, Box, Grid, Link } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Facebook, Instagram, Telegram } from '@mui/icons-material';


const FooterContainer = styled(Box)(({ theme }) => ({
    backgroundColor: '#f5f5f5',
    padding: theme.spacing(4),
    borderTop: `1px solid ${theme.palette.divider}`,
    marginTop: theme.spacing(10),
}));

const FooterLink = styled(Link)(({ theme }) => ({
    color: theme.palette.text.primary,
    textDecoration: 'none',
    '&:hover': {
        textDecoration: 'underline',
    },
}));

const SocialMediaIcons = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    gap: theme.spacing(2),
    marginTop: theme.spacing(2),
}));

const Footer = () => {
    return (
        <FooterContainer>
            <Container>
                <Grid container spacing={4}>
                    <Grid item xs={12} sm={4}>
                        <Typography variant="h6" gutterBottom>
                            About Us
                        </Typography>
                        <Typography variant="body2" paragraph>
                            We are dedicated to providing the best ticketing services. Our platform
                            ensures a seamless experience for finding and purchasing tickets to various
                            events. We are committed to quality and customer satisfaction.
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Typography variant="h6" gutterBottom>
                            Quick Links
                        </Typography>
                        <ul style={{ listStyle: 'none', padding: 0 }}>
                            <li>
                                <FooterLink href="/">Home</FooterLink>
                            </li>
                            <li>
                                <FooterLink href="/ticket">Ticket</FooterLink>
                            </li>
                            <li>
                                <FooterLink href="/favoriteTicket">Favorite Ticket</FooterLink>
                            </li>
                            <li>
                                <FooterLink href="#">Privacy Policy</FooterLink>
                            </li>
                        </ul>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Typography variant="h6" gutterBottom>
                            Contact Us
                        </Typography>
                        <Typography variant="body2" paragraph>
                            Email: <FooterLink href="mailto:info@Ticket.am">info@Ticket.am</FooterLink>
                        </Typography>
                        <Typography variant="body2" paragraph>
                            Phone: +374 10 000000
                        </Typography>
                        <Typography variant="body2" paragraph>
                            Address: 123 Ulneci Street, Yerevan, Armenia
                        </Typography>
                        <SocialMediaIcons>
                            <FooterLink href="https://www.facebook.com" target="_blank" aria-label="Facebook">
                                <Facebook />
                            </FooterLink>
                            <FooterLink href="https://www.instagram.com" target="_blank" aria-label="Instagram">
                                <Instagram />
                            </FooterLink>
                            <FooterLink href="https://telegram.org" target="_blank" aria-label="Telegram">
                                <Telegram />
                            </FooterLink>
                        </SocialMediaIcons>
                    </Grid>
                </Grid>
                <Box textAlign="center" mt={4}>
                    <Typography variant="body2" color="textSecondary">
                        © {new Date().getFullYear()} Ticket.am All rights reserved.
                    </Typography>
                </Box>
            </Container>
        </FooterContainer>
    );
};

export default Footer;