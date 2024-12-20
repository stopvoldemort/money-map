import { Field } from "formik";

const CheckboxInput = ({ label, name }: { label: string, name: string }) => {
  return (
    <div className="form-check d-flex gap-2">
      <Field
        type="checkbox"
        name={name}
        className="form-check-input"
        id={name}
      />
      <label className="form-check-label" htmlFor={name}>
        {label}
      </label>
    </div>
  );
};

export default CheckboxInput;