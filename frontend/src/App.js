import { Routes, Route } from "react-router-dom";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Home from "./pages/home/Home";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/login" element={<Login />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
}

export default App;
