import { Field } from "formik";
import { InputGroup } from "react-bootstrap";
import InfoPopover from "../form/InfoPopover";


const NumberInput = ({
  name,
  label,
  infoText,
  suffixText,
}: {
  name: string;
  label: string;
  infoText?: string;
  suffixText?: string;
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
        style={{ maxWidth: "200px", minWidth: "80px" }}
      />
      {suffixText && (
        <InputGroup.Text>{suffixText}</InputGroup.Text>
      )}
      {infoText && (
        <InfoPopover text={infoText} />
      )}
    </InputGroup>
  );
};

export default NumberInput;
