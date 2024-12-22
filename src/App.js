import {
  BrowserRouter as Router,
  Routes,
  Route,
  createBrowserRouter,
} from "react-router-dom";
import CustomerRegistration from "./components/CustomerRegistrationForm";
import CustomersList from "./components/CustomersList";
import Home from "./Sidenav_pages/Home";
import Reports from "./Sidenav_pages/Reports";
import Settings from "./Sidenav_pages/Settings";
import { useState } from "react";
import Login from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/Layout";
import Sidenav from "./components/Sidenav";
import axios from "axios";

axios.defaults.withCredentials = true;

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<CustomerRegistration />} />

        <Route
          path="/login"
          element={<Login setIsLoggedIn={setIsLoggedIn} />}
        />

        <Route
          path="/sidenav"
          element={<Sidenav setIsLoggedIn={setIsLoggedIn} />}
        />

        <Route path="/customer-list" element={<CustomersList />} />

        <Route element={<ProtectedRoute isLoggedIn={isLoggedIn} />}>
          <Route element={<Layout />}>
            <Route path="/home" element={<Home />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
