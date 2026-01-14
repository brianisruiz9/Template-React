import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Signin from "../containers/SignIn";
import Layout from "../containers/Layout";
import Dashboard from "../containers/Dashboard";
import Users from "../containers/Users";

const SwitchApp = () => {
  return (
    <BrowserRouter>
      <Routes>

        <Route element={<Layout />}>
          {/* <Route path="/" element={<Navigate to="/dashboard" replace />} /> */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
          {/* <Route path="/products" element={<Products />} />
          <Route path="/blog" element={<Blog />} /> */}
        </Route>

        <Route path="/sign-in" element={<Signin />} />
        {/* <Route path="/dashboard" element={<Layout />} /> */}
        <Route path="*" element={<Navigate to="/sign-in" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default SwitchApp;
