import { useDispatch, useSelector } from "react-redux";
import { deleteCollection, toggleConfirm } from "../features/collectionSlice";
import { FaCircleInfo } from "react-icons/fa6";

const ConfirmCard = () => {
  const { theme } = useSelector((store) => store.user);
  const { isConfirmOpen, name, collectionId } = useSelector(
    (store) => store.collection
  );
  const dispatch = useDispatch();
  const toggle = () => {
    dispatch(toggleConfirm());
  };
  return (
    <div
      className={`min-h-screen ${
        theme === "myDark" ? "backdrop-blur-sm" : "bg-cardBg"
      } fixed min-w-full inset-0 z-50 ${
        isConfirmOpen ? "visible" : "invisible"
      } transition-all duration-300 flex justify-center items-center`}
      onClick={toggle}
    >
      <div
        className="relative z-50 bg-base-300 w-[90%] h-[60%] max-w-2xl p-6 flex flex-col gap-y-6 rounded-xl max-sm:h-[75%]"
        onClick={(e) => e.stopPropagation()}
      >
        <h4 className="border-b pb-4 font-medium text-xl">Delete Collection</h4>
        <p>
          You are about to delete the collection <strong>{name}</strong>. The
          items, tags or other parts of the application might expect this
          collection to exist, so they might break after the collection is gone.
        </p>
        <p>
          If this collection already have items, you can't delete it. Then you
          should delete items first
        </p>
        <div className="w-full flex items-center p-4 gap-x-4 border bg-neutral rounded-lg">
          <FaCircleInfo className="text-primary" />
          <span>
            Note that the collection can't be restored once it's deleted.
          </span>
        </div>
        <div className="flex justify-end items-center">
          <div className="flex gap-x-6">
            <button
              type="button"
              className="btn btn-neutral text-base-content"
              onClick={toggle}
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-error text-white"
              onClick={() => dispatch(deleteCollection(collectionId))}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmCard;
