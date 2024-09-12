import React from 'react';
import Carousel from 'react-material-ui-carousel';
import { Paper } from '@mui/material';

const images = [
    "https://ticketon.am/sbadmin/storage/slider/15/29/29/06/1920_539_66c347de40499.jpg",
    "https://ticketon.am/sbadmin/storage/slider/13/23/17/15/1920_539_66cc60642e8f1.jpg",
    "https://ticketon.am/sbadmin/storage/slider/29/22/14/14/1920_539_6671310840618.jpg",
    "https://ticketon.am/sbadmin/storage/slider/29/22/14/14/1920_539_6671310840618.jpg",
    "https://ticketon.am/sbadmin/storage/slider/15/06/16/13/1920_539_66deeba957683.jpg",
    "https://ticketon.am/sbadmin/storage/slider/09/08/04/30/1920_539_66b46dbfced4d.jpg",
];

const MyCarousel = () => {
    return (
        <Carousel>
            {images.map((image, i) => (
                <Paper key={i}>
                    <img src={image} alt={`carousel-${i}`} style={{ width: '100%'}} />
                </Paper>
            ))}
        </Carousel>
    );
};

export default MyCarousel;
