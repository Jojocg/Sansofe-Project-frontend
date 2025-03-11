//Lucide Icons
import { Edit, Trash2, Heart } from "lucide-react";
import { useState, useEffect, useContext } from "react";

import { AuthContext } from "../../context/auth.context";
import marketsService from "../../services/markets.service";

function MarketCard({
    market,
    showTown = false,
    isAdmin,
    navigate,
    handleDelete,
    refreshFavorites,
    userFavorites = [] // Array con IDs de mercados favoritos 
}) {
    const { isLoggedIn, user } = useContext(AuthContext);

    // Determinamos si este mercado está en favoritos usando el array recibido
    const [isFavorite, setIsFavorite] = useState(userFavorites.includes(market._id));

    // Actualizamos el estado cuando cambian los favoritos del usuario
    useEffect(() => {
        setIsFavorite(userFavorites.includes(market._id));
    }, [userFavorites, market._id]);

    // Función para cambiar el estado de favorito
    const handleToggleFavorite = async (e) => {
        e.stopPropagation(); // Prevenir el evento de clic en la tarjeta
        if (!isLoggedIn) return; // No hacer nada si el usuario no está logueado

        try {
            const response = await marketsService.toggleFav({
                marketId: market._id,
                userId: user._id
            });

            // Actualizamos el estado local
            setIsFavorite(response.data.isFavorite);

            // Llamamos a la función de actualización para refrescar la lista de favoritos en el padre
            if (refreshFavorites) {
                refreshFavorites();
            }
        } catch (error) {
            console.error("Error al cambiar estado de favorito:", error);
        }
    };

    const daysOfWeek = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];

    // Función para formatear los días del horario
    const formatScheduleDays = (days) => {
        if (!days || days.length === 0) return "No disponible";

        // Si son todos los días de la semana
        if (days.length === 7) return "Todos los días";

        // Si son días consecutivos
        /* const daysOfWeek = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"]; */
        const sortedDays = [...days].sort((a, b) => daysOfWeek.indexOf(a) - daysOfWeek.indexOf(b));

        // Comprobar si son días consecutivos
        let isConsecutive = true;
        for (let i = 0; i < sortedDays.length - 1; i++) {
            const currentIndex = daysOfWeek.indexOf(sortedDays[i]);
            const nextIndex = daysOfWeek.indexOf(sortedDays[i + 1]);
            if (nextIndex - currentIndex !== 1) {
                isConsecutive = false;
                break;
            }
        }

        if (isConsecutive && sortedDays.length > 2) {
            return `${sortedDays[0]} a ${sortedDays[sortedDays.length - 1]}`;
        }

        // Si no son consecutivos, listarlos separados por comas
        return sortedDays.join(", ");
    };
    return (
        <div className="card bg-base-100 shadow-xl">
            <figure className="relative">
                <img src={market.image} alt={market.name} className="h-48 w-full object-cover" />
                {/* Botón de Favorito - solo mostrar para usuarios logueados */}
                {isLoggedIn && (
                    <button
                        onClick={handleToggleFavorite}
                        className="absolute top-2 left-2 p-2 rounded-full bg-base-100 bg-opacity-70 hover:bg-opacity-100 transition-all"
                        aria-label={isFavorite ? "Eliminar de favoritos" : "Añadir a favoritos"}
                    >
                        <Heart
                            className={`h-6 w-6 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-500'}`}
                        />
                    </button>
                )}
            </figure>
            <div className="card-body">
                <h2 className="card-title">{market.name}</h2>

                {showTown && market.town && (
                    <p className="text-sm text-gray-600">
                        <span className="font-medium">Municipio:</span> {market.town.name}
                    </p>
                )}

                <div className="flex flex-wrap gap-1 my-2">
                    {/* Badges para los días */}
                    {market.schedule?.map((scheduleItem, index) => (
                        <div key={index} className="badge badge-outline">
                            <p className="text-sm font-medium">{formatScheduleDays(scheduleItem.days)}</p>
                        </div>
                    ))}
                </div>

                <div className="card-actions justify-end">
                    <a href={`/mercados/${market._id}`} className="btn btn-primary btn-sm">
                        Ver detalles
                    </a>
                </div>

                {isAdmin && (
                    <div className="flex justify-between mt-4 pt-2 border-t border-base-300">
                        <button
                            className="btn btn-outline btn-info btn-sm gap-1"
                            onClick={() => navigate(`/mercados/editar/${market._id}`)}
                        >
                            <Edit className="w-4 h-4" />
                            Editar
                        </button>
                        <button
                            className="btn btn-outline btn-error btn-sm gap-1"
                            onClick={() => handleDelete(market._id)}
                        >
                            <Trash2 className="w-4 h-4" />
                            Eliminar
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default MarketCard;