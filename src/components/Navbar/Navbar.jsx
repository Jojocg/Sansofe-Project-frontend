import "./Navbar.css";
import { Link } from "react-router-dom";
import { useContext, useRef } from "react";
import { AuthContext } from "../../context/auth.context";

function Navbar() {
  // Subscribe to the AuthContext to gain access to
  // the values from AuthContext.Provider's `value` prop
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  // Se crea un ref para controlar el checkbox
  const drawerCheckbox = useRef(null);

  const closeSidebar = () => {
    // Cambiar el valor del checkbox a false para cerrar el sidebar
    if (drawerCheckbox.current) {
      drawerCheckbox.current.checked = false;
    }
  };

  return (
    <nav className="drawer">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" ref={drawerCheckbox} /* Se asigna el ref al checkbox */ />
      <div className="drawer-content flex flex-col">
        {/* Navbar */}
        <div className="navbar bg-base-300 w-full">
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
            <Link to="/" className="btn btn-ghost text-xl">Sansofé</Link> {/* meter SUBTEXTO mercados de gran canaria */}
          </div>
          <div className="hidden flex-none lg:block">
            <ul className="menu menu-horizontal items-center">
              {/* Navbar menu content here */}
              <li><Link to="/">Municipios</Link></li>
              <li><Link to="/">Mercados</Link></li>
              <li><Link to="/">Consume Local</Link></li>
              {isLoggedIn && (
                <>
                  <li><button onClick={logOutUser}>Cerrar Sesión</button></li>

                  <li><Link to="/profile">
                    <button>Profile</button>
                    <img src="https://picsum.photos/id/402/200/300" style={{ width: 50, height: 50, borderRadius: 25 }} alt="profile" />
                  </Link></li>

                  <span>{user && user.name}</span>
                </>
              )}
              {!isLoggedIn && (
                <>
                  <li><Link to="/signup" className="btn mx-4">Registrarse</Link></li>
                  <li><Link to="/login" className="btn">Acceder</Link></li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay"></label>
        <ul className="menu bg-base-200 min-h-full w-80 p-4">
          {/* Sidebar content here */}
          <button 
          className="btn btn-circle btn-outline btn-sm self-end mb-2"
          onClick={closeSidebar}> {/* Para cerrar el sidebar al hacer clic en este botón */}
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
          <li><Link to="/" onClick={closeSidebar}>Municipios</Link></li>
          <li><Link to="/" onClick={closeSidebar}>Mercados</Link></li>
          <li><Link to="/" onClick={closeSidebar}>Consume Local</Link></li>
          {isLoggedIn && (
            <>
              <li><button onClick={logOutUser}>Cerrar Sesión</button></li>

              <li><Link to="/profile">
                <button>Profile</button>
                <img src="https://picsum.photos/id/402/200/300" style={{ width: 50, height: 50, borderRadius: 25 }} alt="profile" />
              </Link></li>

              <span>{user && user.name}</span>
            </>
          )}
          {!isLoggedIn && (
            <>
              <li><Link to="/signup" onClick={closeSidebar} className="btn my-4">Registrarse</Link></li>
              <li><Link to="/login" onClick={closeSidebar} className="btn">Acceder</Link></li>
            </>
          )}
        </ul>
      </div>

      {/* {isLoggedIn && (
        <>
          <button onClick={logOutUser}>Cerrar Sesión</button>

          <Link to="/profile">
            <button>Profile</button>
            <img src="https://picsum.photos/id/402/200/300" style={{ width: 50, height: 50, borderRadius: 25 }} alt="profile" />
          </Link>

          <span>{user && user.name}</span>
        </>
      )} */}

      {/* {!isLoggedIn && (
        <>
          <Link to="/signup">
            {" "}
            <button>Registrarse</button>{" "}
          </Link>
          <Link to="/login">
            {" "}
            <button>Acceder</button>{" "}
          </Link>
        </>
      )} */}
    </nav>
  );
}

export default Navbar;
