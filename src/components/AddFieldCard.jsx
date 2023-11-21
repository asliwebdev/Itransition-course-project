import { useDispatch, useSelector } from "react-redux";
import { LiaTimesSolid } from "react-icons/lia";
import { toggleFieldSelected } from "../features/collectionSlice";
import { customFields } from "../utils/constants";

const AddFieldCard = ({ isAddFieldOpen, isFieldSelected, toggleAddField }) => {
  const { theme } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const toggle = () => {
    dispatch(toggleAddField());
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
                Field Type
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
                onClick={() => dispatch(toggleFieldSelected())}
              >
                Change Field Type
              </button>
              <button type="button" className="btn btn-primary text-white">
                Add
              </button>
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
        className="relative z-50 bg-base-300 w-[90%] max-w-4xl h-[75%] flex flex-col gap-y-8 rounded-xl sm:w-[50%]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b px-6 py-4">
          <p className="font-medium">Add Field</p>
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
                className="border rounded-md hover:border-primary flex-1 p-4 cursor-pointer w-40 h-40"
              >
                <span>{icon}</span>
                <span className="font-medium">{title}</span>
                <p className="text-neutral-content">{text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AddFieldCard;
