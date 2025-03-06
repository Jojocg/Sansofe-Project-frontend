import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div className="min-h-screen bg-base-100">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-base-200 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
            <div className="mb-10 lg:mb-0">
              <h1 className="text-4xl sm:text-5xl font-bold text-base-content mb-6">
                Descubre los <span className="text-primary">mercados locales</span> de Gran Canaria
              </h1>
              <p className="text-lg text-base-content/80 mb-8 max-w-xl">
                Encuentra productos frescos, apoya a los agricultores canarios y fomenta la economía local. Sansofé te conecta con los mercados más cercanos.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/markets" className="btn btn-primary">
                  Ver mercados
                </Link>
                <Link to="/local" className="btn btn-outline">
                  ¿Por qué consumir local?
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-w-5 aspect-h-4 rounded-lg overflow-hidden shadow-xl">
                <img
                  src="https://picsum.photos/id/292/800/600"
                  alt="Mercado local"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-base-content mb-4">¿Qué ofrece Sansofé?</h2>
            <p className="text-lg text-base-content/70 max-w-3xl mx-auto">
              Conectamos a los ciudadanos con los productores locales, fomentando un consumo sostenible y responsable.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="card bg-base-200 shadow-md">
              <div className="card-body">
                <div className="mb-4 text-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                    <polyline points="9 22 9 12 15 12 15 22"></polyline>
                  </svg>
                </div>
                <h3 className="card-title">Descubre mercados</h3>
                <p className="text-base-content/70">
                  Encuentra todos los mercados locales de la isla, sus horarios y servicios.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="card bg-base-200 shadow-md">
              <div className="card-body">
                <div className="mb-4 text-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                </div>
                <h3 className="card-title">Encuentra productores</h3>
                <p className="text-base-content/70">
                  Conoce a los agricultores y artesanos locales que ofrecen sus productos.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="card bg-base-200 shadow-md">
              <div className="card-body">
                <div className="mb-4 text-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                  </svg>
                </div>
                <h3 className="card-title">Consume responsable</h3>
                <p className="text-base-content/70">
                  Aprende sobre los beneficios del consumo local y sostenible para nuestra isla.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Markets */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-base-200">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-base-content mb-4">Mercados destacados</h2>
            <p className="text-lg text-base-content/70 max-w-3xl mx-auto">
              Algunos de los mercados más populares de Gran Canaria
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Market Card 1 */}
            <div className="card bg-base-100 shadow-lg">
              <figure className="px-4 pt-4">
                <img
                  src="https://picsum.photos/id/292/400/300"
                  alt="Mercado Agrícola de San Mateo"
                  className="rounded-lg h-48 w-full object-cover"
                />
              </figure>
              <div className="card-body">
                <h3 className="card-title">Mercado Agrícola de San Mateo</h3>
                <div className="badge badge-outline mb-2">Sábados y domingos</div>
                <p className="text-base-content/70 mb-4">
                  Uno de los mercados agrícolas más tradicionales y concurridos de la isla.
                </p>
                <div className="card-actions justify-end">
                  <Link to="/markets/san-mateo" className="btn btn-sm btn-primary">Ver detalles</Link>
                </div>
              </div>
            </div>

            {/* Market Card 2 */}
            <div className="card bg-base-100 shadow-lg">
              <figure className="px-4 pt-4">
                <img
                  src="https://picsum.photos/id/1080/400/300"
                  alt="Mercado del Puerto"
                  className="rounded-lg h-48 w-full object-cover"
                />
              </figure>
              <div className="card-body">
                <h3 className="card-title">Mercado del Puerto</h3>
                <div className="badge badge-outline mb-2">Todos los días</div>
                <p className="text-base-content/70 mb-4">
                  Ubicado en el Puerto de Las Palmas, ofrece productos frescos del mar y la tierra.
                </p>
                <div className="card-actions justify-end">
                  <Link to="/markets/puerto" className="btn btn-sm btn-primary">Ver detalles</Link>
                </div>
              </div>
            </div>

            {/* Market Card 3 */}
            <div className="card bg-base-100 shadow-lg">
              <figure className="px-4 pt-4">
                <img
                  src="https://picsum.photos/id/102/400/300"
                  alt="Mercado de Vegueta"
                  className="rounded-lg h-48 w-full object-cover"
                />
              </figure>
              <div className="card-body">
                <h3 className="card-title">Mercado de Vegueta</h3>
                <div className="badge badge-outline mb-2">Lunes a sábado</div>
                <p className="text-base-content/70 mb-4">
                  Mercado histórico en el corazón del casco antiguo de Las Palmas.
                </p>
                <div className="card-actions justify-end">
                  <Link to="/markets/vegueta" className="btn btn-sm btn-primary">Ver detalles</Link>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-10">
            <Link to="/markets" className="btn btn-outline">Ver todos los mercados</Link>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-primary text-primary-content">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">¿Por qué consumir local?</h2>
          <p className="text-lg mb-8 opacity-90">
            Al comprar productos locales reduces tu huella de carbono, apoyas la economía de la isla
            y consumes alimentos más frescos y de temporada.
          </p>
          <Link to="/local" className="btn btn-outline btn-lg text-primary-content border-primary-content hover:bg-primary-content hover:text-primary">
            Descubre más
          </Link>
        </div>
      </section>
    </div>
  );
}

export default HomePage;