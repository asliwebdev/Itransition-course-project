const FormInput = ({
  label,
  name,
  type,
  placeholder,
  defaultValue,
  textarea,
}) => {
  return (
    <div className="form-control">
      <label className="label">
        <span className="label-text font-semibold capitalize">{label}</span>
      </label>
      {textarea ? (
        <textarea
          className="textarea textarea-bordered h-24 bg-transparent placeholder:text-neutral-content"
          name={name}
          placeholder="Description..."
          defaultValue={defaultValue || ""}
        ></textarea>
      ) : (
        <input
          type={type}
          name={name}
          className="input input-bordered bg-transparent placeholder:text-neutral-content"
          placeholder={placeholder || ""}
          defaultValue={defaultValue || ""}
          required
        />
      )}
    </div>
  );
};

export default FormInput;
