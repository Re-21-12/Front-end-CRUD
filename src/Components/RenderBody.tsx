import { Link } from "react-router-dom";
import { ICustomer, useCustomerContext } from "../context/GlobalContext";
export const RenderBody = (customer: ICustomer) => {
  const { deleteCustomer } = useCustomerContext();
  //console.log(customer, "aaa");
  return (
      <tr
        key={customer.id}
        className="bg-slate-500 hover:bg-slate-700 duration-300"
      >
        <td className=" text-emerald-500  px-4 py-2 border-x border-slate-800">
          {customer.id}
        </td>
        <td className=" text-white font-semibold px-4 py-2 border-x border-slate-800">
          {customer.firstName}
        </td>
        <td className="  text-white font-semibold px-4 py-2 border-x border-slate-800">
          {customer.lastName}
        </td>
        <td className="  text-white font-semibold px-4 py-2 border-x border-slate-800">
          {customer.phone}
        </td>
        <td className=" text-white font-semibold px-4 py-2 border-x border-slate-800">
          {customer.email}
        </td>
        <td className=" text-white font-semibold px-4 py-2 ">
          {customer.address}
        </td>
        <td className="px-4 py-2 ">
          <Link to={`/modify-customer/${customer.id}`}>
            <button className="bg-blue-800 font-semibold text-white px-4 py-2 rounded-md mr-2">
              Update
            </button>
          </Link>
          <button
            className="bg-red-800 font-semibold text-white px-4 py-2 rounded-md "
            onClick={(e) => {
              e.stopPropagation();
              const acceptWindow = window.confirm(
                "Do u want delete this Customer?"
              );
              if (acceptWindow) deleteCustomer(customer.id);
            }}
          >
            Delete
          </button>
        </td>
      </tr>
  );
};
