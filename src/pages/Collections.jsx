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
      return redirect("/collections");
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
      <div>
        <button
          type="button"
          className="btn btn-primary text-white mt-8"
          onClick={() => dispatch(toggleCollection())}
        >
          create collection
        </button>
        {collections.map((coll, index) => {
          return (
            <div key={index}>
              <h2>{coll.name}</h2>
              <p>{coll.description}</p>
              <span>{coll.topic}</span>
            </div>
          );
        })}
      </div>
      <CollectionCard isCollectionOpen={isCollectionOpen} />
    </>
  );
};

export default Collections;
