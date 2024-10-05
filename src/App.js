import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import AddUser from './components/AddUser';
import History from './components/History';
import WebSocketComponent from './components/WebSocketComponent';
import ParkingStatus from './components/ParkingStatus';  // Add ParkingStatus component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add_user" element={<AddUser />} />
        <Route path="/history/:rfid" element={<History />} />
        <Route path="/websocket" element={<WebSocketComponent />} />
        <Route path="/parking_status" element={<ParkingStatus />} />  {/* Add ParkingStatus route */}
      </Routes>
    </Router>
  );
}

export default App;
