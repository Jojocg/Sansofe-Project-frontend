//Lucide Icons
import { Edit, Trash2 } from "lucide-react";

function MarketCard({ market, showTown = false, isAdmin, navigate, handleDelete }) {
    return (
        <div className="card bg-base-100 shadow-xl">
            <figure>
                <img src={market.image} alt={market.name} className="h-48 w-full object-cover" />
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
                            {scheduleItem.days.length > 2
                                ? `${scheduleItem.days[0]}-${scheduleItem.days[scheduleItem.days.length - 1]}`
                                : scheduleItem.days.join(', ')}
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