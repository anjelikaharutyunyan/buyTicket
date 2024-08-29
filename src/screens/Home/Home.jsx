import { useState, useEffect } from 'react';
import TicketCard from '../../components/TicketCard/TicketCard';
import Calendar from '../../components/Calendar/Calendar';
import SearchAppBar from '../../components/Search/Search';
import BasicSelect from '../../components/Select/Select';
import { db } from '../../firebase/firebase';
import { collection, deleteDoc, doc, getDocs, orderBy, query, limit } from 'firebase/firestore';
import BasicPagination from '../../components/Pagination/Pagination';
import { TICKETS_PER_PAGE } from '../../constants';

const Home = () => {
  const [likedTickets, setLikedTickets] = useState(() => {
    const likedItems = localStorage.getItem("likedTickets");
    return likedItems ? JSON.parse(likedItems) : {};
  });

  const [filteredTickets, setFilteredTickets] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [soonestTickets, setSoonestTickets] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchTickets = async () => {
      const ticketsCollection = collection(db, 'ticket');
      const ticketSnapshot = await getDocs(ticketsCollection);
      const today = new Date();
      const ticketList = [];

      for (const docSnap of ticketSnapshot.docs) {
        const ticketData = docSnap.data();
        const ticketDate = new Date(ticketData.date);
        if (ticketDate < today) {
          await deleteDoc(doc(db, 'ticket', docSnap.id));
        } else {
          ticketList.push({ id: docSnap.id, ...ticketData });
        }
      }
      setTickets(ticketList);
      setFilteredTickets(ticketList);
    };

    fetchTickets();
  }, []);

  useEffect(() => {
    const fetchSoonest = async () => {
      const ticketsCollection = collection(db, 'ticket');
      const soonestQuery = query(ticketsCollection, orderBy('date', 'asc'), limit(3));
      const soonestSnapshot = await getDocs(soonestQuery);
      const soonestList = soonestSnapshot.docs.map(docSnap => ({ id: docSnap.id, ...docSnap.data() }));
      setSoonestTickets(soonestList);
    };

    fetchSoonest();
  }, []);

  const handleLikeTicket = (id) => {
    setLikedTickets(prev => {
      const updatedFavorites = {
        ...prev,
        [id]: !prev[id]
      };
      localStorage.setItem("likedTickets", JSON.stringify(updatedFavorites));
      return updatedFavorites;
    });
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const indexOfLastTicket = currentPage * TICKETS_PER_PAGE;
  const indexOfFirstTicket = indexOfLastTicket - TICKETS_PER_PAGE;
  const currentTickets = filteredTickets.slice(indexOfFirstTicket, indexOfLastTicket);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', marginTop: '100px', justifyContent: 'center', paddingInline: '40px', gap: '30px' }}>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap' }}>
        <Calendar />
        <div>
          <h1>Soon</h1>
          <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: '30px' }}>
            {soonestTickets.map((ticket) => (
              <TicketCard
                key={ticket.id}
                ticket={ticket}
                isLiked={!!likedTickets[ticket.id]}
                onLike={() => handleLikeTicket(ticket.id)}
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
          {currentTickets.length > 0 ? (
            currentTickets.map((ticket) => (
              <TicketCard
                key={ticket.id}
                ticket={ticket}
                isLiked={!!likedTickets[ticket.id]}
                onLike={() => handleLikeTicket(ticket.id)}
              />
            ))
          ) : (
            <div style={{ height: '100px' }}>
              <h4>{"There are no results for your request"}</h4>
            </div>
          )}
        </div>
        <BasicPagination
          totalItems={filteredTickets.length}
          itemsPerPage={TICKETS_PER_PAGE}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default Home;
