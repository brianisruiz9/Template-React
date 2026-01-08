import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Signin from "../containers/Signin";

const SwitchApp = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/sign-in" element={<Signin />} />
        <Route path="*" element={<Navigate to="/sign-in" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default SwitchApp;
