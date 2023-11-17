import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllCollections,
  toggleCollection,
} from "../features/collectionSlice";
import { Empty, Loading, CollectionCard } from "../components";

import customFetch from "../utils/axios";
import { toast } from "react-toastify";
import { redirect } from "react-router-dom";
import { MdAdd } from "react-icons/md";

export const action =
  ({ dispatch, createCollection, user }) =>
  async ({ request }) => {
    const formData = await request.formData();
    const collection = Object.fromEntries(formData);
    try {
      const response = await customFetch.post("/collections", {
        user,
        collection,
      });
      dispatch(createCollection(response.data));
      toast.success(
        `${response?.data?.collection?.name} collection created successfully`
      );
      dispatch(toggleCollection());
      return redirect(`/collections/${response?.data?.collection?._id}/fields`);
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
  const dispatch = useDispatch();

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
            className="btn btn-primary text-white mt-8 flex items-center gap-x-2"
            onClick={() => dispatch(toggleCollection())}
          >
            <MdAdd className="text-lg" /> create collection
          </button>
        </div>
        <div className="mt-8 overflow-x-auto w-full">
          <table className="table table-pin-rows table-pin-cols">
            <thead>
              <tr>
                <th>
                  <span className="responsive-text">Id</span>
                </th>
                <th>
                  <span className="responsive-text">Name</span>
                </th>
                <th>
                  <span className="responsive-text">Fields</span>
                </th>
                <th>
                  <span className="responsive-text">Topic</span>
                </th>
                {/* <th>
                  <span className="responsive-text">Last Updated By</span>
                </th> */}
                {/* <th>
                  <span className="responsive-text">Updated</span>
                </th> */}
              </tr>
            </thead>
            <tbody>
              {collections?.map((collection, index) => {
                const { name, description, topic, _id, creator, customFields } =
                  collection;
                return (
                  <tr key={_id}>
                    <th>{index + 1}</th>
                    <td>
                      <div className="flex flex-col">
                        <span className="font-medium">{name}</span>
                        <span>{description}</span>
                      </div>
                    </td>
                    <td>{customFields.length}</td>
                    <td>{topic}</td>
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
