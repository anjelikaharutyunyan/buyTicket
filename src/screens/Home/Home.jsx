import { useState, useEffect, useRef } from 'react';
import TicketCard from '../../components/TicketCard/TicketCard';
import Calendar from '../../components/Calendar/Calendar';
import SearchAppBar from '../../components/Search/Search';
import BasicSelect from '../../components/Select/Select';
import { db } from '../../firebase/firebase';
import { collection, deleteDoc, doc, getDocs, orderBy, query, limit, setDoc } from 'firebase/firestore';
import BasicPagination from '../../components/Pagination/Pagination';
import { MAIN_COLOR, TICKETS_PER_PAGE } from '../../constants';
import Loader from '../../components/Loader/Loader';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import Modal from '../../components/Modal/Modal';
import Login from '../Login/Login';
import MyCarousel from '../../components/Carousel/Carousel';
import { Box } from '@mui/material';


const Home = () => {
  const { t } = useTranslation();
  const [likedTickets, setLikedTickets] = useState({});
  const [addedTickets, setAddedTickets] = useState({});
  const [filteredTickets, setFilteredTickets] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [soonestTickets, setSoonestTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const currentUser = useSelector((state) => state.auth.user);
  const [currentPage, setCurrentPage] = useState(1);
  const modalRef = useRef(null);


  useEffect(() => {
    const fetchTickets = async () => {
      setLoading(true);
      try {
        const ticketsCollection = collection(db, 'ticket');
        const ticketSnapshot = await getDocs(ticketsCollection);
        const today = new Date();
        const ticketList = [];

        for (const docSnap of ticketSnapshot.docs) {
          const ticketData = docSnap.data();
          if (ticketData && ticketData.date) {
            const ticketDate = new Date(ticketData.date);
            if (ticketDate < today) {
              await deleteDoc(doc(db, 'ticket', docSnap.id));
            } else {
              ticketList.push({ id: docSnap.id, ...ticketData });
            }
          } else {
            console.warn('Invalid ticket data:', ticketData);
          }
        }
        setTickets(ticketList);
        setFilteredTickets(ticketList);
      } catch (error) {
        console.error("Error fetching tickets:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  useEffect(() => {
    const fetchSoonest = async () => {
      setLoading(true);
      try {
        const ticketsCollection = collection(db, 'ticket');
        const soonestQuery = query(ticketsCollection, orderBy('date', 'asc'), limit(3));
        const soonestSnapshot = await getDocs(soonestQuery);
        const soonestList = soonestSnapshot.docs.map(docSnap => ({ id: docSnap.id, ...docSnap.data() }));
        setSoonestTickets(soonestList);
      } catch (error) {
        console.error("Error fetching soonest tickets:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSoonest();
  }, []);

  useEffect(() => {
    const fetchLikedTickets = async () => {
      if (!currentUser) return;

      const favoritesCollection = collection(db, 'users', currentUser.uid, 'favorites');
      const favoritesSnapshot = await getDocs(favoritesCollection);
      const likedItems = {};
      favoritesSnapshot.docs.forEach(docSnap => {
        likedItems[docSnap.id] = true;
      });
      setLikedTickets(likedItems);
    };

    fetchLikedTickets();
  }, [currentUser]);


  const handleLikeTicket = async (ticket) => {
    if (!currentUser) {
      handleOpenModal();
    }

    const isLiked = !!likedTickets[ticket.id];
    const updatedFavorites = { ...likedTickets, [ticket.id]: !isLiked };

    setLikedTickets(updatedFavorites);

    try {
      const favoriteDocRef = doc(db, 'users', currentUser.uid, 'favorites', ticket.id);
      if (isLiked) {
        await deleteDoc(favoriteDocRef);
      } else {
        await setDoc(favoriteDocRef, ticket);
      }
    } catch (error) {
      console.error("Error updating favorite ticket:", error);
    }
  };


  const handleAddToCart = async (ticket) => {
    if (!currentUser) {
      handleOpenModal();
    }

    const isAddedToCart = !!addedTickets[ticket.id];
    const updatedFavorites = { ...addedTickets, [ticket.id]: !isAddedToCart };

    setAddedTickets(updatedFavorites);

    if (!isAddedToCart) {
      const favoriteDocRef = doc(db, 'users', currentUser.uid, 'cart', ticket.id);
      await setDoc(favoriteDocRef, ticket);
    }
  };


  const handleOpenModal = () => {
    if (modalRef.current) {
      modalRef.current.openModal();
    } else {
      console.error('modalRef is undefined');
    }
  };


  useEffect(() => {
    if (currentUser && modalRef.current) {
      modalRef.current.closeModal();
    }
  }, [currentUser]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };


  const indexOfLastTicket = currentPage * TICKETS_PER_PAGE;
  const indexOfFirstTicket = indexOfLastTicket - TICKETS_PER_PAGE;
  const currentTickets = filteredTickets.slice(indexOfFirstTicket, indexOfLastTicket);

  return (
    <>
      <Box style={{ marginTop: '95px' }}>
        <MyCarousel />
      </Box>
      <div style={{ display: 'flex', flexDirection: 'column', marginTop: '20px', justifyContent: 'center', paddingInline: '40px', gap: '30px' }}>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap' }}>
          <div style={{ marginTop: '60px' }}>
            <Calendar />
          </div>
          <div>
            <h1>{t('soon')}</h1>
            {loading ? <Loader /> : <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: '30px' }}>
              {soonestTickets.map((ticket) => (
                <TicketCard
                  key={ticket.id}
                  ticket={ticket}
                  isLiked={!!likedTickets[ticket.id]}
                  onLike={() => handleLikeTicket(ticket)}
                  isAddedToCart={!!addedTickets[ticket.id]}
                  onCart={() => handleAddToCart(ticket)}
                  handleOpenModal={handleOpenModal}
                />
              ))}
            </div>}
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', gap: '60px' }}>
          <SearchAppBar style={{ backgroundColor: MAIN_COLOR }} onSearch={setFilteredTickets} />
          <BasicSelect filteredTickets={filteredTickets} setFilteredTickets={setFilteredTickets} />
        </div>
        <Modal ref={modalRef}>
          <Login />
        </Modal>

        <div style={{ display: 'flex', flexDirection: 'column', backgroundColor: '#f9be3257' }}>
          <h1 style={{ paddingLeft: '55px' }}>{t('events')}</h1>
          {loading ? <Loader /> :
            <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: '30px' }}>
              {currentTickets.length > 0 ? (
                currentTickets.map((ticket) => (
                  <TicketCard
                    key={ticket.id}
                    ticket={ticket}
                    isLiked={!!likedTickets[ticket.id]}
                    onLike={() => handleLikeTicket(ticket)}
                    isAddedToCart={!!addedTickets[ticket.id]}
                    onCart={() => handleAddToCart(ticket)}
                    handleOpenModal={handleOpenModal}
                  />
                ))
              ) : (
                <div style={{ height: '100px' }}>
                  <h4>{t('There are no results for your request')}</h4>
                </div>
              )}
            </div>}


          <BasicPagination
            totalItems={filteredTickets.length}
            itemsPerPage={TICKETS_PER_PAGE}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </>
  );
};

export default Home;