import { useEffect, useState } from "react";
import { useCustomerContext } from "../context/GlobalContext";
import { ICustomer } from "../context/GlobalContext";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

//revisar
//import { useNavigate } from "react-router-dom";
export const CustomerForm = () => {
  //revisar
  //const navigate = useNavigate();
  const { id } = useParams<{ id: string | any }>();
  const { customers, createCustomer, updateCustomer } = useCustomerContext();
  const customerToEdit = customers.find(
    (customer) => customer.id == parseInt(id)
  );
  const [editForm, setEditForm] = useState<boolean>(
    customerToEdit != undefined
  );
  const [customer, setCustomer] = useState<ICustomer>({
    id: customerToEdit?.id || 0,
    firstName: customerToEdit?.firstName || "",
    lastName: customerToEdit?.lastName || "",
    phone: customerToEdit?.phone || "",
    email: customerToEdit?.email || "",
    address: customerToEdit?.address || "",
  });
  //subir el contenido del form y limpiar campos
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editForm) {
      //si editar es verdadero
      updateCustomer(customer);
      setEditForm(true);
      setCustomer({
        id: 0,
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        address: "",
      });
    } else {
      //si es falso crea
      createCustomer(customer);
      setEditForm(false);
      setCustomer({
        id: 0,
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        address: "",
      });
    }

    //navigate("/see-customers");
  };
  //mandar los cambios
  const handleChange = (eventName: string, customer: string) => {
    if (eventName == "id") {
      return;
    }
    //documentar bien esta parte !!!!!!
    setCustomer((prevCustomer) => ({
      ...prevCustomer,
      [eventName]: customer,
    }));
  };
  //al inicial el form o cargaarlo
  useEffect(() => {
    //verificar si tiene algo [objeto]
    if (customerToEdit) {
      //actualizar el customer con lo que traiga del render body
      setCustomer(customerToEdit);
    }
    //ver si hubieron cambios de lo que se le mando
  }, [customerToEdit]);
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-900 fon">
      <form
        onSubmit={handleSubmit}
        className="bg-slate-800 rounded-lg p-8 shadow-lg grid gap-4"
      >
        <label className="text-white font-bold">First Name</label>
        <input
          placeholder="Jon"
          title="firstName"
          type="text"
          value={customer.firstName}
          onChange={(e) => handleChange(e.target.title, e.target.value)}
          className="w-full border-gray-300 border-2 rounded-md py-2 px-4 mb-4 focus:outline-none focus:ring-2 focus:ring-black"
        />

        <label className="text-white font-bold">Last Name</label>
        <input
          placeholder="Doe"
          title="lastName"
          type="text"
          value={customer.lastName}
          onChange={(e) => handleChange(e.target.title, e.target.value)}
          className="w-full border-gray-300 border-2 rounded-md py-2 px-4 mb-4 focus:outline-none focus:ring-2 focus:ring-black"
        />

        <label className="text-white font-bold">Phone</label>
        <input
          placeholder="12213443"
          title="phone"
          type="text"
          value={customer.phone}
          onChange={(e) => handleChange(e.target.title, e.target.value)}
          className="w-full border-gray-300 border-2 rounded-md py-2 px-4 mb-4 focus:outline-none focus:ring-2 focus:ring-black"
        />

        <label className="text-white font-bold">Email</label>
        <input
          placeholder="example@gmail.com"
          title="email"
          type="text"
          value={customer.email}
          onChange={(e) => handleChange(e.target.title, e.target.value)}
          className="w-full border-gray-300 border-2 rounded-md py-2 px-4 mb-4 focus:outline-none focus:ring-2 focus:ring-black"
        />

        <label className="text-white font-bold">Address</label>
        <input
          placeholder="Us 4-23 street "
          title="address"
          type="text"
          value={customer.address}
          onChange={(e) => handleChange(e.target.title, e.target.value)}
          className="w-full border-gray-300 border-2 rounded-md py-2 px-4 mb-4 focus:outline-none focus:ring-2 focus:ring-black"
        />
        <label className="text-yellow-600 font-bold text-center">
          {editForm ? (
            <p>
              Updating Customer <b>{customer.id}</b>
            </p>
          ) : (
            <p>Creating Customer</p>
          )}
        </label>
        {editForm ? (
          <div>
            <button
              type="submit"
              className="w-full bg-orange-600 text-white py-2 px-4 rounded-md hover:bg-orange-700"
            >
              Update
            </button>
            <Link to={`/see-customer/${customer.id}`}>
              <button className="w-full bg-purple-700 text-white py-2 px-4 rounded-md hover:bg-purple-800 mt-2">
                Check
              </button>
            </Link>
          </div>
        ) : (
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            Submit
          </button>
        )}
      </form>
    </div>
  );
};
