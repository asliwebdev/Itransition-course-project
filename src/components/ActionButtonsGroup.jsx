import { FaLock, FaLockOpen, FaTrashAlt } from "react-icons/fa";

const ActionButtonsGroup = ({ performAction }) => {
  return (
    <div className="flex items-center justify-start gap-x-6">
      <button
        type="button"
        className="btn bg-base-300 text-[#7B8EC8] capitalize"
        onClick={() => performAction("block")}
      >
        <FaLock /> Block
      </button>
      <button
        type="button"
        className="btn bg-base-300 text-[#7B8EC8]"
        onClick={() => performAction("unblock")}
      >
        <FaLockOpen />
      </button>
      <button
        type="button"
        className="btn btn-error text-white"
        onClick={() => performAction("delete")}
      >
        <FaTrashAlt />
      </button>
    </div>
  );
};

export default ActionButtonsGroup;
