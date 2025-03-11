import { useState, useEffect, useContext, useCallback } from "react";
import { useNavigate } from "react-router-dom";
//Lucide Icons
import { Heart, AlertCircle, Store } from "lucide-react";

import { AuthContext } from "../../context/auth.context";
import marketsService from "../../services/markets.service";
import MarketCard from "../../components/MarketCard/MarketCard";

function FavoriteMarketsPage() {
  const [favoriteMarkets, setFavoriteMarkets] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userFavorites, setUserFavorites] = useState([]); // Estado para almacenar los IDs de favoritos

  // Usar el contexto de autenticación
  const { isLoggedIn, user } = useContext(AuthContext);
  const navigate = useNavigate();

  // Función para obtener los mercados favoritos del usuario
  const fetchFavoriteMarkets = useCallback(async () => {
    if (!isLoggedIn || !user) return;

    try {
      setIsLoading(true);
      const response = await marketsService.getFavs(user._id);
      setFavoriteMarkets(response.data);
      
      // Extraemos solo los IDs de los mercados favoritos para pasárselos a MarketCard
      const favIds = response.data.map(market => market._id);
      setUserFavorites(favIds);
      
      setIsLoading(false);
    } catch (error) {
      /* console.error("Error al obtener favoritos:", error); */
      setError("No se pudieron cargar tus mercados favoritos. Por favor, inténtalo de nuevo más tarde.");
      setIsLoading(false);
    }
  }, [isLoggedIn, user]);

  useEffect(() => {
    // Solo obtenemos los favoritos si el usuario está logueado
    if (isLoggedIn && user) {
      fetchFavoriteMarkets();
    }
  }, [isLoggedIn, user, fetchFavoriteMarkets]);

  // Función para actualizar los datos tras añadir/quitar un favorito
  const refreshData = () => {
    if (isLoggedIn && user) {
      fetchFavoriteMarkets();
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="loading loading-spinner loading-lg text-primary"></div>
        <p className="mt-4 text-lg">Cargando tus mercados favoritos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="flex justify-center mb-4">
          <AlertCircle className="w-12 h-12 text-error" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Ocurrió un error</h2>
        <p className="text-lg">{error}</p>
        <button 
          className="btn btn-primary mt-6" 
          onClick={fetchFavoriteMarkets}
        >
          Intentar de nuevo
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="text-center mb-12">
        <div className="flex justify-center mb-3">
          <Heart className="w-8 h-8 text-primary" />
        </div>
        <h1 className="text-4xl font-bold text-primary mb-4">
          Mis Mercados Favoritos
        </h1>
        <p className="text-lg text-base-content/80 max-w-3xl mx-auto mb-6">
          Estos son los mercados que has añadido a tus favoritos.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {favoriteMarkets.map((market) => (
          <MarketCard
            key={market._id}
            market={market}
            showTown={true}
            isAdmin={false}
            navigate={navigate}
            refreshFavorites={refreshData}
            userFavorites={userFavorites}
          />
        ))}
      </div>

      {favoriteMarkets.length === 0 && !isLoading && (
        <div className="text-center py-16">
          <div className="flex justify-center mb-6">
            <Heart className="w-12 h-12 text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold mb-4">No tienes mercados favoritos</h2>
          <p className="text-xl text-base-content/70 mb-6">
            Explora los mercados disponibles y marca como favoritos aquellos que te interesen.
          </p>
          <button
            className="btn btn-primary gap-2"
            onClick={() => navigate("/mercados")}
          >
            <Store className="w-5 h-5" />
            Ver todos los mercados
          </button>
        </div>
      )}
    </div>
  );
}

export default FavoriteMarketsPage;