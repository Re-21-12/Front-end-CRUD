import axios from "axios";
interface Customer {
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  address: string;
}
//aqui solo se consume la API del lado del CLIENTE
//funcion? sintaxis:
//funcion = async(parametro):Retorno<Tipo> =>{}
export const getCustomer = async (id: number): Promise<Customer | null> => {
  return axios
    .get<Customer>(`https://localhost:7139/api/customer/${id}`)
    .then((response) => response.data)
    .catch((error) => {
      if (error.response && error.response.status === 404) {
        return null; // Cliente no encontrado
      }
      throw error;
    });
};
export const getCustomers = async (): Promise<Customer[]> => {
  return axios
  //https://localhost:7139/api/customer
    .get<Customer[]>(`https://localhost:7139/api/customer`)
    .then((response) => {
      console.log(response.data);
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
};

export const deleteCustomer = (id: number): Promise<boolean> => {
  return axios
    .delete<boolean>(`https://localhost:7139/api/customer/${id}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
};

export const createCustomer = (
  customer: Customer
): Promise<Customer | null> => {
  return axios
    .post<Customer>(`https://localhost:7139/api/customer`, customer)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
};

//duda???????
export const updateCustomer = (
  customer: Customer
): Promise<Customer | null> => {
  return axios
    .put<Customer>(`https://localhost:7139/api/customer`, customer)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
};
