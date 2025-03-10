import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
// Lucide Icons
import { Save, X, ImagePlus, AlertCircle } from "lucide-react";

import townsService from "../../services/towns.service";

function TownForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditing = !!id;

    const [formData, setFormData] = useState({
        name: "",
    });

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [imagePreview, setImagePreview] = useState("");

    useEffect(() => {
        // Si estamos editando, cargar los datos del municipio
        if (isEditing) {
            const fetchTown = async () => {
                try {
                    setIsLoading(true);
                    const response = await townsService.getOne(id);
                    const town = response.data;

                    setFormData({
                        name: town.name || "",
                        image: town.image || "",
                    });

                    setImagePreview(town.image || "");
                    setIsLoading(false);
                } catch (err) {
                    /* console.error("Error fetching town:", err); */
                    setError("No se pudo cargar la información del municipio.");
                    setIsLoading(false);
                }
            };

            fetchTown();
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

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.name) {
            setError("El nombre es un campo obligatorio.");
            return;
        }

        try {
            setIsLoading(true);

            if (isEditing) {
                await townsService.updateOne(id, formData);
            } else {
                await townsService.createOne(formData);
            }

            navigate("/municipios");
        } catch (err) {
            console.error("Error saving town:", err);
            setError(
                err.response?.data?.message ||
                "Hubo un error al guardar el municipio. Por favor, inténtalo de nuevo."
            );
        } finally {
            setIsLoading(false)
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
                {isEditing ? "Editar" : "Crear"} Municipio
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
                                <span className="label-text">Nombre del Municipio</span>
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Ej. Las Palmas de Gran Canaria"
                                className="input input-bordered w-full"
                                required
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
                                <span className="label-text-alt">Introduce la URL de una imagen representativa del municipio</span>
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
                                onClick={() => navigate("/municipios")}
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
                                {isEditing ? "Actualizar" : "Crear"} Municipio
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default TownForm;