import { useDispatch, useSelector } from "react-redux";
import { SecondInput } from "../components";
import { useEffect, useState } from "react";
import { addTag, createItem, getItem, removeTag } from "../features/itemSlice";
import { LiaTimesSolid } from "react-icons/lia";
import { Link } from "react-router-dom";

const inputTypes = {
  string: "text",
  integer: "number",
  date: "date",
};

const Item = () => {
  const { customFields, customValues, tags, name } = useSelector(
    (store) => store.item
  );
  const { collectionId } = useSelector((store) => store.collection);
  const [tag, setTag] = useState("");

  const dispatch = useDispatch();

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      dispatch(addTag(tag));
      setTag("");
    }
  };

  useEffect(() => {
    const pathSegments = window.location.pathname.split("/");
    const itemId = pathSegments[pathSegments.indexOf("items") + 1];

    if (itemId !== "new-item") {
      dispatch(getItem());
    }
  }, []);

  return (
    <div className="flex flex-col justify-center items-center w-[90%]">
      <div className="flex justify-between items-center w-full">
        <div className="text-sm breadcrumbs">
          <ul>
            <li>
              <Link to={`/collections/${collectionId}/fields`}>Fields</Link>
            </li>
            <li>
              <Link to={`/collections/${collectionId}`}>Items</Link>
            </li>
          </ul>
        </div>
        <h1 className="font-bold text-3xl leading-[42px]">
          {name || "Untitled"}
        </h1>
        <button
          type="button"
          className="btn btn-primary text-white flex items-center gap-x-2"
          onClick={() => dispatch(createItem())}
        >
          Publish
        </button>
      </div>
      {/* NAME */}
      <div className="mt-8 w-full px-4 border-l-4 focus-within:border-primary">
        <SecondInput
          label="Name"
          name="name"
          type="text"
          value={name}
          leftLabel={`${name.length} characters`}
          rightLabel="maximum 256 characters"
        />
      </div>
      {/* CUSTOM FIELDS */}

      {customFields.map((field) => {
        const currentField = customValues.find(
          (value) => value.name === field.name
        );
        const textarea = field.type === "multiline";
        return (
          <div
            key={field._id}
            className="mt-8 w-full px-4 border-l-4 focus-within:border-primary"
          >
            <SecondInput
              label={field.name}
              name={field.name}
              type={inputTypes[field.type]}
              textarea={textarea}
              value={currentField?.value}
              leftLabel={
                (field.type === "string" || field.type === "multiline") &&
                `${currentField?.value?.length || 0} characters`
              }
              rightLabel={field.type === "string" && "maximum 256 characters"}
            />
          </div>
        );
      })}

      {/* TAGS */}
      <div className="my-8 w-full px-4 border-l-4 focus-within:border-primary">
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Tags</span>
          </label>
          <input
            type="text"
            placeholder="Type the value and hit the enter"
            className="input input-bordered w-full"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            onKeyDown={handleKeyPress}
          />
        </div>
        <div className="mt-4 flex gap-x-6">
          {tags.map((tag) => {
            return (
              <div
                key={tag}
                className="rounded-md bg-primary text-white flex items-center"
              >
                <span className="py-2 px-4">{tag}</span>
                <button
                  type="button"
                  onClick={() => dispatch(removeTag(tag))}
                  className="px-2 border-l py-2 h-full"
                >
                  <LiaTimesSolid />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Item;
