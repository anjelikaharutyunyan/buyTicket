import React from 'react';
import { Container, Typography, Box, Grid, Link } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Facebook, Instagram, Telegram } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { FACEBOOK_COLOR, FOOTER_BACKGROUND_COLOR, INSTAGRAM_COLOR, MAIN_COLOR, TELEGRAM_COLOR, TEXT_COLOR } from '../../constants';

const FooterContainer = styled(Box)(({ theme }) => ({
    backgroundColor: FOOTER_BACKGROUND_COLOR,
    padding: theme.spacing(4),
    borderTop: `1px solid ${theme.palette.divider}`,
    marginTop: theme.spacing(10),
}));
const FooterLink = styled(Link)(({ theme }) => ({
    color: MAIN_COLOR,
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

const SocialMediaIcon = styled('div')(({ color }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
    borderRadius: '50%',
    backgroundColor: color,
    transition: 'transform 0.3s ease',
    '&:hover': {
        transform: 'scale(1.2)',
    },
    '& svg': {
        fontSize: 30,
        color: '#fff',
    },
}));

const Footer = () => {
    const { t } = useTranslation();

    return (
        <FooterContainer>
            <Container>
                <Grid container spacing={4}>
                    <Grid item xs={12} sm={4}>
                        <Typography variant="h6" gutterBottom sx={{ color: TEXT_COLOR }}>
                            {t('aboutUs')}
                        </Typography>
                        <Typography variant="body2" paragraph sx={{ color: TEXT_COLOR }}>
                            {t('welcomeText')}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Typography variant="h6" gutterBottom sx={{ color: TEXT_COLOR }}>
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
                        <Typography variant="h6" gutterBottom sx={{ color: TEXT_COLOR }}>
                            {t('contactUs')}
                        </Typography>
                        <Typography variant="body2" paragraph sx={{ color: TEXT_COLOR }}>
                            {t('email')}: <FooterLink href="mailto:info@Ticket.am">info@Ticket.am</FooterLink>
                        </Typography>
                        <Typography variant="body2" paragraph sx={{ color: TEXT_COLOR }}>
                            {t('phone')}: +374 10 000000
                        </Typography>
                        <Typography variant="body2" paragraph sx={{ color: TEXT_COLOR }}>
                            {t('address')}: 123 Ulneci Street, Yerevan, Armenia
                        </Typography>
                        <SocialMediaIcons>
                            <FooterLink href="https://www.facebook.com" target="_blank" aria-label="Facebook">
                                <SocialMediaIcon color={FACEBOOK_COLOR}>
                                    <Facebook />
                                </SocialMediaIcon>
                            </FooterLink>
                            <FooterLink href="https://www.instagram.com" target="_blank" aria-label="Instagram">
                                <SocialMediaIcon color={INSTAGRAM_COLOR}>
                                    <Instagram />
                                </SocialMediaIcon>
                            </FooterLink>
                            <FooterLink href="https://telegram.org" target="_blank" aria-label="Telegram">
                                <SocialMediaIcon color={TELEGRAM_COLOR}>
                                    <Telegram />
                                </SocialMediaIcon>
                            </FooterLink>
                        </SocialMediaIcons>
                    </Grid>
                </Grid>
                <Box textAlign="center" mt={4}>
                    <Typography variant="body2" sx={{ color: TEXT_COLOR }}>
                        © {new Date().getFullYear()} BuyTicket.am. {t('allRights')}
                    </Typography>
                </Box>
            </Container>
        </FooterContainer>
    );
};

export default Footer;
