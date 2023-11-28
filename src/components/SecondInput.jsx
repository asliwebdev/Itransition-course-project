import { useDispatch } from "react-redux";
import { handleChange } from "../features/itemSlice";

const SecondInput = ({
  label,
  name,
  type,
  placeholder,
  textarea,
  value,
  leftLabel,
  rightLabel,
}) => {
  const dispatch = useDispatch();

  return (
    <div className="form-control">
      <label className="label">
        <span className="label-text capitalize">{label}</span>
      </label>
      {textarea ? (
        <textarea
          className="textarea textarea-bordered h-24 bg-transparent placeholder:text-neutral-content"
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={(e) =>
            dispatch(
              handleChange({ name: e.target.name, value: e.target.value })
            )
          }
        ></textarea>
      ) : (
        <input
          type={type}
          name={name}
          className="input input-bordered bg-transparent placeholder:text-neutral-content"
          placeholder={placeholder || ""}
          value={value}
          onChange={(e) =>
            dispatch(
              handleChange({ name: e.target.name, value: e.target.value })
            )
          }
          required
        />
      )}
      <label className="label">
        <span className="label-text-alt text-sm">{leftLabel}</span>
        <span className="label-text-alt text-sm">{rightLabel}</span>
      </label>
    </div>
  );
};

export default SecondInput;
