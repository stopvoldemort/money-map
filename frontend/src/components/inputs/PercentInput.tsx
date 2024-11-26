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
      <InputGroup.Text>{label}</InputGroup.Text>
      <Field
        type="number"
        name={name}
        className="form-control"
        step={step}
      />
      <InputGroup.Text>(%)</InputGroup.Text>
      {infoText && (
        <InfoPopover text={infoText} />
      )}
    </InputGroup>
  );
};

export default PercentInput;
