import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Signin from "../containers/SignIn";
import Layout from "../containers/Layout";
import Dashboard from "../containers/Dashboard";
import Users from "../containers/users/Users";
import Posts from "../containers/posts/Posts";

const SwitchApp = () => {
  return (
    <BrowserRouter>
      <Routes>

        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
          <Route path="/posts" element={<Posts />} />
        </Route>

        <Route path="/sign-in" element={<Signin />} />
        <Route path="*" element={<Navigate to="/sign-in" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default SwitchApp;
