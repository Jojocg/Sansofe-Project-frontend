import { MapPin, Home, Leaf } from "lucide-react";
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
                Encuentra productos frescos, guarda tus mercados favoritos y recibe actualizaciones. Regístrate para personalizar tu experiencia y apoyar a los agricultores canarios.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/mercados" className="btn btn-primary">
                  Ver mercados
                </Link>
                <Link to="/registro" className="btn btn-outline">
                  Regístrate
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
            <div className="card bg-base-200 shadow-md">
              <div className="card-body">
                <div className="mb-4 text-secondary">
                  <Home className="h-10 w-10" />
                </div>
                <h3 className="card-title">Descubre mercados</h3>
                <p className="text-base-content/70">
                  Encuentra todos los mercados locales de la isla, sus horarios y servicios.
                </p>
              </div>
            </div>

            <div className="card bg-base-200 shadow-md">
              <div className="card-body">
                <div className="mb-4 text-secondary">
                  <MapPin className="h-10 w-10" />
                </div>
                <h3 className="card-title">Filtra por municipio</h3>
                <p className="text-base-content/70">
                  Usa el filtro de municipios para encontrar rápidamente los mercados más cercanos a tu ubicación.
                </p>
              </div>
            </div>

            <div className="card bg-base-200 shadow-md">
              <div className="card-body">
                <div className="mb-4 text-secondary">
                  <Leaf className="h-10 w-10" />
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

      {/* Seasonal Products */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-base-200">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-base-content mb-4">Productos de temporada</h2>
            <p className="text-lg text-base-content/70 max-w-3xl mx-auto">
              Descubre qué alimentos frescos puedes encontrar este mes en los mercados locales
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Seasonal Product 1 */}
            <div className="card bg-base-100 shadow-lg">
              <figure className="px-4 pt-4">
                <img
                  src="https://picsum.photos/id/1080/400/300"
                  alt="Fresas frescas"
                  className="rounded-lg h-48 w-full object-cover"
                />
              </figure>
              <div className="card-body">
                <h3 className="card-title">Fresas</h3>
                <div className="badge badge-outline mb-2">Marzo - Junio</div>
                <p className="text-base-content/70 mb-4">
                  Las fresas de Gran Canaria son conocidas por su dulzura y aroma. Perfectas para postres o consumir frescas.
                </p>
                <div className="card-actions justify-end">
                  <Link to="/mercados" className="btn btn-sm btn-primary">Dónde encontrarlas</Link>
                </div>
              </div>
            </div>

            {/* Seasonal Product 2 */}
            <div className="card bg-base-100 shadow-lg">
              <figure className="px-4 pt-4">
                <img
                  src="https://picsum.photos/id/292/400/300"
                  alt="Espinacas frescas"
                  className="rounded-lg h-48 w-full object-cover"
                />
              </figure>
              <div className="card-body">
                <h3 className="card-title">Espinacas</h3>
                <div className="badge badge-outline mb-2">Octubre - Abril</div>
                <p className="text-base-content/70 mb-4">
                  Ricas en hierro y vitaminas. Las espinacas locales tienen un sabor más intenso y hojas más gruesas.
                </p>
                <div className="card-actions justify-end">
                  <Link to="/mercados" className="btn btn-sm btn-primary">Dónde encontrarlas</Link>
                </div>
              </div>
            </div>

            {/* Seasonal Product 3 */}
            <div className="card bg-base-100 shadow-lg">
              <figure className="px-4 pt-4">
                <img
                  src="https://picsum.photos/id/517/400/300"
                  alt="Naranjas canarias"
                  className="rounded-lg h-48 w-full object-cover"
                />
              </figure>
              <div className="card-body">
                <h3 className="card-title">Naranjas</h3>
                <div className="badge badge-outline mb-2">Diciembre - Mayo</div>
                <p className="text-base-content/70 mb-4">
                  Las naranjas canarias destacan por su jugosidad y equilibrio entre dulzura y acidez. Ideales para zumos naturales.
                </p>
                <div className="card-actions justify-end">
                  <Link to="/mercados" className="btn btn-sm btn-primary">Dónde encontrarlas</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary text-secondary-content">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">¿Por qué consumir local?</h2>
          <p className="text-lg mb-8 opacity-90">
            Al comprar productos locales reduces tu huella de carbono, apoyas la economía de la isla
            y consumes alimentos más frescos y de temporada.
          </p>
          <Link to="/local" className="btn btn-outline btn-lg text-secondary-content border-secondary-content hover:bg-secondary-content hover:text-secondary">
            Descubre más
          </Link>
        </div>
      </section>
    </div>
  );
}

export default HomePage;