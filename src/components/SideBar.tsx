import { Link } from "react-router-dom";
import { Chat_Side_Bar } from "./containers/chat-side-bar";

const SideBar = () => {
  return (
    <aside className="flex items-start justify-start size- ">
      <nav className="py-6 h-screen flex flex-col items-center justify-between w-[128px] [&_div]:flex [&_div]:items-center [&_div]:justify-center [&_div]:flex-col  ">
        <div className="gap-12">
          <Link to="/">
            <img src="Icons/LogoIcon.svg" alt="Logo Button" />
          </Link>
          <div className="gap-8">
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
          </div>
        </div>
        <img
          src="images/sideguy.png"
          alt="Side Guy"
          className="w-12 h-12 rounded-full"
        />
      </nav>
      <Chat_Side_Bar />
    </aside>
  );
};

export default SideBar;
