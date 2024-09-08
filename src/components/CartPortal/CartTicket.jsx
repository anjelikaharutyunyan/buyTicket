import { Card, CardMedia, Typography } from '@mui/material';
import { Timestamp } from 'firebase/firestore';
import CloseIcon from '@mui/icons-material/Close';

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

const CartTicket = ({ ticket, onRemove }) => {
    const formattedDate = formatTimestamp(ticket.date);
    return (
        <Card sx={{ width: '100%', mb: 2 }}>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <CardMedia
                        sx={{ width: '100px', height: '80px', display: 'flex', justifyContent: 'center' }}
                        component="img"
                        image={ticket.image}
                        alt={ticket.title}
                    />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>

                    <Typography sx={{ fontSize: '14px', fontWeight: '700' }}>
                        {ticket.title}
                    </Typography>
                    <Typography sx={{ fontSize: '11px', fontWeight: '700' }}>
                        {formattedDate}
                    </Typography>
                    <Typography sx={{ fontSize: '13px' }}>
                        ${ticket.price}
                    </Typography>
                </div>
                <div style={{ paddingBottom: '50px', paddingRight: '5px' }}>
                    <CloseIcon onClick={onRemove}/>
                </div>
            </div>
        </Card>
    );
};

export default CartTicket;
