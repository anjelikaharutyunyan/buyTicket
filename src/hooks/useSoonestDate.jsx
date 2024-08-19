import { useState, useEffect } from 'react';

function useSoonestDates(tickets) {
  const [soonestTickets, setSoonestTickets] = useState([]);

  useEffect(() => {
    if (tickets.length === 0) {
      setSoonestTickets([]);
      return;
    }

    // Convert em arel ticket-i amsativy Date object-i, ajman kargov dasavorel, het format arel string-i
    const sortedTickets = tickets
      .map(ticket => ({
        ...ticket,
        date: new Date(ticket.date.split('.').reverse().join('-')) // Convert em anum YYYY-MM-DD format-i
      }))
      .sort((a, b) => a.date - b.date)
      .slice(0, 3) 
      .map(ticket => ({
        ...ticket,
        formattedDate: ticket.date.toLocaleDateString() 
      }));

    setSoonestTickets(sortedTickets);
  }, [tickets]);

  return soonestTickets;
}

export default useSoonestDates;
