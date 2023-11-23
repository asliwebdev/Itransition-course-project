import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AddFieldCard, Empty } from "../components";
import {
  toggleAddField,
  toggleFieldSelected,
} from "../features/collectionSlice";
import { customFields } from "../utils/constants";
import { BsThreeDots } from "react-icons/bs";
import { MdAdd, MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

const Fields = () => {
  const { fields, isAddFieldOpen, isFieldSelected } = useSelector(
    (store) => store.collection
  );
  const { theme } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const [field, setField] = useState({
    name: "",
    type: "",
    id: "",
  });
  const [isFieldEditing, setIsFieldEditing] = useState(false);

  const edit = (field) => {
    setIsFieldEditing(true);
    setField(field);
    dispatch(toggleFieldSelected());
    dispatch(toggleAddField());
  };

  if (fields.length === 0) {
    return (
      <>
        <Empty
          text="Custom fields don't added yet"
          btnText="Add Field"
          paragraph="The field type defines what content can be stored. For instance, a text field accepts titles and descriptions, and a number field is used for numeric values."
          toggle={toggleAddField}
        />
        <AddFieldCard
          isAddFieldOpen={isAddFieldOpen}
          isFieldSelected={isFieldSelected}
          toggleAddField={toggleAddField}
          toggleFieldSelected={toggleFieldSelected}
          field={field}
          setField={setField}
          isFieldEditing={isFieldEditing}
          setIsFieldEditing={setIsFieldEditing}
        />
      </>
    );
  }

  return (
    <>
      <div className="flex flex-col justify-center items-center w-[90%]">
        <div className="flex justify-between items-center w-full">
          <h1 className="font-bold text-3xl leading-[42px]">Fields</h1>
          <button type="button" className="btn btn-primary text-white">
            save
          </button>
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
                  <span className="responsive-text">Name</span>
                </th>
                <th>
                  <span className="responsive-text">Field Type</span>
                </th>
                <th>
                  <span className="responsive-text">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {fields?.map((field) => {
                const { name, type, id } = field;
                const tempField = customFields.find(
                  (item) => item.type === type
                );
                return (
                  <tr
                    key={id}
                    className={`border-t ${
                      theme === "myDark"
                        ? "border-tableDarkBr"
                        : "border-tableLightBr"
                    } ${
                      theme === "myDark"
                        ? "hover:bg-tableDarkHover/50"
                        : "hover:bg-tableLightHover/50"
                    }`}
                  >
                    <td>
                      <span className="font-medium">{name}</span>
                    </td>
                    <td>
                      <div className="flex gap-x-4 items-center">
                        <span>
                          {React.cloneElement(tempField.icon, {
                            className: "text-xl",
                          })}
                        </span>
                        <span>{tempField.title}</span>
                      </div>
                    </td>
                    <td>
                      <div className="dropdown dropdown-top">
                        <label tabIndex={0} className="btn m-1">
                          <BsThreeDots />
                        </label>
                        <ul
                          tabIndex={0}
                          className="dropdown-content z-[1] menu p-2 shadow bg-secondary rounded-box w-28"
                        >
                          <li onClick={() => edit(field)}>
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
                <td colSpan={3}>
                  <button
                    className="flex gap-x-2 justify-center items-center font-medium w-full"
                    onClick={() => dispatch(toggleAddField())}
                  >
                    <MdAdd className="text-lg" /> Add Field
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <AddFieldCard
        isAddFieldOpen={isAddFieldOpen}
        isFieldSelected={isFieldSelected}
        toggleAddField={toggleAddField}
        toggleFieldSelected={toggleFieldSelected}
        field={field}
        setField={setField}
        isFieldEditing={isFieldEditing}
        setIsFieldEditing={setIsFieldEditing}
      />
    </>
  );
};

export default Fields;
