import { ChakraProvider } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import { NotFound } from "../pages/NotFound";
import { Boards } from "../pages/Boards/Boards";
import { Login } from "../pages/Login/Login";
import { Register } from "../pages/Register/Register";
import { Home } from "../pages/Home/Home";
import { Dashboard } from "../pages/Dashboard/Dashboard";
import { Templates } from "../pages/Templates/Templates";
import { Board } from "../pages/board/Board";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";


// const token = localStorage.getItem("authToken");

// const wrapWithSuspense = (element, isPrivate = false) => {
//   return isPrivate ? <Navigate to="/login" replace /> : element;
// };

function App() {
  return (
    <ChakraProvider>
      <Routes>
        <Route path="/dashboard/boards/:id" element={<PrivateRoute element={Board} />} />
        <Route path="/dashboard" element={<PrivateRoute element={Dashboard} />}>
          <Route
            path="/dashboard/boards"
            element={<PrivateRoute element={Boards} />}
          />
          <Route
            path="/dashboard/templates"
            element={<PrivateRoute element={Templates} />}
          />
        </Route>

        <Route path="/" element={<PublicRoute element={Home} />} />
        <Route path="/register" element={<PublicRoute element={Register} />} />
        <Route path="/login" element={<PublicRoute element={Login} />} />

        {/* Catch-all route for undefined paths */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </ChakraProvider>
  );
}

export default App;
