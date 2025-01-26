import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Search from "./pages/Search";
import About from "./pages/About";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="bg-black text-white min-h-screen relative font-roboto">
      <Navbar />
      <main className=" overflow-hidden">
        <Routes>
          {/* <Route path="/" element={<Home />} /> */}
          <Route path="/" element={<Search />} />
          <Route path="/search/:movieId" element={<About />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
