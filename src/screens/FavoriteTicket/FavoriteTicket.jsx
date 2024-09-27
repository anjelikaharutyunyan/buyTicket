import { useState, useEffect } from 'react';
import TicketCard from '../../components/TicketCard/TicketCard';
import { db } from '../../firebase/firebase';
import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { useSelector } from 'react-redux';
import Loader from '../../components/Loader/Loader';

const FavoriteTicket = () => {
  const currentUser = useSelector((state) => state.auth.user);
  const [loading, setLoading] = useState(true);
  const [favoriteTickets, setFavoriteTickets] = useState([]);

  useEffect(() => {
    const fetchFavoriteTickets = async () => {
      setLoading(true);
      try {
        if (!currentUser) return;

        const favoritesCollection = collection(db, 'users', currentUser.uid, 'favorites');
        const favoritesSnapshot = await getDocs(favoritesCollection);
        const favoritesList = favoritesSnapshot.docs.map(docSnap => ({
          id: docSnap.id,
          ...docSnap.data()
        }));
        setFavoriteTickets(favoritesList);
      } catch (error) {
        console.error("Error fetching favorite tickets:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFavoriteTickets();
  }, [currentUser]);

  const handleRemoveFavorite = async (ticket) => {
    if (!currentUser) return;

    try {
      const favoriteDocRef = doc(db, 'users', currentUser.uid, 'favorites', ticket.id);
      await deleteDoc(favoriteDocRef);

      setFavoriteTickets(prev => prev.filter(t => t.id !== ticket.id));
    } catch (error) {
      console.error('Error removing favorite ticket: ', error);
    }
  };

  return (
    <div style={{ padding: "20px", position: "relative", top: "64px", minHeight: '100vh'}}>
      <h1 style={{ textAlign: "center" }}>Favorite Tickets</h1>
      <div>
        {loading ? <Loader /> : <div
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "30px",
          }}
        >
          {favoriteTickets.map((ticket, index) => (
            <TicketCard
              key={index}
              ticket={ticket}
              isLiked={true}
              onLike={() => handleRemoveFavorite(ticket)}
            />
          ))}
        </div>}
      </div>
    </div>
  );
};

export default FavoriteTicket;