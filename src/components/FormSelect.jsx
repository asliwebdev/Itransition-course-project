const FormSelect = ({ list, labelText, name, defaultValue }) => {
  return (
    <div className="form-control w-full max-w-xs">
      <label className="label">
        <span className="label-text font-semibold capitalize">
          {labelText || "Topic"}
        </span>
      </label>
      <select className="select select-bordered bg-transparent" name={name}>
        {list.map((item, index) => {
          return (
            <option
              key={index}
              value={item}
              className="bg-base-300"
              selected={defaultValue === item}
            >
              {item}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default FormSelect;
