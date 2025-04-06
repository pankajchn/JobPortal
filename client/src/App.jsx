import { Outlet } from "react-router";
import Navbar from "./components/Navbar";
import Signup from "./components/Signup";
import "./App.css"

const App = () => {
  return (
    <>
      <Navbar />
      <Outlet/>
    </>
  );
};
export default App;
