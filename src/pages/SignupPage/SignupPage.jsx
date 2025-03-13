import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../../services/auth.service";

function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleName = (e) => setName(e.target.value);

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Create an object representing the request body
    const requestBody = { email, password, name };

    // Send a request to the server using axios
    /* 
    const authToken = localStorage.getItem("authToken");
    axios.post(
      `${process.env.REACT_APP_SERVER_URL}/auth/signup`, 
      requestBody, 
      { headers: { Authorization: `Bearer ${authToken}` } }
    )
    .then((response) => {})
    */

    // Or using a service
    authService
      .signup(requestBody)
      .then((response) => {  //VER SI FUNCIONA ERROR.RESPONSE DE ABAJO
        navigate("/acceso")
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-12 bg-base-200">
      <div className="w-full max-w-md p-8 space-y-8 bg-base-100 shadow-lg rounded-lg">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-primary">Únete a Sansofé</h1>
          <p className="mt-2 text-sm text-base-content/70">
            Crea tu cuenta para descubrir los mercados locales <br /> de Gran Canaria y guardar tus favoritos
          </p>
        </div>

        {errorMessage && (
          <div className="alert alert-error text-sm shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleSignupSubmit} className="space-y-6">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Nombre</span>
            </label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={handleName}
              placeholder="Tu nombre"
              className="input input-bordered w-full"
              required
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleEmail}
              placeholder="tu@email.com"
              className="input input-bordered w-full"
              required
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Contraseña</span>
            </label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={handlePassword}
              placeholder="••••••••"
              className="input input-bordered w-full"
              required
            />
            <label className="label">
              <span className="label-text-alt text-base-content/70">
                Mínimo 6 caracteres
              </span>
            </label>
          </div>

          <div className="form-control mt-6">
            <button 
              type="submit" 
              className={`btn btn-primary w-full`} //${isLoading ? 'loading' : ''} Valorar si quitar este spinner o cambiar el ancho
              disabled={isLoading}
            >
              {isLoading ? 'Creando cuenta...' : 'Crear cuenta'}
            </button>
          </div>
        </form>

        <div className="divider">o</div>

        <div className="text-center">
          <p className="text-sm">¿Ya tienes una cuenta?</p>
          <Link to="/acceso" className="btn btn-outline btn-sm btn-block mt-2">
            Acceder
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;