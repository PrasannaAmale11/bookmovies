import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./showsummary.css";

function ShowSummary() {
  const { showId } = useParams();
  const [show, setShow] = useState(null);
  const [ticketFormVisible, setTicketFormVisible] = useState(false);
  const [showDiv, setShowDiv] = useState(true);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    phone: "",
    movieName: "",
  });
  const info = document.getElementById("info");
  const btn = document.getElementById("button");

  useEffect(() => {
    axios
      .get(`https://api.tvmaze.com/shows/${showId}`)
      .then((response) => setShow(response.data))
      .catch((error) => console.log(error));
  }, [showId]);

  const toggleTicketForm = () => {
    setTicketFormVisible(!ticketFormVisible);
    setShowDiv(false);
   
  };
  

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
      movieName: show?.name,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    localStorage.setItem("userDetails", JSON.stringify(userDetails));
    setUserDetails({
      name: "",
      email: "",
      phone: "",
      movieName: "",
    });
    toggleTicketForm();
    setBookingConfirmed(true);
  };

  if (!show) {
    return <div>Loading...</div>;
  }

  if (bookingConfirmed) {
    return (
      <div
        className="booking-confirmed"
        style={{ backgroundImage: `url(${show.image.original})`, height: "100vh" }}
      >
        <div className="booking-confirmation">
          <h2>Tickets booked successfully!</h2>
          <p>Name: {userDetails.name}</p>
          <p>Email: {userDetails.email}</p>
          <p>Phone: {userDetails.phone}</p>
          <p>Movie: {show.name}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="main" style={{ backgroundImage: `url(${show.image.original})`, height: "100vh",color:'white' }}>
      <div className="container">
       
      <h1 className="show-title">{show.name}</h1>
      {showDiv && (<div className="info" id="info">
      <img src={show.image.medium} alt={show.name} />
      <div dangerouslySetInnerHTML={{ __html: show.summary }} className="summary" />
      </div>)}
      
      <button onClick={toggleTicketForm} className="button" id="button">
        Book a ticket
      </button>
      {ticketFormVisible && (
        <div className="form">
          <div className="title">Book a Ticket for {show.name}</div>
          <div className="input-container">
          
          
            <input
              className="input"
              type="text"
              name="name"
              value={userDetails.name}
              onChange={handleInputChange}
              required
            />
              <div className="cut"></div> 
            <label htmlFor="name" className="placeholder">
              Name
            </label>
            
          </div>
          <div className="input-container">
         
             
            <input
              className="input"
              type="email"
              name="email"
              value={userDetails.email}
              onChange={handleInputChange}
              required
            />
             <div className="cut"></div>
             <label htmlFor="email" className="placeholder">
              Email
              </label>
           
        </div>
       
        <div className="input-container">
       
         
          <input
            className="input"
            type="tel"
            name="phone"
            value={userDetails.phone}
            onChange={handleInputChange}
            required
          />
           <div className="cut"></div>
           <label htmlFor="phone" className="placeholder">
            Phone
          </label>
         
        </div>
        <button type="submit" className="submit button" onClick={handleSubmit}>
          Submit
        </button>
      
    </div>
  )}

  {localStorage.getItem("bookedTickets") && (
    <div className="tickets-booked">
      Tickets Booked:
      {JSON.parse(localStorage.getItem("bookedTickets")).map((ticket, index) => (
        <div key={index}>
          Movie: {ticket.movieName}
          <br />
          Name: {ticket.name}
          <br />
          Email: {ticket.email}
          <br />
          Phone: {ticket.phone}
          <br />
        </div>
      ))}
    </div>
  )}
  </div>
</div>
);
}

export default ShowSummary;