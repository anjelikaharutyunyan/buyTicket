import { useState, useEffect } from "react";
import TicketCard from "../../components/TicketCard/TicketCard";
import { tickets } from "../../components/TicketCard/constants";

const FavoriteTicket = () => {
  const [likedTickets, setLikedTickets] = useState([]);

  // local storage-ic vercnum em favoritnery
  useEffect(() => {
    const savedLikes = localStorage.getItem("likedTickets");
    if (savedLikes) {
      setLikedTickets(JSON.parse(savedLikes));
    }
  }, []);

  // filtrum em TicketCard/constant -i meji ticketneric vercnum favorite aracnery vor heto nerqevum nkarem ekranin
  const favoriteTickets = Object.keys(likedTickets)
  .map(title => tickets.find(ticket => ticket.title === title))
  
// favorite-ic hanelu jamanak local storage-ic u favorite bajnic jnjel
  const handleRemoveLike = (ticket) => {
    setLikedTickets((prev) => {
      const updatedFavorites = { ...prev };
      delete updatedFavorites[ticket.title];
      localStorage.setItem("likedTickets", JSON.stringify(updatedFavorites));
      return updatedFavorites;
    });
  };

  return (
    <div style={{ padding: "20px", position: "relative", top: "32px" }}>
      <h1 style={{ textAlign: "center" }}>Favorite Tickets</h1>
      <div>
        <div
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
              ticket={ ticket }
              isLiked={true}
              onLike={() => handleRemoveLike(ticket)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FavoriteTicket;
