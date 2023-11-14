import { RouterProvider, createBrowserRouter } from "react-router-dom";
import {
  HomeLayout,
  Collection,
  Admin,
  Item,
  Login,
  Register,
  SearchResults,
  Landing,
  Collections,
  ProtectedRoute,
  Tags,
} from "./pages";
import { action as loginAction } from "./pages/Login";
import { action as registerAction } from "./pages/Register";
import { loginUser } from "./features/userSlice";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";

const App = () => {
  const dispatch = useDispatch();

  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomeLayout />,
      children: [
        {
          index: true,
          element: <Landing />,
        },
        {
          path: "collections",
          element: (
            <ProtectedRoute>
              <Collections />
            </ProtectedRoute>
          ),
        },
        {
          path: "search-results",
          element: <SearchResults />,
        },
        {
          path: "collection",
          element: <Collection />,
        },
        {
          path: "admin",
          element: (
            <ProtectedRoute requiredRole="admin">
              <Admin />
            </ProtectedRoute>
          ),
        },
        {
          path: "collection/:id",
          element: <Item />,
        },
        {
          path: "tags",
          element: <Tags />,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
      action: loginAction({ dispatch, loginUser }),
    },
    {
      path: "/register",
      element: <Register />,
      action: registerAction({ dispatch, loginUser }),
    },
  ]);

  return (
    <>
      <ToastContainer position="top-center" />
      <RouterProvider router={router} />
    </>
  );
};

export default App;
