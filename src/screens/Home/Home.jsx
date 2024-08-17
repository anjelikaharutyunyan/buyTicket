import { useState } from 'react';
import TicketCard from '../../components/TicketCard/TicketCard';
import { tickets } from './../../components/TicketCard/constants';
import Calendar from '../../components/Calendar/Calendar';
import useSoonestDates from '../../hooks/useSoonestDate';


const Home = () => {
  const [likedTickets, setLikedTickets] = useState({});
  const soonestTickets = useSoonestDates(tickets);

  const handleLikeTicket = (title) => {
    setLikedTickets(prev => ({
      ...prev,
      [title]: !prev[title]
    }));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', marginTop: '100px', justifyContent: 'center', paddingInline: '40px', gap: '30px' }}>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
        <Calendar />
        <div>
          <h1>Soon</h1>
          <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: '30px' }}>
            {soonestTickets.map((ticket, index) => (
              <TicketCard
                key={index}
                ticket={{ ...ticket, date: ticket.formattedDate }} 
                isLiked={!!likedTickets[ticket.title]}
                onLike={() => handleLikeTicket(ticket.title)}
              />
            ))}
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', backgroundColor: 'lightgray' }}>
        <h1 style={{paddingLeft: '55px'}}>EVENTS</h1>
        <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: '30px' }}>
          {tickets.map((ticket, index) => (
            <TicketCard
              key={index}
              ticket={ticket}
              isLiked={!!likedTickets[ticket.title]}
              onLike={() => handleLikeTicket(ticket.title)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
