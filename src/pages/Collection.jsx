import { useDispatch, useSelector } from "react-redux";
import { Empty, Loading } from "../components";
import { useEffect } from "react";
import { getItems, setItemId } from "../features/itemSlice";
import { MdAdd, MdDelete } from "react-icons/md";
import { BsThreeDots } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const Collection = () => {
  const { items, isItemLoading, customFields } = useSelector(
    (store) => store.item
  );
  const { collectionId } = useSelector((store) => store.collection);
  const { theme } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getItems());
  }, []);

  const handleRowClick = (id) => {
    dispatch(setItemId(id));
    navigate(`/collections/${collectionId}/items/${id}`);
  };

  if (isItemLoading) {
    return <Loading />;
  }

  if (items.length === 0) {
    return (
      <>
        <Empty
          text="There's no items in this collection yet!"
          btnText="Add Item"
          url={`/collections/${collectionId}/items/new-item`}
        />
      </>
    );
  }

  return (
    <>
      <div className="flex flex-col justify-center items-center w-[90%]">
        <div className="flex justify-between items-center w-full">
          <h1 className="font-bold text-3xl leading-[42px]">Items</h1>
          <Link
            to={`/collections/${collectionId}/items/new-item`}
            className="btn btn-primary text-white flex items-center gap-x-2"
          >
            <MdAdd className="text-lg" /> Add Item
          </Link>
        </div>
        <div className="mt-8 overflow-x-auto w-full pt-6">
          <table className="table table-pin-rows table-pin-cols ">
            <thead>
              <tr
                className={`border-b ${
                  theme === "myDark"
                    ? "border-tableDarkBr"
                    : "border-tableLightBr"
                } ${
                  theme === "myDark"
                    ? "hover:bg-tableDarkHover/50"
                    : "hover:bg-tableLightHover/50"
                }`}
              >
                <th>
                  <span className="responsive-text">Id</span>
                </th>
                <th>
                  <span className="responsive-text">Name</span>
                </th>
                {customFields
                  .filter(
                    (field) => field.type === "string" || field.type === "date"
                  )
                  .map((field, index) => (
                    <th key={index}>
                      <span className="responsive-text">{field.name}</span>
                    </th>
                  ))}
                <th>
                  <span className="responsive-text">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {items?.map((item, index) => {
                const { name, _id, customFields: customValues } = item;

                const relevantCustomValues = customValues.filter(
                  (value) =>
                    customFields.find((field) => field.name === value.name)
                      ?.type === "string" ||
                    customFields.find((field) => field.name === value.name)
                      ?.type === "date"
                );

                return (
                  <tr
                    key={_id}
                    className={`border-t ${
                      theme === "myDark"
                        ? "border-tableDarkBr"
                        : "border-tableLightBr"
                    } ${
                      theme === "myDark"
                        ? "hover:bg-tableDarkHover/50"
                        : "hover:bg-tableLightHover/50"
                    }`}
                    onClick={() => handleRowClick(_id)}
                    style={{ cursor: "pointer" }}
                  >
                    <th>{index + 1}</th>
                    <td>
                      <span className="font-medium">{name}</span>
                    </td>
                    {relevantCustomValues.map((value, valueIndex) => (
                      <td key={valueIndex}>{value.value}</td>
                    ))}
                    <td>
                      <div className="dropdown dropdown-top">
                        <label tabIndex={0} className="btn m-1">
                          <BsThreeDots />
                        </label>
                        <ul
                          tabIndex={0}
                          className="dropdown-content z-[1] menu p-2 shadow bg-secondary rounded-box w-28"
                        >
                          <li>
                            <span>
                              <FaEdit className="text-primary" /> Edit
                            </span>
                          </li>
                          <li>
                            <span>
                              <MdDelete className="text-primary text-lg" />
                              Delete
                            </span>
                          </li>
                        </ul>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Collection;
