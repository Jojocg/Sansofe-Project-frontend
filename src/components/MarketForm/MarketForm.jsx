import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
// Lucide Icons
import { Save, X, ImagePlus, AlertCircle, Calendar, Plus, Trash2 } from "lucide-react";

import marketsService from "../../services/markets.service";
import townsService from "../../services/towns.service";

function MarketForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditing = !!id;

    const DAYS_OF_WEEK = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];

    const [towns, setTowns] = useState([]);
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        location: "",
        schedule: [{ days: [], hours: "" }],
        town: ""
    });

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [imagePreview, setImagePreview] = useState("");

    useEffect(() => {
        // Cargar la lista de municipios
        const fetchTowns = async () => {
            try {
                const response = await townsService.getAll();
                setTowns(response.data);
            } catch (err) {
                /* console.error("Error fetching towns:", err); */
                setError("No se pudieron cargar los municipios.");
            }
        };

        fetchTowns();

        // Si estamos editando, cargar los datos del mercado
        if (isEditing) {
            const fetchMarket = async () => {
                try {
                    setIsLoading(true);
                    const response = await marketsService.getOne(id);
                    const market = response.data;

                    // Asegurarse de que schedule sea un array con al menos un elemento
                    const schedule = market.schedule && market.schedule.length > 0 
                        ? market.schedule 
                        : [{ days: [], hours: "" }];

                    setFormData({
                        name: market.name || "",
                        description: market.description || "",
                        location: market.location || "",
                        schedule: schedule,
                        image: market.image || "",
                        town: market.town?._id || market.town || ""
                    });

                    setImagePreview(market.image || "");
                    setIsLoading(false);
                } catch (err) {
                    /* console.error("Error fetching market:", err); */
                    setError("No se pudo cargar la información del mercado.");
                    setIsLoading(false);
                }
            };

            fetchMarket();
        }
    }, [id, isEditing]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleImageChange = (e) => {
        const value = e.target.value;
        setFormData({
            ...formData,
            image: value,
        });
        setImagePreview(value);
    };

    const handleScheduleChange = (index, field, value) => {
        const updatedSchedule = [...formData.schedule];
        updatedSchedule[index] = {
            ...updatedSchedule[index],
            [field]: value
        };
        
        setFormData({
            ...formData,
            schedule: updatedSchedule
        });
    };

    const handleDayToggle = (scheduleIndex, day) => {
        const updatedSchedule = [...formData.schedule];
        const currentDays = updatedSchedule[scheduleIndex].days;
        
        if (currentDays.includes(day)) {
            // Quitar el día si ya está seleccionado
            updatedSchedule[scheduleIndex].days = currentDays.filter(d => d !== day);
        } else {
            // Añadir el día si no está seleccionado
            updatedSchedule[scheduleIndex].days = [...currentDays, day];
        }
        
        setFormData({
            ...formData,
            schedule: updatedSchedule
        });
    };

    const addScheduleItem = () => {
        setFormData({
            ...formData,
            schedule: [...formData.schedule, { days: [], hours: "" }]
        });
    };

    const removeScheduleItem = (index) => {
        if (formData.schedule.length > 1) {
            const updatedSchedule = formData.schedule.filter((_, i) => i !== index);
            setFormData({
                ...formData,
                schedule: updatedSchedule
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.name || !formData.town) {
            setError("El nombre y el municipio son campos obligatorios.");
            return;
        }

        // Validar que cada horario tenga al menos un día seleccionado y horas
        const invalidSchedule = formData.schedule.some(s => s.days.length === 0 || !s.hours);
        if (invalidSchedule) {
            setError("Cada horario debe tener al menos un día seleccionado y un horario definido.");
            return;
        }

        // Filtrar horarios vacíos (sin días o sin horas)
        const cleanedFormData = {
            ...formData,
            schedule: formData.schedule.filter(s => s.days.length > 0 && s.hours)
        };

        try {
            setIsLoading(true);

            if (isEditing) {
                await marketsService.updateOne(id, cleanedFormData);
            } else {
                await marketsService.createOne(cleanedFormData);
            }

            navigate("/mercados");
        } catch (err) {
            /* console.error("Error saving market:", err); */
            setError(
                err.response?.data?.message ||
                "Hubo un error al guardar el mercado. Por favor, inténtalo de nuevo."
            );
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading && isEditing) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8 max-w-3xl">
            <h1 className="text-3xl font-bold text-center text-primary mb-8">
                {isEditing ? "Editar" : "Crear"} Mercado
            </h1>

            {error && (
                <div className="alert alert-error shadow-lg mb-6">
                    <div>
                        <AlertCircle className="w-6 h-6" />
                        <span>{error}</span>
                    </div>
                </div>
            )}

            <div className="card bg-base-100 shadow-xl">
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="form-control mb-4">
                            <label className="label">
                                <span className="label-text">Nombre del Mercado</span>
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Ej. Mercado de Las Palmas de G.C"
                                className="input input-bordered w-full"
                                required
                            />
                        </div>

                        <div className="form-control mb-4">
                            <label className="label">
                                <span className="label-text">Municipio</span>
                            </label>
                            <select
                                name="town"
                                value={formData.town}
                                onChange={handleChange}
                                className="select select-bordered w-full"
                                required
                            >
                                <option value="" disabled>Selecciona un municipio</option>
                                {towns.map((town) => (
                                    <option key={town._id} value={town._id}>
                                        {town.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="form-control mb-4">
                            <label className="label">
                                <span className="label-text">Ubicación/Dirección</span>
                            </label>
                            <input
                                type="text"
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                                placeholder="Ej. Calle Principal, 123"
                                className="input input-bordered w-full"
                            />
                        </div>

                        {/* Horarios */}
                        <div className="form-control mb-4">
                            <label className="label">
                                <span className="label-text font-medium">Horarios</span>
                                <Calendar className="w-5 h-5 text-base-content/70" />
                            </label>
                            
                            {formData.schedule.map((scheduleItem, index) => (
                                <div key={index} className="mb-4 p-4 border border-base-300 rounded-lg">
                                    <div className="flex justify-between items-center mb-2">
                                        <h3 className="font-medium">Horario #{index + 1}</h3>
                                        {formData.schedule.length > 1 && (
                                            <button 
                                                type="button" 
                                                onClick={() => removeScheduleItem(index)}
                                                className="btn btn-sm btn-error btn-outline"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        )}
                                    </div>
                                    
                                    <div className="mb-3">
                                        <label className="label">
                                            <span className="label-text">Días</span>
                                        </label>
                                        <div className="flex flex-wrap gap-2">
                                            {DAYS_OF_WEEK.map(day => (
                                                <div key={day} className="form-control">
                                                    <label className="label cursor-pointer gap-2">
                                                        <input
                                                            type="checkbox"
                                                            className="checkbox checkbox-secondary"
                                                            checked={scheduleItem.days.includes(day)}
                                                            onChange={() => handleDayToggle(index, day)}
                                                        />
                                                        <span className="label-text">{day}</span>
                                                    </label>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    
                                    <div>
                                        <label className="label">
                                            <span className="label-text">Horas</span>
                                        </label>
                                        <input
                                            type="text"
                                            value={scheduleItem.hours}
                                            onChange={(e) => handleScheduleChange(index, 'hours', e.target.value)}
                                            placeholder="Ej. 8:00 - 14:00"
                                            className="input input-bordered w-full"
                                        />
                                    </div>
                                </div>
                            ))}
                            
                            <button 
                                type="button" 
                                onClick={addScheduleItem}
                                className="btn btn-secondary btn-sm gap-2 mt-2"
                            >
                                <Plus className="w-4 h-4" />
                                Añadir otro horario
                            </button>
                        </div>

                        <div className="form-control mb-4">
                            <label className="label">
                                <span className="label-text">Descripción</span>
                            </label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="Breve descripción del mercado y sus productos"
                                className="textarea textarea-bordered w-full"
                                rows="4"
                            />
                        </div>

                        <div className="form-control mb-6">
                            <label className="label">
                                <span className="label-text">URL de la Imagen</span>
                            </label>
                            <div className="input-group">
                                <input
                                    type="url"
                                    name="image"
                                    value={formData.image}
                                    onChange={handleImageChange}
                                    placeholder="https://images.com/imagen"
                                    className="input input-bordered w-full"
                                />
                                <span className="btn btn-square btn-outline mt-2">
                                    <ImagePlus className="w-5 h-5" />
                                </span>
                            </div>
                            <label className="label">
                                <span className="label-text-alt">Introduce la URL de una imagen representativa del mercado</span>
                            </label>
                        </div>

                        {imagePreview && (
                            <div className="mb-6">
                                <p className="text-sm mb-2">Vista previa:</p>
                                <div className="w-full h-48 overflow-hidden rounded-lg">
                                    <img
                                        src={imagePreview}
                                        alt="Vista previa"
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            e.target.src = "https://via.placeholder.com/640x360?text=Imagen+no+disponible";
                                        }}
                                    />
                                </div>
                            </div>
                        )}

                        <div className="flex justify-between mt-6">
                            <button
                                type="button"
                                onClick={() => navigate("/mercados")}
                                className="btn btn-outline btn-neutral gap-2"
                            >
                                <X className="w-5 h-5" />
                                Cancelar
                            </button>

                            <button
                                type="submit"
                                className="btn btn-primary gap-2"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <span className="loading loading-spinner loading-sm"></span>
                                ) : (
                                    <Save className="w-5 h-5" />
                                )}
                                {isEditing ? "Actualizar" : "Crear"} Mercado
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default MarketForm;