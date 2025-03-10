import "./App.css";
import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage/HomePage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import SignupPage from "./pages/SignupPage/SignupPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import TownsListPage from "./pages/TownsListPage/TownsListPage"
import MarketsListPage from "./pages/MarketsPage/MarketsListPage";
import MarketDetailsPage from "./pages/MarketDetailsPage/MarketDetailsPage";

import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import IsPrivate from "./components/IsPrivate/IsPrivate";
import IsAnon from "./components/IsAnon/IsAnon";
import TownForm from "./components/TownForm/TownForm";
import MarketForm from "./components/MarketForm/MarketForm";

function App() {
  return (
    <div className="App">
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route
          path="/perfil"
          element={
            <IsPrivate>
              <ProfilePage />
            </IsPrivate>
          }
        />

        <Route
          path="/municipios"
          element={
            <TownsListPage />
          }
        />
        <Route
          path="/municipios/crear"
          element={
            <TownForm />
          }
        />
        <Route
          path="/municipios/editar/:id"
          element={
            <TownForm />
          }
        />

        <Route
          path="/mercados"
          element={
            <MarketsListPage />
          }
        />
        <Route 
          path="/municipios/:id/mercados" 
          element={<MarketsListPage />} 
        />
        <Route 
          path="mercados/:id" 
          element={<MarketDetailsPage />} 
        />
        <Route
          path="/mercados/crear"
          element={
            <MarketForm />
          }
        />
        <Route
          path="/mercados/editar/:id"
          element={
            <MarketForm />
          }
        />
        
        <Route
          path="/registro"
          element={
            <IsAnon>
              <SignupPage />
            </IsAnon>
          }
        />
        <Route
          path="/acceso"
          element={
            <IsAnon>
              <LoginPage />
            </IsAnon>
          }
        />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
