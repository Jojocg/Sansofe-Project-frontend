import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function MarketsPage() {
  const [markets, setMarkets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMunicipality, setSelectedMunicipality] = useState("");

  // Mock data - replace with actual API call
  /* useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setMarkets([
        {
          id: 1,
          name: "Mercado Agrícola de San Mateo",
          municipality: "San Mateo",
          image: "https://picsum.photos/id/292/400/300",
          schedule: "Sábados y domingos de 8:00 a 14:00",
          description: "Uno de los mercados agrícolas más tradicionales y concurridos de la isla."
        },
        {
          id: 2,
          name: "Mercado del Puerto",
          municipality: "Las Palmas de Gran Canaria",
          image: "https://picsum.photos/id/1080/400/300",
          schedule: "Lunes a sábado de 8:00 a 14:00",
          description: "Ubicado en el Puerto de Las Palmas, ofrece productos frescos del mar y la tierra."
        },
        {
          id: 3,
          name: "Mercado de Vegueta",
          municipality: "Las Palmas de Gran Canaria",
          image: "https://picsum.photos/id/102/400/300",
          schedule: "Lunes a sábado de 8:00 a 14:00",
          description: "Mercado histórico en el corazón del casco antiguo de Las Palmas."
        },
        {
          id: 4,
          name: "Mercado Municipal de Santa Brígida",
          municipality: "Santa Brígida",
          image: "https://picsum.photos/id/1084/400/300",
          schedule: "Sábados de 8:00 a 14:00",
          description: "Pequeño mercado con productos locales de la zona centro de la isla."
        },
        {
          id: 5,
          name: "Mercado Agrícola de Teror",
          municipality: "Teror",
          image: "https://picsum.photos/id/197/400/300",
          schedule: "Domingos de 8:00 a 14:00",
          description: "Junto a la Basílica de Teror, ofrece productos tradicionales canarios."
        },
        {
          id: 6,
          name: "Mercado Municipal de Telde",
          municipality: "Telde",
          image: "https://picsum.photos/id/431/400/300",
          schedule: "Lunes a sábado de 8:00 a 14:00",
          description: "El mercado más importante de la zona este de Gran Canaria."
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []); */

  // Get unique municipalities for filter
  const municipalities = [...new Set(markets.map(market => market.municipality))].sort();

  // Filter markets based on search and municipality
  const filteredMarkets = markets.filter(market => {
    const matchesSearch = market.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          market.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesMunicipality = selectedMunicipality === "" || market.municipality === selectedMunicipality;
    return matchesSearch && matchesMunicipality;
  });

  return (
    <div className="min-h-screen bg-base-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-base-content mb-4">Mercados de Gran Canaria</h1>
          <p className="text-lg text-base-content/70 max-w-3xl mx-auto">
            Descubre todos los mercados agrícolas y municipales de la isla
          </p>
        </div>

        {/* Filters */}
        <div className="bg-base-200 p-6 rounded-lg shadow-md mb-10">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="label">
                <span className="label-text">Buscar por nombre o descripción</span>
              </label>
              <input
                type="text"
                placeholder="Ej: San Mateo, productos locales..."
                className="input input-bordered w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div>
              <label className="label">
                <span className="label-text">Filtrar por municipio</span>
              </label>
              <select
                className="select select-bordered w-full"
                value={selectedMunicipality}
                onChange={(e) => setSelectedMunicipality(e.target.value)}
              >
                <option value="">Todos los municipios</option>
                {municipalities.map((municipality) => (
                  <option key={municipality} value={municipality}>
                    {municipality}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Market Cards */}
        {loading ? (
          <div className="flex justify-center py-20">
            <span className="loading loading-spinner loading-lg text-primary"></span>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMarkets.length > 0 ? (
              filteredMarkets.map((market) => (
                <div key={market.id} className="card bg-base-100 shadow-lg border border-base-200">
                  <figure className="px-4 pt-4">
                    <img
                      src={market.image}
                      alt={market.name}
                      className="rounded-lg h-48 w-full object-cover"
                    />
                  </figure>
                  <div className="card-body">
                    <h3 className="card-title">{market.name}</h3>
                    <div className="badge badge-outline mb-2">{market.municipality}</div>
                    <p className="text-sm text-base-content/70 mb-1">{market.schedule}</p>
                    <p className="text-base-content/80 mb-4">
                      {market.description}
                    </p>
                    <div className="card-actions justify-end">
                      <Link 
                        to={`/markets/${market.id}`} 
                        className="btn btn-sm btn-primary"
                      >
                        Ver detalles
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-10">
                <div className="text-4xl mb-4">🔍</div>
                <h3 className="text-xl font-medium mb-2">No se encontraron resultados</h3>
                <p className="text-base-content/70">
                  Intenta con otro término de búsqueda o cambia los filtros
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default MarketsPage;