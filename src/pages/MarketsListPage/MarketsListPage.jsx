import { useState, useEffect, useContext, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
//Lucide Icons
import { Plus, AlertCircle, Store } from "lucide-react";

import { AuthContext } from "../../context/auth.context";
import marketsService from "../../services/markets.service";
import townsService from "../../services/towns.service";
import MarketCard from "../../components/MarketCard/MarketCard";

function MarketsListPage() {
  const { id: townId } = useParams();
  const isTownSpecific = !!townId;

  const [markets, setMarkets] = useState([]);
  const [town, setTown] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userFavorites, setUserFavorites] = useState([]); // Estado para almacenar los IDs de favoritos

  // Usar el contexto de autenticación para obtener el rol del usuario
  const { isLoggedIn, user } = useContext(AuthContext);
  const isAdmin = isLoggedIn && user?.role === 'admin';
  const navigate = useNavigate();

  // Memoizamos la función fetchMarkets
  const fetchMarkets = useCallback(async () => {
    try {
      setIsLoading(true);

      if (isTownSpecific) {
        // Si estamos en la ruta de un municipio específico
        const [marketsResponse, townResponse] = await Promise.all([
          marketsService.getByTown(townId),
          townsService.getOne(townId)
        ]);

        setMarkets(marketsResponse.data);
        setTown(townResponse.data);
      } else {
        // Si estamos en la ruta general de mercados
        const response = await marketsService.getAll();
        setMarkets(response.data);
      }

      setIsLoading(false);
    } catch (err) {
      /* console.error("Error fetching markets:", err); */
      setError("No se pudieron cargar los mercados. Por favor, inténtalo de nuevo más tarde.");
      setIsLoading(false);
    }
  }, [townId, isTownSpecific]);

  // Memoizamos la función fetchUserFavorites para evitar su recreación en cada renderizado
  const fetchUserFavorites = useCallback(async () => {
    if (!isLoggedIn || !user) return;

    try {
      // No necesitamos establecer isLoading para esta operación
      // ya que queremos que sea en segundo plano
      const response = await marketsService.getFavs(user._id);
      // Extraemos solo los IDs de los mercados favoritos
      const favIds = response.data.map(market => market._id);
      setUserFavorites(favIds);
    } catch (err) {
      /* console.error("Error al obtener favoritos:", err); */
    }
  }, [isLoggedIn, user]);

  // Efecto para cargar los mercados
  useEffect(() => {
    fetchMarkets();
  }, [fetchMarkets]);

  // Efecto separado para cargar los favoritos
  useEffect(() => {
    if (isLoggedIn && user) {
      fetchUserFavorites();
    } else {
      setUserFavorites([]);
    }
  }, [isLoggedIn, user, fetchUserFavorites]);

  // Función optimizada para actualizar favoritos - ahora solo actualiza el estado sin recargar todo
  const updateFavorite = useCallback((marketId, isFavorite) => {
    setUserFavorites(prevFavorites => {
      if (isFavorite) {
        // Si no está ya en favoritos, añadirlo
        if (!prevFavorites.includes(marketId)) {
          return [...prevFavorites, marketId];
        }
      } else {
        // Si está en favoritos, quitarlo
        return prevFavorites.filter(id => id !== marketId);
      }
      return prevFavorites;
    });
  }, []);

  // Función para eliminar un mercado
  const handleDelete = async (id) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar este mercado?")) {
      try {
        await marketsService.deleteOne(id);
        // Actualizar la lista de mercados
        setMarkets(prevMarkets => prevMarkets.filter((market) => market._id !== id));
      } catch (err) {
        /* console.error("Error deleting market:", err); */
        setError("No se pudo eliminar el mercado. Por favor, inténtalo de nuevo.");
      }
    }
  };

  if (isLoading && markets.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-error shadow-lg max-w-3xl mx-auto mt-8">
        <div>
          <AlertCircle className="w-6 h-6" />
          <span>{error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="text-center mb-12">
        <div className="flex justify-center mb-3">
          <Store className="w-8 h-8 text-primary" />
        </div>
        <h1 className="text-4xl font-bold text-primary mb-4">
          {isTownSpecific
            ? `Mercados en ${town?.name}`
            : "Mercados de Gran Canaria"
          }
        </h1>
        <p className="text-lg text-base-content/80 max-w-3xl mx-auto mb-6">
          Descubre los mercados agrícolas y municipales de la isla.
        </p>

        {isAdmin && (
          <div className="mt-6">
            <button
              className="btn btn-primary gap-2"
              onClick={() => navigate("/mercados/crear")}
            >
              <Plus className="w-5 h-5" />
              Crear Nuevo Mercado
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {markets.map((market) => (
          <MarketCard
            key={market._id}
            market={market}
            showTown={!isTownSpecific}
            isAdmin={isAdmin}
            navigate={navigate}
            handleDelete={handleDelete}
            refreshFavorites={() => updateFavorite(market._id, !userFavorites.includes(market._id))}
            userFavorites={userFavorites}
          />
        ))}
      </div>

      {markets.length === 0 && !isLoading && (
        <div className="text-center py-16">
          <p className="text-xl text-base-content/70">No hay mercados disponibles actualmente.</p>
          {isAdmin && (
            <button
              className="btn btn-primary mt-4 gap-2"
              onClick={() => navigate("/mercados/crear")}
            >
              <Plus className="w-5 h-5" />
              Agregar el primer mercado
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default MarketsListPage;