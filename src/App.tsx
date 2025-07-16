import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./ui/AppLayout";
import Chat from "./pages/Chat";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Chat />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
