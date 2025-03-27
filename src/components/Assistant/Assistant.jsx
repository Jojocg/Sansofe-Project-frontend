import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { X, MessageSquare, Leaf, MessageCircleQuestion, MapPin, Clock, ShoppingBasket } from 'lucide-react';

const SansofeAssistant = ({ location }) => {
    const baseURL = process.env.REACT_APP_SERVER_URL;
    const [isOpen, setIsOpen] = useState(false);

    // Extraer IDs de la ruta actual (La expresión regular captura los IDs de las URLs dinámicas)
    const marketIdMatch = location.pathname.match(/\/mercados\/([^/]+)$/);
    const townIdMatch = location.pathname.match(/\/municipios\/([^/]+)\/mercados/);

    // La ID correspondiente de la URL se pasa en el payload de la solicitus POST al servidor
    const marketId = marketIdMatch ? marketIdMatch[1] : null;
    const townId = townIdMatch ? townIdMatch[1] : null;

    const [messages, setMessages] = useState([
        {
            type: 'assistant',
            text: '¡Hola! Soy tu asistente de mercados locales de Gran Canaria. Puedo ayudarte con información sobre horarios, ubicaciones, productos locales y características especiales de cada mercado. ¿En qué puedo ayudarte?'
        }
    ]);

    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const handleInputChange = (e) => {
        setInput(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        // Añadir mensaje del usuario
        const userMessage = { type: 'user', text: input };
        setMessages(prev => [...prev, userMessage]);

        setLoading(true);
        setInput('');

        try {
            const response = await axios.post(`${baseURL}/api/ai/assistant`, {
                query: input,
                marketId,
                townId
            });

            // Añadir respuesta del asistente
            setMessages(prev => [...prev, {
                type: 'assistant',
                text: response.data.response
            }]);
        } catch (error) {
            /* console.error('Error al obtener respuesta:', error); */
            setMessages(prev => [...prev, {
                type: 'assistant',
                text: 'Lo siento, ha ocurrido un error al procesar tu consulta. Por favor, inténtalo de nuevo.'
            }]);
        } finally {
            setLoading(false);
        }
    };

    // Sugerencias rápidas
    const quickSuggestions = [
        { text: "¿Qué mercados tienen actividades para niños?", icon: <MessageCircleQuestion /> },
        { text: "Mercados con oferta gastronómica", icon: <ShoppingBasket /> },
        { text: "Horarios de los mercados en fin de semana", icon: <Clock /> },
        { text: "Mercados cerca de Las Palmas", icon: <MapPin /> }
    ];

    const handleSuggestionClick = (suggestion) => {
        setInput(suggestion.text);
        setTimeout(() => {
            handleSubmit({ preventDefault: () => { } });
        }, 100);
    };

    return (
        <div className="fixed bottom-8 left-8 z-10">
            {!isOpen ? (
                <button
                    onClick={() => setIsOpen(true)}
                    className="btn btn-primary btn-circle shadow-lg w-16 h-16 flex items-center justify-center"
                >
                    <MessageSquare size={24} />
                </button>
            ) : (
                <div className="flex flex-col bg-white rounded-lg shadow-xl w-full max-w-xs md:max-w-lg h-auto">
                    <div className="bg-green-600 text-white p-4 flex justify-between items-center">
                        <h2 className="text-xl font-semibold flex items-center">
                            <Leaf className="mr-2" /> Asistente de Sansofé
                        </h2>
                        <button onClick={() => setIsOpen(false)} className="text-white hover:text-green-200">
                            <X size={20} />
                        </button>
                    </div>

                    <div className="flex-grow overflow-y-auto p-4 bg-gray-50" style={{ height: "calc(100vh - 350px)", minHeight: "300px", maxHeight: "500px" }}>
                        {messages.map((message, index) => (
                            <div
                                key={index}
                                className={`mb-4 ${message.type === 'user'
                                    ? 'ml-auto bg-green-100 text-green-800'
                                    : 'bg-white border border-gray-200 text-gray-800'
                                    } p-3 rounded-lg max-w-3/4`}
                            >
                                {message.text}
                            </div>
                        ))}
                        {loading && (
                            <div className="flex items-center space-x-2 text-gray-500">
                                <div className="animate-bounce">●</div>
                                <div className="animate-bounce delay-100">●</div>
                                <div className="animate-bounce delay-200">●</div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    <div className="p-2 bg-gray-100 border-t border-gray-200 overflow-x-auto overflow-y-visible whitespace-nowrap">
                        <div className="flex space-x-2">
                            {quickSuggestions.map((suggestion, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleSuggestionClick(suggestion)}
                                    className="flex items-center bg-white border border-gray-300 rounded-full px-3 py-1 hover:bg-green-50 text-xs md:text-sm"
                                >
                                    <span className="mr-1">{suggestion.icon}</span>
                                    <span className="truncate max-w-32 md:max-w-full">{suggestion.text}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="p-4 bg-white border-t border-gray-200">
                        <div className="flex">
                            <input
                                type="text"
                                value={input}
                                onChange={handleInputChange}
                                placeholder="Escribe tu pregunta aquí..."
                                className="flex-grow border rounded-l-lg p-2 bg-base-200 focus:outline-none focus:ring-2 focus:ring-green-200"
                                disabled={loading}
                            />
                            <button
                                type="submit"
                                className="bg-green-600 text-white px-4 py-2 rounded-r-lg hover:bg-green-700 disabled:bg-green-800 disabled:opacity-25 disabled:cursor-not-allowed"
                                disabled={loading}
                            >
                                Enviar
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default SansofeAssistant;