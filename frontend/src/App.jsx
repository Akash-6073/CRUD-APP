import { useState } from "react";
import "./Styles/App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Users from "./Components/Users";
import CreateUsers from "./Components/CreateUsers";
import UpdateUsers from "./Components/UpdateUsers";
import ErrorPage from "./Components/ErrorPage";
import DeleteUser from "./Components/DeleteUser";
function App() {
  const [count, setCount] = useState(0);
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <div>
          <Users />
        </div>
      ),
    },
    {
      path: "/create",
      element: (
        <div>
          <CreateUsers />
        </div>
      ),
    },
    {
      path: "/update/:id",
      element: (
        <div>
          <UpdateUsers />
        </div>
      ),
    },
    {
      path: "/delete/:id",
      element: (
        <div>
          <DeleteUser />
        </div>
      ),
    },
    {
      path: "*",
      element: (
        <div>
          <ErrorPage />
        </div>
      ),
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
