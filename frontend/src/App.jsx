import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Admin from "./pages/Admin";

function App() {
  return (
    <BrowserRouter>
      <nav style={{ padding: "10px", borderBottom: "1px solid gray" }}>
        <Link to="/">Customer Booking</Link> |{" "}
        <Link to="/admin">Admin Dashboard</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
