import { useState } from 'react';
import TicketCard from '../../components/TicketCard/TicketCard';
import { tickets } from './../../components/TicketCard/constants';
import Calendar from '../../components/Calendar/Calendar';
import useSoonestDates from '../../hooks/useSoonestDate';
import SearchAppBar from '../../components/Search/Search';
import BasicSelect from '../../components/Select/Select';

const Home = () => {
  const [likedTickets, setLikedTickets] = useState(() => {
    const likedItems = localStorage.getItem("likedTickets");
    return likedItems ? JSON.parse(likedItems) : {};
  });

  const [filteredTickets, setFilteredTickets] = useState(tickets);
  const soonestTickets = useSoonestDates(tickets);

  const handleLikeTicket = (title) => {
    setLikedTickets(prev => {
      const updatedFavorites = {
        ...prev,
        [title]: !prev[title]
      };
      localStorage.setItem("likedTickets", JSON.stringify(updatedFavorites));
      return updatedFavorites;
    });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', marginTop: '100px', justifyContent: 'center', paddingInline: '40px', gap: '30px' }}>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap', }}>
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
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', gap: '60px' }}>
        <SearchAppBar onSearch={setFilteredTickets} />
        <BasicSelect filteredTickets={filteredTickets} setFilteredTickets={setFilteredTickets} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', backgroundColor: '#f9be3257' }}>
        <h1 style={{ paddingLeft: '55px' }}>EVENTS</h1>
        <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: '30px' }}>
          {filteredTickets.length > 0 ? (
            filteredTickets.map((ticket, index) => (
              <TicketCard
                key={index}
                ticket={ticket}
                isLiked={!!likedTickets[ticket.title]}
                onLike={() => handleLikeTicket(ticket.title)}
              />
            ))
          ) : (
            <div style={{ height: '100px' }}>
              <h4>{"There are no results for your request"}</h4>
            </div>
          )}
        </div>
      </div>

    </div>
  );
};

export default Home;
