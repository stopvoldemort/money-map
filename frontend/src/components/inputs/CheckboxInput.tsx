import { Field } from "formik";
import InfoPopover from "../form/InfoPopover";

const CheckboxInput = ({ label, name, infoText }: { label: string, name: string, infoText?: string }) => {
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
      {infoText && <InfoPopover text={infoText} />}
    </div>
  );
};

export default CheckboxInput;