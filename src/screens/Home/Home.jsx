import { useState } from 'react';
import TicketCard from '../../components/TicketCard/TicketCard';
import { tickets } from './../../components/TicketCard/constants'

const Home = () => {
  const [likedTickets, setLikedTickets] = useState({});

  const handleLikeTicket = (title) => {
    setLikedTickets(prev => ({
      ...prev,
      [title]: !prev[title]
    }));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: '30px', marginTop: '100px' }}>
      {tickets.map((ticket, index) => (
        <TicketCard
          key={index}
          ticket={ticket}
          isLiked={!!likedTickets[ticket.title]}
          onLike={() => handleLikeTicket(ticket.title)}
        />
      ))}
    </div>
  );
};

export default Home;
