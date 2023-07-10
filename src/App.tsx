//aqui vvamos a implementar todas las rutas
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CustomerContextProvider } from "./context/GlobalContext";
import { Sidebar } from "./Navbar/Navbar";
import { CustomerTable } from "./Components/CustomerTable";
import { CustomerForm } from "./Components/CustomerForm";
import "./styles/main.css";
import Home from "./Components/Home";
function App() {
  return (
    <Router>
      <CustomerContextProvider>
        {/**Separador? */}

        {/**Separador? */}
        <div>
          <Sidebar />
          <div>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/see-customers" element={<CustomerTable />} />
              <Route path="/see-customer/:id" element={<CustomerTable/>}/>
              <Route path="/add-customer" element={<CustomerForm />} />
              <Route path="/modify-customer/:id" element={<CustomerForm />}/>
            </Routes>
          </div>
        </div>
      </CustomerContextProvider>
    </Router>
  );
}

export default App;
