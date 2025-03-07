import "./Navbar.css";
import { Link, useLocation } from "react-router-dom";
import { useContext, useRef, useEffect } from "react";
import { AuthContext } from "../../context/auth.context";

function Navbar() {
  // Subscribe to the AuthContext to gain access to
  // the values from AuthContext.Provider's `value` prop
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  // Se crea un ref para controlar el checkbox
  const drawerCheckbox = useRef(null);
  const location = useLocation();

  // Cerrar el sidebar al cambiar de ruta
  useEffect(() => {
    closeSidebar();
  }, [location]);

  const closeSidebar = () => {
    // Cambiar el valor del checkbox a false para cerrar el sidebar
    if (drawerCheckbox.current) {
      drawerCheckbox.current.checked = false;
    }
  };

  // Determinar si un link está activo
  const isActive = (path) => {
    return location.pathname === path ? "bg-primary text-primary-content" : "";
  };

  return (
    <nav className="drawer">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" ref={drawerCheckbox} /* Se asigna el ref al checkbox *//>
      <div className="drawer-content flex flex-col">
        {/* Navbar */}
        <div className="navbar bg-base-100 shadow-md px-4">
          <div className="flex-none lg:hidden">
            <label htmlFor="my-drawer-3" aria-label="open sidebar" className="btn btn-square btn-ghost">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-6 w-6 stroke-current">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </label>
          </div>
          <div className="flex-1">
            <Link to="/" className="flex items-center gap-2">
              <div className="font-bold text-2xl text-primary">Sansofé</div>
              <div className="text-sm text-base-content/70 hidden sm:block mt-1">Mercados de Gran Canaria</div>
            </Link>
          </div>
          <div className="hidden flex-none lg:block">
            <ul className="menu menu-horizontal items-center gap-2">
              {/* Navbar menu content here */}
              <li><Link to="/municipios" className={`rounded-md ${isActive("/municipios")}`}>Municipios</Link></li>
              <li><Link to="/mercados" className={`rounded-md ${isActive("/mercados")}`}>Mercados</Link></li>
              <li><Link to="/local" className={`rounded-md ${isActive("/local")}`}>Consume Local</Link></li>
              
              {isLoggedIn && (
                <>
                  {user && user.role === "admin" && (
                    <li><Link to="/admin" className={`rounded-md ${isActive("/admin")}`}>Admin</Link></li>
                  )}
                  {user && (
                    <li><Link to="/favorites" className={`rounded-md ${isActive("/favorites")}`}>Favoritos</Link></li>
                  )}
                  <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                      <div className="w-10 rounded-full">
                        <img src="https://picsum.photos/id/402/200/300" alt="profile" />
                      </div>
                    </div>
                    <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                      <li className="font-semibold px-4 py-2 border-b border-base-200">{user && user.name}</li>
                      <li><Link to="/perfil">Perfil</Link></li>
                      <li><button onClick={logOutUser}>Cerrar Sesión</button></li>
                    </ul>
                  </div>
                </>
              )}
              
              {!isLoggedIn && (
                <>
                  <li><Link to="/acceso" className="btn btn-ghost btn-sm">Acceder</Link></li>
                  <li><Link to="/registro" className="btn btn-primary btn-sm">Registrarse</Link></li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
      <div className="drawer-side z-40">
        <label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay"></label>
        <div className="menu p-4 w-80 min-h-full bg-base-200 flex flex-col">
          {/* Sidebar content here */}
          <button 
            className="btn btn-circle btn-ghost self-end mb-4"
            onClick={closeSidebar}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          {isLoggedIn && user && (
            <div className="flex items-center gap-3 p-4 mb-4 bg-base-100 rounded-box">
              <div className="avatar">
                <div className="w-12 rounded-full">
                  <img src="https://picsum.photos/id/402/200/300" alt="profile" />
                </div>
              </div>
              <div>
                <div className="font-bold">{user.name}</div>
                <div className="text-xs opacity-70">{user.email}</div>
              </div>
            </div>
          )}
          
          <ul className="space-y-2 flex-grow">
            <li><Link to="/municipios" className={`${isActive("/municipios")}`} onClick={closeSidebar}>Municipios</Link></li>
            <li><Link to="/mercados" className={`${isActive("/mercados")}`} onClick={closeSidebar}>Mercados</Link></li>
            <li><Link to="/local" className={`${isActive("/local")}`} onClick={closeSidebar}>Consume Local</Link></li>
            
            {isLoggedIn && user && user.role === "admin" && (
              <li><Link to="/admin" className={`${isActive("/admin")}`} onClick={closeSidebar}>Administración</Link></li>
            )}
            
            {isLoggedIn && (
              <li><Link to="/favorites" className={`${isActive("/favorites")}`} onClick={closeSidebar}>Mis Favoritos</Link></li>
            )}
          </ul>
          
          <div className="mt-auto border-t border-base-300 pt-4">
            {isLoggedIn ? (
              <>
                <Link to="/perfil" className="btn btn-outline w-full mb-2" onClick={closeSidebar}>Mi Perfil</Link>
                <button onClick={() => {logOutUser(); closeSidebar();}} className="btn btn-ghost w-full">Cerrar Sesión</button>
              </>
            ) : (
              <>
                <Link to="/acceso" onClick={closeSidebar} className="btn btn-outline w-full mb-2">Acceder</Link>
                <Link to="/registro" onClick={closeSidebar} className="btn btn-primary w-full">Registrarse</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;