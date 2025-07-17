import { Link } from "react-router-dom";

const SideBar = () => {
  return (
    <aside className="bg-gray-800 w-40">
      <nav>
        <Link to="/">
          <img src="Icons/LogoIcon.svg" alt="Logo Button" />
        </Link>
        <Link to="/">
          <img src="/Icons/Home.svg" alt="Home Button" />
        </Link>
        <Link to="/">
          <img src="Icons/Chat.svg" alt="Chat Button" />
        </Link>
        <Link to="/profile">
          <img src="Icons/Profile.svg" alt="Profile Button" />
        </Link>
        <Link to="settings">
          <img src="Icons/Settings.svg" alt="Settings Button" />
        </Link>
      </nav>
    </aside>
  );
};

export default SideBar;
