import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Signin from "../containers/SignIn";
import Layout from "../containers/Layout";

const SwitchApp = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/sign-in" element={<Signin />} />
        <Route path="/dashboard" element={<Layout />} />
        <Route path="*" element={<Navigate to="/sign-in" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default SwitchApp;
