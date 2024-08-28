import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import TicketCard from '../../components/TicketCard/TicketCard';
import Calendar from '../../components/Calendar/Calendar';
import useSoonestDates from '../../hooks/useSoonestDate';
import SearchAppBar from '../../components/Search/Search';
import BasicSelect from '../../components/Select/Select';
import {db} from '../../firebase/firebase'


const Home = () => {
  const [likedTickets, setLikedTickets] = useState(() => {
    const likedItems = localStorage.getItem("likedTickets");
    return likedItems ? JSON.parse(likedItems) : {};
  });

  const [filteredTickets, setFilteredTickets] = useState([]);
  const [tickets, setTickets] = useState([]);
  const soonestTickets = useSoonestDates(tickets);

  useEffect(() => {
    const fetchTickets = async () => {
      const ticketsCollection = collection(db, 'ticket'); 
      const ticketSnapshot = await getDocs(ticketsCollection);
      const ticketList = ticketSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setTickets(ticketList);
      setFilteredTickets(ticketList);
    };

    fetchTickets();
  }, []);

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
