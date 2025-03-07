import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import authService from "../../services/auth.service";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { storeToken, authenticateUser } = useContext(AuthContext);

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    const requestBody = { email, password };

    authService
      .login(requestBody)
      .then((response) => {
        // If the POST request is successful store the authentication token,
        // after the token is stored authenticate the user
        storeToken(response.data.authToken);
        authenticateUser();
        navigate("/");
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
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-base-200">
      <div className="w-full max-w-md p-8 space-y-8 bg-base-100 shadow-lg rounded-lg">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-primary">Acceder a Sansofé</h1>
          <p className="mt-2 text-sm text-base-content/70">
            Descubre los mercados locales de Gran Canaria
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

        <form onSubmit={handleLoginSubmit} className="space-y-6">
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
              <Link to="/reset-password" className="label-text-alt link link-hover">
                ¿Olvidaste tu contraseña?
              </Link>
            </label>
          </div>

          <div className="form-control mt-6">
            <button 
              type="submit" 
              className={`btn btn-primary w-full ${isLoading ? 'loading' : ''}`} //Valorar si quitar este spinner o cambiar el ancho
              disabled={isLoading}
            >
              {isLoading ? 'Accediendo...' : 'Acceder'}
            </button>
          </div>
        </form>

        <div className="divider">o</div>

        <div className="text-center">
          <p className="text-sm">¿No tienes una cuenta?</p>
          <Link to="/registro" className="btn btn-outline btn-sm btn-block mt-2">
            Regístrate
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;