//como es un componente de react se coloca jsx o tsx pq si no no lo agarra
//peticiones del cliente
import {
  createContext,
  useContext,
  useEffect,
  ReactNode,
  useState,
} from "react";
import {
  getCustomer as getCustomerClient,
  getCustomers as getCustomersClient,
  deleteCustomer as deleteCustomerClient,
  createCustomer as createCustomerClient,
  updateCustomer as updateCustomerClient,
} from "../Api/api";

//lo que debera lleavr nuestro objeto Customer->Cliente
//esta interfaz y la de la API deben ser igual en claves y tipos
//todo lo que debera llevar el children
interface ICustomerContextProviderProps {
  children: ReactNode;
}

export interface ICustomer {
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  address: string;
}

interface ICustomerState {
  //habra un arreglo de customers -> osea lo que se traiga de la API su INFO
  //"cutomers" -> debe llamarsae igual que en el state y vice versa
  //las funciones o metodos que se pasaran deberan corresponder a la estrucutura establecida en la API
  customers: ICustomer[];
  getCustomer: (id: number) => Promise<ICustomer | null>;
  getCustomers: () => Promise<ICustomer[]>;
  deleteCustomer: (id: number) => Promise<boolean>;
  createCustomer: (customer: ICustomer) => Promise<ICustomer | null>;
  updateCustomer: (customer: ICustomer) => Promise<ICustomer | null>;
}

//Crear el contexto
const CustomerContext = createContext<ICustomerState | undefined>(undefined);

const CustomerContextProvider = ({
  children,
}: ICustomerContextProviderProps) => {
  //definimos el estado de lo que debera llevar cada customer en el arreglo
  //teniendo el siguiente formato de tipo objeto
  /*
    [
        {Id:number,
    firstName: string,
lastName:string,
phone:string,
email:string,
address:string
},
{},]
    */
  const [customers, setCustomers] = useState<ICustomer[]>([]);

  //crear un nuevo customer
  const createCustomer = async (
    customer: ICustomer
  ): Promise<ICustomer | null> => {
    try {
      const response = await createCustomerClient(customer);
      reloadCustomers();
      return response;
    } catch (error) {
      console.error("Error al crear el cliente:", error);
      return null;
    }
  };
  //pedir un customer by Id
  const getCustomer = async (id: number): Promise<ICustomer | null> => {
    try {
      const response = await getCustomerClient(id);
      //no usamos reload customers por que solo vamos a hacer una peticion para un solo customer
      return response;
    } catch (e) {
      console.error("Cliente no encontrado", e);
      return null;
    }
  };

  //pedir todos los customers? -> forzar recarga o recargar
   const  getCustomers = async (): Promise<ICustomer[]> => {
    try {
      const response = await getCustomersClient();
      return response;
    } catch (e) {
      console.error("No se pudo recargar los clientes", e);
      return [];
    }
  };
  //eliminar un customer por id
  const deleteCustomer = async (id: number): Promise<boolean> => {
    try {
      await deleteCustomerClient(id);
      reloadCustomers();
      return true;
    } catch (e) {
      console.error("No se pudo eliminar un cliente", e);
      return false;
    }
  };
  //actualizar un customer por id?
  const updateCustomer = async (
    customer: ICustomer
  ): Promise<ICustomer | null> => {
    try {
      const response = await updateCustomerClient(customer);
      reloadCustomers();
      return response;
    } catch (e) {
      console.error("No se pudo actualizar el cliente", e);
      return null;
    }
  };

  //aqui pasamos todos los valores que debebra llevar el children y que pasara a los demas componentes\

  //gaurdar o recargar los cambios despues de hacer una peticion
  //sintaxis arrow func: const Nombre = async(paramtro):tipo<generico> =>{return}
  //carga al realizar cambios
  const reloadCustomers = () => {
    // Llamamos a la función getTasksRequest, que devuelve una promesa
    getCustomersClient()
      .then((data: ICustomer[]) => {
        // Cuando la promesa se resuelve correctamente, guardamos los datos del arreglo de tareas en la variable tasks
        setCustomers(data);
      })
      .catch((error) => {
        // Si ocurre algún error en la promesa, lo capturamos y lo mostramos en la consola
        console.error("Error al cargar las tareas:", error);
      });
  };
  //carga al principio
  useEffect(() => {
    // Definimos la función fetchData
    const fetchData = () => {
      // Llamamos a la función getCustomersClient, que devuelve una promesa[eso del lado de la api]
      getCustomersClient()
        .then((data: ICustomer[]) => {
          // Cuando la promesa se resuelve correctamente, actualizamos el estado customers con los datos recibidos
          setCustomers(data);
        })
        .catch((error) => {
          // Si ocurre algún error en la promesa, lo capturamos y lo mostramos en la consola
          console.error("Error al obtener los customers:", error);
        });
    };

    // Llamamos a fetchData al cargar el componente por primera vez (cuando el arreglo de dependencias está vacío)
    fetchData();
  }, []);

  const customerState: ICustomerState = {
    customers,
    getCustomer,
    getCustomers,
    createCustomer,
    deleteCustomer,
    updateCustomer,
  };

  return (
    <CustomerContext.Provider value={customerState}>
      {children}
    </CustomerContext.Provider>
  );
};

// Custom hook para acceder al contexto
const useCustomerContext = () => {
  //proporciona lo que contiene RatingContext
  const context = useContext(CustomerContext);
  if (!context) {
    throw new Error(
      "useCustomerContext debe ser utilizado dentro de RatingContextProvider"
    );
  }
  return context;
};

export { CustomerContextProvider, useCustomerContext };
