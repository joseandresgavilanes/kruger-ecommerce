import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MainRouter } from "./router/MainRouter";
import { setCurrentUser } from "./store/user/userSlice";
import CustomerNavBar from "./ui/CustomerNavBar/CustomerNavBar";
import Footer from "./ui/Footer/Footer";
import "./App.css";
import KommunicateChat from "./ChatBot/chat";
import AdminNavBar from "./ui/AdminNavBar/AdminNavBar";
import TopBtn from "./components/TopBtn/TopBtn";
import Presentation from "./components/Presentation/Presentation";

function App() {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.users);

  useEffect(() => {
    const currentU = localStorage.getItem("currentUser");
    if (currentU) {
      const jsonUser = JSON.parse(currentU);
      dispatch(setCurrentUser(jsonUser));
    }
  }, []);

  const [presentation, setPresentation] = useState(true);
  setTimeout(() => {
    setPresentation(false);
  }, 15000);

  return (
    <>
      {presentation ? (
        <Presentation />
      ) : (
        <div className="main">
          {currentUser === null || currentUser.role === "CUSTOMER" ? (
            <CustomerNavBar />
          ) : (
            <AdminNavBar />
          )}
          <MainRouter />
          <KommunicateChat />
          <TopBtn />
          <Footer />
        </div>
      )}
    </>
  );
}

export default App;
