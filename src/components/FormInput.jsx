const FormInput = ({label, name, type}) => {
    return (
      <div className="form-control">
        <label className="label capitalize">
         <span className="label-text">{label}</span>
        </label>
        <input type={type} name={name} className="input input-bordered" required/>
      </div>
    )
  }
  
  export default FormInput