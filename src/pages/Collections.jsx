import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllCollections,
  setEditCollection,
  toggleCollection,
} from "../features/collectionSlice";
import { Empty, Loading, CollectionCard } from "../components";

import customFetch from "../utils/axios";
import { toast } from "react-toastify";
import { Link, redirect, useNavigate } from "react-router-dom";
import { MdAdd, MdDelete } from "react-icons/md";
import { BsThreeDots } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";

export const action =
  ({ dispatch, user, isEditing, collectionId, toggleEditing }) =>
  async ({ request }) => {
    const formData = await request.formData();
    const collection = Object.fromEntries(formData);
    try {
      if (!isEditing) {
        const response = await customFetch.post("/collections", {
          user,
          collection,
        });
        toast.success(
          `${response?.data?.collection?.name} collection created successfully`
        );
        dispatch(toggleCollection());
        return redirect(
          `/collections/${response?.data?.collection?._id}/fields`
        );
      }
      const response = await customFetch.patch(`/collections/${collectionId}`, {
        user,
        updatedFields: collection,
      });
      toast.success(
        `${response?.data?.collection?.name} collection updated successfully`
      );
      dispatch(toggleCollection());
      dispatch(toggleEditing());
      return null;
    } catch (error) {
      console.log(error);
      const errorMessage =
        error?.response?.data?.message ||
        "please double check your credentials";

      toast.error(errorMessage);
      return null;
    }
  };

const Collections = () => {
  const { collections, isCollectionOpen, isCollectionLoading } = useSelector(
    (store) => store.collection
  );
  const { theme } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRowClick = (id, event) => {
    const isLinkClicked = event.target.tagName.toLowerCase() === "a";
    const isActionButtonClicked = event.target.closest(".dropdown") !== null;

    if (!isLinkClicked && !isActionButtonClicked) {
      navigate(`/collections/${id}`);
    }
  };

  const editCollection = ({ name, description, topic, collectionId }) => {
    dispatch(setEditCollection({ name, description, topic, collectionId }));
  };

  useEffect(() => {
    dispatch(getAllCollections());
  }, [isCollectionOpen]);

  if (isCollectionLoading) {
    return <Loading />;
  }

  if (collections.length === 0) {
    return (
      <>
        <Empty
          text="There's no collections to show"
          btnText="create collection"
        />
        <CollectionCard isCollectionOpen={isCollectionOpen} />
      </>
    );
  }

  return (
    <>
      <div className="flex flex-col justify-center items-center w-[90%]">
        <div className="flex justify-between items-center w-full">
          <h1 className="font-bold text-3xl leading-[42px]">Collections</h1>
          <button
            type="button"
            className="btn btn-primary text-white flex items-center gap-x-2"
            onClick={() => dispatch(toggleCollection())}
          >
            <MdAdd className="text-lg" /> create collection
          </button>
        </div>
        <div className="mt-8 overflow-x-auto w-full pt-6">
          <table className="table table-pin-rows table-pin-cols ">
            <thead>
              <tr>
                <th>
                  <span className="responsive-text">Id</span>
                </th>
                <th>
                  <span className="responsive-text">Name</span>
                </th>
                <th>
                  <span className="responsive-text">Topic</span>
                </th>
                <th>
                  <span className="responsive-text">Fields</span>
                </th>
                <th>
                  <span className="responsive-text">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {collections?.map((collection, index) => {
                const { name, description, topic, _id, creator, customFields } =
                  collection;
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
                    onClick={(e) => handleRowClick(_id, e)}
                    style={{ cursor: "pointer" }}
                  >
                    <th>{index + 1}</th>
                    <td>
                      <div className="flex flex-col">
                        <span className="font-medium">{name}</span>
                        <span>{description}</span>
                      </div>
                    </td>
                    <td>{topic}</td>
                    <td>
                      <Link
                        to={`/collections/${_id}/fields`}
                        className="hover:underline"
                      >
                        View Fields
                      </Link>
                    </td>
                    <td>
                      <div className="dropdown dropdown-top">
                        <label tabIndex={0} className="btn m-1">
                          <BsThreeDots />
                        </label>
                        <ul
                          tabIndex={0}
                          className="dropdown-content z-[1] menu p-2 shadow bg-secondary rounded-box w-32"
                        >
                          <li
                            onClick={() =>
                              editCollection({
                                name,
                                description,
                                topic,
                                collectionId: _id,
                              })
                            }
                          >
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
      <CollectionCard isCollectionOpen={isCollectionOpen} />
    </>
  );
};

export default Collections;
