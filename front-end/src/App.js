import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Nav from "./Components/NavBar";
import Home from "./Pages/Home";
import FourOFour from "./Pages/FourOFour";
import Index from "./Pages/Index";
import Show from "./Pages/Show";
import New from "./Pages/New";
import Edit from "./Pages/Edit";

function App() {
  return (
    <div className="App">
      <Router>
        <Nav />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/snacks" element={<Index />} />
            <Route path="/snacks/:id" element={<Show />} />
            <Route path="/snacks/new" element={<New />} />
            <Route path="/snacks/:id/edit" element={<Edit />} />
            <Route path="*" element={<FourOFour />} />
          </Routes>
        </main>
      </Router>
    </div>
  );
}

export default App;
