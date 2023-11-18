import { FaRegMinusSquare } from "react-icons/fa";
import { formatTime } from "../utils";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllUsers,
  handleUserSelection,
  selectAllUsers,
} from "../features/userSlice";
import { useEffect } from "react";

const UsersTable = () => {
  const { selectedUsers, users, user } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const handleChange = (id) => {
    dispatch(handleUserSelection({ id }));
  };

  useEffect(() => {
    if ((!users || users.length === 0) && user) {
      dispatch(getAllUsers());
    }
  }, [dispatch, users]);

  return (
    <div className="mt-8 overflow-x-auto w-full">
      <table className="table table-pin-rows table-pin-cols border">
        <thead>
          <tr>
            <th>
              <span
                className="text-2xl cursor-pointer"
                onClick={() => dispatch(selectAllUsers())}
              >
                <FaRegMinusSquare />
              </span>
            </th>
            <th>
              <span className="responsive-text">ID</span>
            </th>
            <th>
              <span className="responsive-text">Name</span>
            </th>
            <th>
              <span className="responsive-text">e-Mail</span>
            </th>
            <th>
              <span className="responsive-text">Last Login</span>
            </th>
            <th>
              <span className="responsive-text">Registration time</span>
            </th>
            <th>
              <span className="responsive-text">Status</span>
            </th>
            <th>
              <span className="responsive-text">Role</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user, index) => {
            const {
              name,
              email,
              lastLogin,
              status,
              registrationTime,
              _id,
              role,
            } = user;
            return (
              <tr key={_id} className="border-t border-gray-300">
                <th>
                  <label>
                    <input
                      type="checkbox"
                      className="checkbox"
                      onChange={() => handleChange(_id)}
                      checked={selectedUsers.includes(_id)}
                    />
                  </label>
                </th>
                <td>{index + 1}</td>
                <td>{name}</td>
                <td>{email}</td>
                <td>{formatTime(lastLogin)}</td>
                <td>{formatTime(registrationTime)}</td>
                <td>{status}</td>
                <td>{role}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default UsersTable;
