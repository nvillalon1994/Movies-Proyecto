import { BrowserRouter, Route, Routes } from "react-router-dom";
import Details from "./pages/Details";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Register from "./pages/Register";
import MoviesContext from "./context/MoviesContext";
import CreateMovie from "./pages/CreateMovie";
function App() {
  return (
    <MoviesContext>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/createMovies" element={<CreateMovie/>}/>
          <Route path="/details/:id" element={<Details/>}/>
          <Route path="*" element={<NotFound/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/Login" element={<Login/>}/>
        </Routes>
      </BrowserRouter>
    </MoviesContext>
  );
}

export default App;
