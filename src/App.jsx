import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useLocation } from "react-router-dom";

import HomePage from "./pages/HomePage/HomePage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import SignupPage from "./pages/SignupPage/SignupPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import TownsListPage from "./pages/TownsListPage/TownsListPage"
import MarketsListPage from "./pages/MarketsListPage/MarketsListPage";
import MarketDetailsPage from "./pages/MarketDetailsPage/MarketDetailsPage";
import BuyLocalPage from "./pages/BuyLocalPage/BuyLocalPage"
import FavoriteMarketsPage from "./pages/FavoriteMarketsPage/FavoriteMarketsPage";

import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import IsPrivate from "./components/IsPrivate/IsPrivate";
import IsAnon from "./components/IsAnon/IsAnon";
import TownForm from "./components/TownForm/TownForm";
import MarketForm from "./components/MarketForm/MarketForm";
import SansofeAssistant from "./components/Assistant/Assistant";

function App() {
  const location = useLocation();
  return (
    <div className="App">
      <Navbar />
      {/* Al Chat Assistant se le pasa la ubicación actual como prop*/}
      <SansofeAssistant location={location}/>

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
            <IsPrivate>
              <TownForm />
            </IsPrivate>
          }
        />
        <Route
          path="/municipios/editar/:id"
          element={
            <IsPrivate>
              <TownForm />
            </IsPrivate>
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
            <IsPrivate>
              <MarketForm />
            </IsPrivate>
          }
        />
        <Route
          path="/mercados/editar/:id"
          element={
            <IsPrivate>
              <MarketForm />
            </IsPrivate>
          }
        />

        <Route
          path="/favoritos"
          element={
            <IsPrivate>
              <FavoriteMarketsPage />
            </IsPrivate>
          }
        />

        <Route
          path="/local"
          element={<BuyLocalPage />}
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
