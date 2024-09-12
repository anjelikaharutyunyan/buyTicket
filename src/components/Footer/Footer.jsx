import React from 'react';
import { Container, Typography, Box, Grid, Link } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Facebook, Instagram, Telegram } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';


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
    const { t } = useTranslation();

    return (
        <FooterContainer>
            <Container>
                <Grid container spacing={4}>
                    <Grid item xs={12} sm={4}>
                        <Typography variant="h6" gutterBottom>
                            {t('aboutUs')}
                        </Typography>
                        <Typography variant="body2" paragraph>
                            {t('aboutText')}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Typography variant="h6" gutterBottom>
                            {t('quickLinks')}
                        </Typography>
                        <ul style={{ listStyle: 'none', padding: 0 }}>
                            <li>
                                <FooterLink href="/">{t('home')}</FooterLink>
                            </li>
                            <li>
                                <FooterLink href="/ticket">{t('ticket')}</FooterLink>
                            </li>
                            <li>
                                <FooterLink href="/favoriteTicket">{t('favoriteTicket')}</FooterLink>
                            </li>
                            <li>
                                <FooterLink href="#">{t('privacyPolicy')}</FooterLink>
                            </li>
                        </ul>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Typography variant="h6" gutterBottom>
                        {t('contactUs')}:
                        </Typography>
                        <Typography variant="body2" paragraph>
                        {t('email')}: <FooterLink href="mailto:info@Ticket.am">info@Ticket.am</FooterLink>
                        </Typography>
                        <Typography variant="body2" paragraph>
                        {t('phone')}: +374 10 000000
                        </Typography>
                        <Typography variant="body2" paragraph>
                        {t('address')}: 123 Ulneci Street, Yerevan, Armenia
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
                        © {new Date().getFullYear()} BuyTicket.am  {t('allRights')}
                    </Typography>
                </Box>
            </Container>
        </FooterContainer>
    );
};

export default Footer;