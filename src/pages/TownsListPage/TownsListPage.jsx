import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
//Lucide Icons
import { Plus, Edit, Trash2, AlertCircle, MapPin, Store } from "lucide-react";

import { AuthContext } from "../../context/auth.context";
import townsService from "../../services/towns.service";

function TownsListPage() {
  const [towns, setTowns] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Usar el contexto de autenticación para obtener el rol del usuario
  const { isLoggedIn, user } = useContext(AuthContext);
  const isAdmin = isLoggedIn && user?.role === 'admin';
  const navigate = useNavigate();

  useEffect(() => {
    // Obtener la lista de municipios desde el backend
    const fetchTowns = async () => {
      try {
        setIsLoading(true);
        const response = await townsService.getAll();
        setTowns(response.data);
        setIsLoading(false);
      } catch (err) {
        /* console.error("Error fetching towns:", err); */
        setError("No se pudieron cargar los municipios. Por favor, inténtalo de nuevo más tarde.");
        setIsLoading(false);
      }
    };

    fetchTowns();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar este municipio?")) {
      try {
        await townsService.deleteOne(id);
        // Actualizar la lista de municipios
        setTowns(towns.filter((town) => town._id !== id));
      } catch (err) {
        /* console.error("Error deleting town:", err); */
        setError("No se pudo eliminar el municipio. Por favor, inténtalo de nuevo.");
      }
    }
  };

  if (isLoading) {
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
          <MapPin className="w-8 h-8 text-primary" />
        </div>
        <h1 className="text-4xl font-bold text-primary mb-4">Municipios de la isla</h1>
        <p className="text-lg text-base-content/80 max-w-3xl mx-auto mb-6">
          Explora los diferentes municipios de la isla y descubre los mercados locales que cada uno ofrece.
          Haz clic en un municipio para ver sus mercados tradicionales y apoya la economía local.
        </p>
        
        {isAdmin && (
          <div className="mt-6">
            <button 
              className="btn btn-primary gap-2"
              onClick={() => navigate("/municipios/crear")}
            >
              <Plus className="w-5 h-5" />
              Crear Nuevo Municipio
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {towns.map((town) => (
          <div key={town._id} className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300">
            <figure className="h-48 overflow-hidden">
              <img
                src={town.image}
                alt={`Imagen de ${town.name}`}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </figure>
            
            <div className="card-body p-4">
              <h2 className="card-title justify-center text-xl font-semibold">{town.name}</h2>
              
              <div className="mt-4 flex justify-center">
                <Link 
                  to={`/municipios/${town._id}/mercados`} 
                  className="btn btn-outline btn-primary btn-sm gap-2"
                >
                  <Store className="w-4 h-4" />
                  Ver Mercados
                </Link>
              </div>
              
              {isAdmin && (
                <div className="flex justify-between mt-4 pt-2 border-t border-base-300">
                  <button
                    className="btn btn-outline btn-warning btn-sm gap-1"
                    onClick={() => navigate(`/municipios/editar/${town._id}`)}
                  >
                    <Edit className="w-4 h-4" />
                    Editar
                  </button>
                  <button
                    className="btn btn-outline btn-error btn-sm gap-1"
                    onClick={() => handleDelete(town._id)}
                  >
                    <Trash2 className="w-4 h-4" />
                    Eliminar
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      
      {towns.length === 0 && !isLoading && (
        <div className="text-center py-16">
          <p className="text-xl text-base-content/70">No hay municipios disponibles actualmente.</p>
          {isAdmin && (
            <button 
              className="btn btn-primary mt-4 gap-2"
              onClick={() => navigate("/municipios/crear")}
            >
              <Plus className="w-5 h-5" />
              Agregar el primer municipio
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default TownsListPage;