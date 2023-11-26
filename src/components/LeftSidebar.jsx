import { Link, NavLink, redirect } from "react-router-dom";
import { links } from "../utils/constants";
import { BsPersonAdd, BsPersonCircle } from "react-icons/bs";
import { RiAdminLine } from "react-icons/ri";
import { BiLogOut } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { logoutUser } from "../features/userSlice";
import { toggleFieldsChanged } from "../features/collectionSlice";

const handleLinkClick = (event, dispatch, isFieldsChanged) => {
  const confirmationMessage =
    "Are you sure you want to leave? Your changes may not be saved.";

  if (isFieldsChanged) {
    const userConfirmation = window.confirm(confirmationMessage);

    if (!userConfirmation) {
      event.preventDefault();
      return;
    }
    dispatch(toggleFieldsChanged());
  }
};

const LeftSidebar = () => {
  const { user, theme } = useSelector((store) => store.user);
  const { isFieldsChanged } = useSelector((store) => store.collection);
  const dispatch = useDispatch();

  const logout = () => {
    toast.success("Logging out...");
    dispatch(logoutUser());
    redirect("/");
  };

  const handleClick = (event) => {
    handleLinkClick(event, dispatch, isFieldsChanged);
  };

  return (
    <aside
      className={`bg-secondary p-4 pt-36 sticky top-0 left-0 h-screen w-fit max-md:hidden lg:w-[266px] 
    overflow-y-auto flex flex-col justify-between ${
      theme === "myLight" ? "light-shadow border-r border-base-300" : ""
    }`}
    >
      <div className="flex flex-1 flex-col gap-6">
        {links.map((link) => {
          let { id, url, text, icon } = link;
          return (
            <NavLink
              key={id}
              to={url}
              className={({ isActive }) =>
                isActive
                  ? "nav-link bg-primary text-white rounded-lg"
                  : "nav-link"
              }
              onClick={handleClick}
            >
              {icon}
              <p className="capitalize max-lg:hidden">{text}</p>
            </NavLink>
          );
        })}
        {user?.role === "admin" && (
          <NavLink
            to="/admin"
            className={({ isActive }) =>
              isActive
                ? "nav-link bg-primary text-white rounded-lg"
                : "nav-link"
            }
            onClick={handleClick}
          >
            <RiAdminLine />
            <p className="capitalize max-lg:hidden">Admin</p>
          </NavLink>
        )}
      </div>
      {user ? (
        <button type="button" className="nav-link" onClick={logout}>
          <BiLogOut className="text-lg" />
          <span className="capitalize max-lg:hidden">Logout</span>
        </button>
      ) : (
        <div className="flex flex-col gap-3">
          <Link to="/login" className="btn bg-base-300">
            <BsPersonCircle className="lg:hidden text-lg" />
            <span className="max-lg:hidden text-primary">Log in</span>
          </Link>
          <Link
            to="/register"
            className="btn btn-neutral text-base-content border-transparent"
          >
            <BsPersonAdd className="lg:hidden text-lg" />
            <span className="max-lg:hidden">Sign up</span>
          </Link>
        </div>
      )}
    </aside>
  );
};

export { handleLinkClick };

export default LeftSidebar;
