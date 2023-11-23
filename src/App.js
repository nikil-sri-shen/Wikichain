import React from "react";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./components/Home.jsx";
import Publish from "./components/publishArticle/Publish.jsx";
import Search from "./components/searchArticle/Search.jsx";
import Registration from "./components/userRegistration/Registration.jsx";
import Error from "./components/Error.jsx";
import { BrowserRouter as Main, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="text-white">
      <Navbar></Navbar>
      <Main>
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route exact path="/publish" element={<Publish />}></Route>
          <Route exact path="/search" element={<Search />}></Route>
          <Route exact path="/registration" element={<Registration />}></Route>
          <Route path="/*" element={<Error />}></Route>
        </Routes>
      </Main>
      <Footer></Footer>
    </div>
  );
}

export default App;
