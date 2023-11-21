import { useDispatch } from "react-redux";
import emptyCollections from "../assets/empty_collection.svg";
import { toggleCollection } from "../features/collectionSlice";
import { MdAdd } from "react-icons/md";

const Empty = ({ text, btnText, paragraph, toggle }) => {
  const dispatch = useDispatch();
  return (
    <div className="flex flex-col items-center justify-center">
      <img
        src={emptyCollections}
        alt="empty collections"
        className="w-[350px] h-[350px] object-cover"
      />
      <h3 className="font-bold text-2xl mt-8">{text}</h3>
      <button
        type="button"
        className="btn btn-primary text-white mt-8"
        onClick={() => dispatch(toggle())}
      >
        <span className="flex items-center gap-x-2">
          <MdAdd className="text-lg" /> {btnText}
        </span>
      </button>
      {paragraph && <p className="mt-6 max-w-lg text-center">{paragraph}</p>}
    </div>
  );
};

export default Empty;
