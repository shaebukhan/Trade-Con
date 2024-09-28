

import Home from "./pages/home/Home";
import { Route, Routes } from "react-router-dom";
import NotFound from "./pages/NotFound";
import Recruitment from "./pages/Recruitment";
import Job from "./pages/Job";
import Workers from "./pages/home/Workers";
import Details from "./pages/Details";



const App = () => {




  return (
    <>

      <Routes>
        {/* Public Routes */}


        <Route path="/" element={<Home />} />
        <Route path="/recruitment/:id" element={<Recruitment />} />
        <Route path="/job" element={<Job />} />
        <Route path="/workers/:id" element={<Workers />} />
        <Route path="/details" element={<Details />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

    </>
  );
};

export default App;