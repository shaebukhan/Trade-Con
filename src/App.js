

import Home from "./pages/home/Home";
import { Route, Routes } from "react-router-dom";
import NotFound from "./pages/NotFound";
import Recruitment from "./pages/Recruitment";
import Job from "./pages/Job";
import Workers from "./pages/home/Workers";
import Details from "./pages/Details";
import { PrivateRoute, PublicRoute } from "./routes/AuthRoute";
import Login from "./pages/admin/Login";
import Admin from "./pages/admin/Admin";
import SubTrades from "./pages/admin/SubTrades";
import Listings from "./pages/admin/Listings";

const App = () => {




  return (
    <>

      <Routes>
        {/* Public Routes */}


        <Route path="/" element={<Home />} />
        <Route path="/recruitment/:id" element={<Recruitment />} />
        <Route path="/job" element={<Job />} />
        <Route path="/workers/:id" element={<Workers />} />
        <Route path="/details/:id" element={<Details />} />
        <Route path="*" element={<NotFound />} />
        {/* public route  */}
        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />

        {/* private route  */}
        <Route path="/dashboard" element={<PrivateRoute><Admin /></PrivateRoute>} />
        <Route path="/dashboard/trade/:id" element={<PrivateRoute><SubTrades /></PrivateRoute>} />
        <Route path="/dashboard/listings" element={<PrivateRoute><Listings /></PrivateRoute>} />


      </Routes>

    </>
  );
};

export default App;