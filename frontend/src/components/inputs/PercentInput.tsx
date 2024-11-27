import { Field } from "formik";
import { InputGroup } from "react-bootstrap";
import InfoPopover from "../form/InfoPopover";


const PercentInput = ({
  name,
  label,
  step = 0.1,
  infoText,
}: {
  name: string;
  label: string;
  step?: number;
  infoText?: string;
}) => {
  return (
    <InputGroup>
      <span className="d-inline-flex align-items-center mx-2">
        {label}
      </span>
      <Field
        type="number"
        name={name}
        className="form-control"
        step={step}
        max={100}
        min={0}
        style={{ maxWidth: "120px" }}
      />
      <InputGroup.Text>(%)</InputGroup.Text>
      {infoText && (
        <InfoPopover text={infoText} />
      )}
    </InputGroup>
  );
};

export default PercentInput;
