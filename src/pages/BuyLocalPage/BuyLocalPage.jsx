import { Link } from "react-router-dom";

function LocalPage() {
  return (
    <div className="min-h-screen bg-base-100">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-secondary text-secondary-content">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-6">¿Por qué consumir local?</h1>
          <p className="text-xl max-w-3xl mx-auto opacity-90">
            Al comprar productos de Gran Canaria, estás apoyando la economía local, 
            reduciendo tu impacto ambiental y disfrutando de alimentos más frescos y saludables.
          </p>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-base-content mb-4">Beneficios del consumo local</h2>
            <p className="text-lg text-base-content/70 max-w-3xl mx-auto">
              Consumir productos locales tiene múltiples ventajas para ti, tu comunidad y el planeta
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h3 className="text-2xl font-bold text-secondary mb-4">Para el medio ambiente</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>
                    <strong className="font-medium">Menor huella de carbono:</strong> Los productos locales recorren distancias más cortas, reduciendo las emisiones de CO2 asociadas al transporte.
                  </span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>
                    <strong className="font-medium">Menos embalaje:</strong> Los productos de mercados locales suelen utilizar menos envases y plásticos que los de grandes superficies.
                  </span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>
                    <strong className="font-medium">Preservación de variedades locales:</strong> Apoyar a agricultores locales ayuda a mantener la biodiversidad de cultivos canarios.
                  </span>
                </li>
              </ul>
            </div>
            <div>
              <img 
                src="https://picsum.photos/id/329/600/400" 
                alt="Agricultura sostenible" 
                className="rounded-lg shadow-xl w-full h-auto"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div className="order-2 md:order-1">
              <img 
                src="https://picsum.photos/id/1080/600/400" 
                alt="Productos locales" 
                className="rounded-lg shadow-xl w-full h-auto"
              />
            </div>
            <div className="order-1 md:order-2">
              <h3 className="text-2xl font-bold text-secondary mb-4">Para tu salud</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>
                    <strong className="font-medium">Mayor frescura:</strong> Los productos locales se recolectan cuando están maduros y llegan rápidamente a tu mesa.
                  </span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>
                    <strong className="font-medium">Más valor nutricional:</strong> Las frutas y verduras frescas mantienen mejor sus vitaminas y nutrientes.
                  </span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>
                    <strong className="font-medium">Productos de temporada:</strong> Consumir alimentos de temporada es más saludable y respetuoso con los ciclos naturales.
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold text-secondary mb-4">Para la economía local</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>
                    <strong className="font-medium">Apoyo directo:</strong> El dinero va directamente a los productores locales, sin intermediarios.
                  </span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>
                    <strong className="font-medium">Creación de empleo:</strong> Fortalecer el sector primario local genera puestos de trabajo en la isla.
                  </span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>
                    <strong className="font-medium">Desarrollo rural:</strong> Mantiene vivos los pueblos y las tradiciones agrícolas de Gran Canaria.
                  </span>
                </li>
              </ul>
            </div>
            <div>
              <img 
                src="https://picsum.photos/id/678/600/400" 
                alt="Economía local" 
                className="rounded-lg shadow-xl w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-base-200">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-base-content mb-4">Lo que opinan nuestros usuarios</h2>
            <p className="text-lg text-base-content/70 max-w-3xl mx-auto">
              Personas que ya han descubierto el valor de consumir productos locales
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="card bg-base-100 shadow-lg">
              <div className="card-body">
                <div className="flex items-center mb-4">
                  <div className="avatar mr-3">
                    <div className="w-12 rounded-full">
                      <img src="https://picsum.photos/id/64/100/100" alt="Perfil" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold">María Rodríguez</h3>
                    <p className="text-sm text-base-content/70">Las Palmas</p>
                  </div>
                </div>
                <p className="text-base-content/80 italic">
                  "Desde que compro en el mercado de Vegueta, no solo como mejor sino que he conocido a gente maravillosa. Los productos tienen otro sabor y me encanta charlar con los agricultores."
                </p>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="card bg-base-100 shadow-lg">
              <div className="card-body">
                <div className="flex items-center mb-4">
                  <div className="avatar mr-3">
                    <div className="w-12 rounded-full">
                      <img src="https://picsum.photos/id/91/100/100" alt="Perfil" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold">Antonio Pérez</h3>
                    <p className="text-sm text-base-content/70">Teror</p>
                  </div>
                </div>
                <p className="text-base-content/80 italic">
                  "Como restaurador, valoro enormemente la calidad de los productos locales. Mis clientes notan la diferencia cuando uso ingredientes de la isla, frescos y de temporada."
                </p>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="card bg-base-100 shadow-lg">
              <div className="card-body">
                <div className="flex items-center mb-4">
                  <div className="avatar mr-3">
                    <div className="w-12 rounded-full">
                      <img src="https://picsum.photos/id/26/100/100" alt="Perfil" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold">Laura Sánchez</h3>
                    <p className="text-sm text-base-content/70">San Mateo</p>
                  </div>
                </div>
                <p className="text-base-content/80 italic">
                  "Comprar local no solo es bueno para mi familia sino para toda la comunidad. Me encanta saber que estoy contribuyendo a mantener vivas nuestras tradiciones agrícolas."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-base-content mb-6">Descubre los mercados de Gran Canaria</h2>
          <p className="text-lg mb-8 text-base-content/80">
            Comienza a disfrutar de todos los beneficios del consumo local visitando los mercados de la isla.
          </p>
          <Link to="/mercados" className="btn btn-primary btn-lg">
            Ver mercados
          </Link>
        </div>
      </section>
    </div>
  );
}

export default LocalPage;