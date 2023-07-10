import { useState } from "react";
import { Link } from "react-router-dom";

export const Sidebar = () => {
  const [sideBarVisible, setSideBarVisible] = useState(false);
  const handleMouseEnter = () => {
    setSideBarVisible(true);
  };

  const handleMouseLeave = () => {
    setSideBarVisible(false);
  };
  return (
    <aside
      className={`fixed bg-gray-800 text-white h-screen w-1/6 ${
        sideBarVisible ? "-translate-x-0" : "-translate-x-40"
      } transition-transform   z-10  `}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/** a side se usa para colocar informacion de el lado lateral de la pantalla
       * utilizando un clase condicional osea se un estado hacemos un state para ocultar la barra lateral
       *
       */}
      <div className="p-4">
        <Link to="/" className=" text-white text-base font-semibold mb-4 block">
          Manage Web BD Customers API
        </Link>
        <ul className="space-y-2">
          <li>
            <Link
              to="/see-customers"
              className="text-white hover:text-gray-300 transition duration-300 block"
            >
              Customers{/**Agregar icono */}
            </Link>
          </li>
          <li>
            <Link
              to="/add-customer"
              className="text-white hover:text-gray-300 transition duration-300 block"
            >
              Add Customer{/**Agregar icono */}
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  );
};
