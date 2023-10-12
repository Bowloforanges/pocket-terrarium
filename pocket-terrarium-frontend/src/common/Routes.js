import { Routes, Route } from "react-router-dom";
import Secret from "../views/Secret";
import Landing from "../views/Landing";
import Generator from "../views/Generator";
import ProtectedRoute from "./ProtectedRoute";
//import { useNavigate } from "react-router-dom";

const Router = () => {
  //const navigate = useNavigate();

  return (
    <>
      <Routes>
        <Route index element={<Landing />} />
        <Route
          path="secret"
          element={
            <ProtectedRoute>
              <Secret />
            </ProtectedRoute>
          }
        />
        <Route path="generate" element={<Generator />} />
        <Route path="*" element={<p>Not Found: 404!</p>} />
      </Routes>
    </>
  );
};

export default Router;
