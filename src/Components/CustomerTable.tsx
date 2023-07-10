import { useEffect, useState } from "react";
import { useCustomerContext } from "../context/GlobalContext";
import { RenderBody } from "./RenderBody";
import { ICustomer } from "../context/GlobalContext";
import { useParams } from "react-router-dom";

export const CustomerTable = () => {
  const { id } = useParams<{ id: string | any }>();

  const { customers, getCustomer } = useCustomerContext();
  //barra de busqueda
  const [showRows, setShowRows] = useState<boolean>(true);
  //cargar una sola fla

  const [customerId, setCustomerId] = useState<number>(0);
  const [customerRow, setCustomerRow] = useState<ICustomer>({
    id: 0,
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    address: "",
  });
  //esta funcion va a mostrar solo cuando se use el boton check de form

  //mostrar filas -> no : mostrar fila
  const handleShowRows = () => {
    setShowRows(false);
  };
  //mostrar fila -> si :
  const handleNotShowRow = () => {
    setShowRows(true);
  };
  const handleSearch = async () => {
    const customerObj = await getCustomer(customerId);
    if (customerObj != null) {
      setCustomerRow(customerObj);
      handleShowRows();
    }
  };
  const handleChange = (eventValue: number) => {
    setCustomerId(eventValue);
  };
  //final barra de busqueda

  useEffect(() => {
    if (id) {
      const customerId = parseInt(id);
      setCustomerId(customerId);
      const checkCustomer = customers.find(
        (customer) => customer.id === customerId
      );
      if (checkCustomer) setCustomerRow(checkCustomer);
    }
  }, [id, customers]);

  return (
    <div className="grid grid-cols-1 gap-4 justify-items-center items-center h-screen bg-gray-900">
      <p className="text-center text-8xl font-bold text-white">
        {" "}
        Controlling Customers
      </p>
      <div className="max-w-lg">
        <input
          type="number"
          placeholder="Enter Customer ID"
          value={customerId}
          onChange={(e) => handleChange(Number.parseInt(e.target.value))}
          className="w-full px-4 py-2 border-gray-300 border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          min={1}
        />
        <div className="flex justify-center">
          <div className="mt-4">
            <button
              title="submit"
              onClick={handleSearch}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Search
            </button>
            <button
              title="submit"
              onClick={handleNotShowRow}
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 ml-2"
            >
              Clear
            </button>
          </div>
        </div>
      </div>
      <div className="h-80 overflow-y-auto">
        <table className="w-full bg-slate-800 text-white rounded-md">
          <thead>
            <tr>
              <th className="font-bold text-white">Id</th>
              <th className="font-bold text-white">First Name</th>
              <th className="font-bold text-white">Last Name</th>
              <th className="font-bold text-white">Phone</th>
              <th className="font-bold text-white">Email</th>
              <th className="font-bold text-white">Address</th>
              <th className="" />
            </tr>
          </thead>
          {id ? (
            <tbody>{RenderBody(customerRow)}</tbody>
          ) : (
            <tbody>
              {showRows
                ? customers.map((customer: ICustomer) => RenderBody(customer))
                : RenderBody(customerRow)}
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
};
