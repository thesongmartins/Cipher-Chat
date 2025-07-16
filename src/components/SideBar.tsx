import { Link } from "react-router-dom";

const SideBar = () => {
  return (
    <aside className="bg-gray-800 w-40">
      <nav>
        <Link to="/">
          <img src="./public/icons/LogoIcon.svg" alt="Logo Button" />
        </Link>
        <Link to="/">
          <img src="./public/icons/Home.svg" alt="Home Button" />
        </Link>
        <Link to="/">
          <img src="./public/icons/Chat.svg" alt="Chat Button" />
        </Link>
        <Link to="/profile">
          <img src="./public/icons/Profile.svg" alt="Proffile Button" />
        </Link>
        <Link to="settings">
          <img src="./public/icons/Settings.svg" alt="" />
        </Link>
      </nav>
    </aside>
  );
};

export default SideBar;
