import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
// Lucide Icons
import { 
  Store, 
  MapPin, 
  Clock, 
  Calendar, 
  ChevronLeft, 
  Edit, 
  Trash2, 
  AlertCircle, 
  MapIcon
} from "lucide-react";

import { AuthContext } from "../../context/auth.context";
import marketsService from "../../services/markets.service";

function MarketDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [market, setMarket] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const daysOfWeek = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];
  
  // Usar el contexto de autenticación para obtener el rol del usuario
  const { isLoggedIn, user } = useContext(AuthContext);
  const isAdmin = isLoggedIn && user?.role === 'admin';

  useEffect(() => {
    const fetchMarket = async () => {
      try {
        setIsLoading(true);
        const response = await marketsService.getOne(id);
        setMarket(response.data);
        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching market details:", err);
        setError("No se pudo cargar la información del mercado.");
        setIsLoading(false);
      }
    };

    fetchMarket();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm("¿Estás seguro de que quieres eliminar este mercado?")) {
      try {
        await marketsService.deleteOne(id);
        navigate("/mercados");
      } catch (err) {
        console.error("Error deleting market:", err);
        setError("No se pudo eliminar el mercado. Por favor, inténtalo de nuevo.");
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

  if (!market) {
    return (
      <div className="alert alert-warning shadow-lg max-w-3xl mx-auto mt-8">
        <div>
          <AlertCircle className="w-6 h-6" />
          <span>No se encontró el mercado solicitado.</span>
        </div>
      </div>
    );
  }

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
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      {/* Breadcrumb y botones de acción */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <div className="flex items-center mb-4 sm:mb-0">
          <Link to="/mercados" className="flex items-center text-primary hover:underline">
            <ChevronLeft className="w-5 h-5 mr-1" />
            Volver a Mercados
          </Link>
        </div>
        
        {isAdmin && (
          <div className="flex gap-2">
            <button 
              className="btn btn-outline btn-warning gap-2"
              onClick={() => navigate(`/mercados/editar/${id}`)}
            >
              <Edit className="w-5 h-5" />
              Editar
            </button>
            <button 
              className="btn btn-outline btn-error gap-2"
              onClick={handleDelete}
            >
              <Trash2 className="w-5 h-5" />
              Eliminar
            </button>
          </div>
        )}
      </div>

      {/* Imagen y datos principales */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-8">
        {/* Imagen */}
        <div className="lg:col-span-3 h-64 sm:h-80 md:h-96 overflow-hidden rounded-xl">
          <img 
            src={market.image || "https://via.placeholder.com/800x600?text=Imagen+no+disponible"} 
            alt={market.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = "https://via.placeholder.com/800x600?text=Imagen+no+disponible";
            }}
          />
        </div>
        
        {/* Datos principales */}
        <div className="lg:col-span-2">
          <div className="card bg-base-100 shadow-xl h-full">
            <div className="card-body">
              <h1 className="card-title text-3xl font-bold text-primary mb-4">{market.name}</h1>
              
              {market.town && (
                <div className="flex items-start gap-2 mb-3">
                  <MapIcon className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <p className="font-medium">Municipio</p>
                    <p>{market.town.name || "No disponible"}</p>
                  </div>
                </div>
              )}
              
              {market.location && (
                <div className="flex items-start gap-2 mb-3">
                  <MapPin className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <p className="font-medium">Ubicación</p>
                    <p>{market.location}</p>
                  </div>
                </div>
              )}
              
              {market.schedule && market.schedule.length > 0 && (
                <div className="flex items-start gap-2">
                  <Clock className="w-5 h-5 text-primary mt-1" />
                  <div>
                    <p className="font-medium">Horarios</p>
                    {market.schedule.map((item, index) => (
                      <div key={index} className="mb-2">
                        <p className="text-sm font-medium">{formatScheduleDays(item.days)}</p>
                        <p className="text-sm">{item.hours || "Horario no especificado"}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Sección de descripción */}
      {market.description && (
        <div className="card bg-base-100 shadow-xl mb-8">
          <div className="card-body">
            <h2 className="card-title text-xl font-bold mb-4">
              <Store className="w-5 h-5 text-primary mr-2" />
              Acerca de este mercado
            </h2>
            <p className="whitespace-pre-line">{market.description}</p>
          </div>
        </div>
      )}

      {/* Calendario semanal de horarios */}
      {market.schedule && market.schedule.length > 0 && (
        <div className="card bg-base-100 shadow-xl mb-8">
          <div className="card-body">
            <h2 className="card-title text-xl font-bold mb-4">
              <Calendar className="w-5 h-5 text-primary mr-2" />
              Calendario Semanal
            </h2>
            
            <div className="grid grid-cols-7 gap-2">
              {daysOfWeek.map((day) => {
                // Encontrar todos los horarios que incluyen este día
                const matchingSchedules = market.schedule.filter(item => 
                  item.days && item.days.includes(day)
                );
                
                // Determinar la clase CSS basada en si tiene horario o no
                const hasSchedule = matchingSchedules.length > 0;
                
                return (
                  <div 
                    key={day}
                    className={`p-3 rounded-lg ${hasSchedule ? 'bg-primary/10 border border-primary/20' : 'bg-base-200'}`}
                  >
                    <p className="font-medium text-center mb-2">{day}</p>
                    {hasSchedule ? (
                      <div>
                        {matchingSchedules.map((schedule, idx) => (
                          <p key={idx} className="text-sm text-center">{schedule.hours}</p>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-center text-base-content/50">Cerrado</p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MarketDetailsPage;