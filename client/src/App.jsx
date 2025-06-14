import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import BottomNavigation from "./components/BottomNavigation";
import MatrixBackground from "./components/MatrixBackground";

// Pages
import Home from "./pages/Home";
import Announcements from "./pages/Announcements";
import Leaderboard from "./pages/Leaderboard";
import Challenges from "./pages/Challenges";
import Team from "./pages/Team";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Submit from "./pages/Submit";
import Writeups from "./pages/Writeup";
import Ticket from "./pages/TicketPage";
import TicketChat from "./pages/TicketChat";
import CreateTicket from "./pages/CreateTicket";

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-primary-bg">
        <h1 className="text-center terminal-text text-3xl mb-4">
          CTF PLATFORM
        </h1>
        <div className="terminal-text pulse">LOADING SYSTEM...</div>
      </div>
    );
  }

  return (
    <>
      <MatrixBackground />
      <Navbar />

      <div className="page-container with-navbar">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/announcements" element={<Announcements />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/challenges" element={<Challenges />} />
          <Route path="/team" element={<Team />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="writeups/submit" element={<Submit />} />
          <Route path="/writeups" element={<Writeups />} />
          <Route path="/Tickets" element={<Ticket />} />
          <Route path="/tickets/:ticketId" element={<TicketChat />} />
          <Route path="/Tickets/Createticket" element={<CreateTicket />} />
        </Routes>
      </div>

      <BottomNavigation />
    </>
  );
};

export default App;
