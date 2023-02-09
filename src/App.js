import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Auth from "./component/Auth";
import ErrorPages from "./pages/ErrorPages";
import Dashboard from "./pages/dashboard/Dashboard";
import Products from "./pages/dashboard/Products";
import AddProducts from "./pages/dashboard/AddProducts";
import EditProducts from "./pages/dashboard/EditProducts";
import EditUsers from "./pages/dashboard/EditUsers";
import UsersList from "./pages/dashboard/UsersList";
import Settings from "./pages/dashboard/Settings";
import AddUsers from "./pages/dashboard/AddUsers";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Auth />}>
          <Route index element={<Dashboard />} />
          <Route path="userslist" element={<UsersList />} />
          <Route path="addusers" element={<AddUsers />} />
          <Route path="editusers/:id" element={<EditUsers />} />
          <Route path="products" element={<Products />} />
          <Route path="addproducts" element={<AddProducts />} />
          <Route path="editproducts/:id" element={<EditProducts />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        <Route path="*" element={<ErrorPages />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
