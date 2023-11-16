import { useDispatch, useSelector } from "react-redux";
import { toggleCollection } from "../features/collectionSlice";
import { LiaTimesSolid } from "react-icons/lia";
import FormInput from "./FormInput";
import FormSelect from "./FormSelect";
import { Form } from "react-router-dom";

const CollectionCard = ({ isCollectionOpen }) => {
  const { theme } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const toggle = () => {
    dispatch(toggleCollection());
  };

  return (
    <div
      className={`min-h-screen ${
        theme === "myDark" ? "backdrop-blur-sm" : "bg-cardBg"
      } fixed min-w-full inset-0 z-50 ${
        isCollectionOpen ? "visible" : "invisible"
      } transition-all duration-300 flex justify-center items-center`}
      onClick={toggle}
    >
      <Form
        method="POST"
        className="relative z-50 bg-base-300 w-[90%] max-w-4xl h-[85%] p-14 flex flex-col gap-y-8 rounded-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="absolute right-6 top-6"
          onClick={toggle}
        >
          <LiaTimesSolid />
        </button>
        <FormInput
          label="Name"
          name="name"
          type="text"
          placeholder="e.g Books"
        />
        <FormInput
          label="Description"
          name="description"
          type="text"
          textarea
        />
        <div className="flex justify-between items-end">
          <FormSelect
            labelText="Choose a Topic"
            name="topic"
            list={["books", "cars", "coins and currency", "other"]}
          />
          <button type="submit" className="btn btn-primary text-white">
            Create
          </button>
        </div>
      </Form>
    </div>
  );
};

export default CollectionCard;
