import { useDispatch, useSelector } from "react-redux";
import { LiaTimesSolid } from "react-icons/lia";
import { customFields } from "../utils/constants";
import { addField, editField } from "../features/collectionSlice";
import { v4 as uuidv4 } from "uuid";

const AddFieldCard = ({
  isAddFieldOpen,
  isFieldSelected,
  toggleAddField,
  toggleFieldSelected,
  field,
  setField,
  isFieldEditing,
  setIsFieldEditing,
}) => {
  const { theme } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setField({ ...field, name: e.target.value });
  };

  const selectField = (type) => {
    setField(type ? { ...field, type } : { ...field, name: "", type: "" });
    dispatch(toggleFieldSelected());
  };

  const toggle = () => {
    setField({ name: "", type: "", id: "" });
    setIsFieldEditing(false);
    dispatch(toggleAddField());
    setTimeout(() => {
      if (isFieldSelected) {
        dispatch(toggleFieldSelected());
      }
    }, 1000);
  };

  const add = (field) => {
    dispatch(addField({ ...field, id: uuidv4() }));
    setField({ name: "", type: "", id: "" });
  };

  const edit = (field) => {
    dispatch(editField(field));
    setField({ name: "", type: "", id: "" });
    setIsFieldEditing(false);
  };

  if (isFieldSelected) {
    return (
      <div
        className={`min-h-screen ${
          theme === "myDark" ? "backdrop-blur-sm" : "bg-cardBg"
        } fixed min-w-full inset-0 z-50 ${
          isAddFieldOpen ? "visible" : "invisible"
        } transition-all duration-300 flex justify-center items-center`}
        onClick={toggle}
      >
        <div
          className="z-50 bg-base-300 w-[90%] max-w-4xl h-[50%] flex flex-col gap-y-8 rounded-xl sm:w-[50%]"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between border-b px-6 py-4">
            <p className="font-medium">
              Add Field
              <span className="font-normal text-neutral-content ml-4">
                {field.type}
              </span>
            </p>
            <button type="button" onClick={toggle}>
              <LiaTimesSolid />
            </button>
          </div>
          <div className="form-control w-full px-6">
            <label className="label">
              <span className="label-text font-medium">Name</span>
            </label>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full bg-transparent"
              value={field.name}
              onChange={(e) => handleChange(e)}
            />
            <label className="label">
              <span className="label-text-alt text-neutral-content text-base">
                Appears in every item of this collection
              </span>
            </label>
          </div>
          <div className="flex justify-center items-center px-6 sm:justify-end">
            <div className="flex gap-x-6">
              <button
                type="button"
                className="btn btn-neutral text-base-content"
                onClick={() => selectField()}
              >
                Change Field Type
              </button>
              {isFieldEditing ? (
                <button
                  type="button"
                  className="btn btn-primary text-white"
                  onClick={() => edit(field)}
                >
                  Edit
                </button>
              ) : (
                <button
                  type="button"
                  className="btn btn-primary text-white"
                  onClick={() => add(field)}
                >
                  Add
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen ${
        theme === "myDark" ? "backdrop-blur-sm" : "bg-cardBg"
      } fixed min-w-full inset-0 z-50 ${
        isAddFieldOpen ? "visible" : "invisible"
      } transition-all duration-300 flex justify-center items-center`}
      onClick={toggle}
    >
      <div
        className="relative z-50 bg-base-300 w-[90%] h-[80%] flex flex-col gap-y-8 rounded-xl max-w-3xl overflow-auto md:h-[75%]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b px-6 py-4">
          <p className="font-medium">Add new Field</p>
          <button type="button" onClick={toggle}>
            <LiaTimesSolid />
          </button>
        </div>
        <div className="flex flex-wrap gap-6 px-6">
          {customFields.map((field) => {
            const { id, icon, title, text, type } = field;
            return (
              <div
                key={id}
                className="border rounded-md hover:border-primary p-4 cursor-pointer flex flex-1 
                flex-col gap-y-4 sm:min-w-[200px] sm:max-w-[250px]"
                onClick={() => selectField(type)}
              >
                {icon}
                <div>
                  <span className="font-medium">{title}</span>
                  <p className="text-neutral-content">{text}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AddFieldCard;
