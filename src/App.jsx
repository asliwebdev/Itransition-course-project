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
  Fields,
} from "./pages";
import { action as loginAction } from "./pages/Login";
import { action as registerAction } from "./pages/Register";
import { action as collectionAction } from "./pages/Collections";
import { loginUser } from "./features/userSlice";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { toggleEditing } from "./features/collectionSlice";

const App = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.user);
  const { isEditing, collectionId } = useSelector((store) => store.collection);

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
          action: collectionAction({
            dispatch,
            user,
            isEditing,
            collectionId,
            toggleEditing,
          }),
        },
        {
          path: "search-results",
          element: <SearchResults />,
        },
        {
          path: "collections/:collectionId",
          element: <Collection />,
        },
        {
          path: "collections/:collectionId/fields",
          element: <Fields />,
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
          path: "collections/:collectionId/items/:itemId",
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
