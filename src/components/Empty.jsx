import { useDispatch } from "react-redux";
import emptyCollections from "../assets/empty_collection.svg";
import { toggleCollection } from "../features/collectionSlice";

const Empty = ({ text, btnText }) => {
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
        onClick={() => dispatch(toggleCollection())}
      >
        {btnText}
      </button>
    </div>
  );
};

export default Empty;
