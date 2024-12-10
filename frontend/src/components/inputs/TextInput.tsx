import { Field } from "formik";
import { InputGroup } from "react-bootstrap";
import InfoPopover from "../form/InfoPopover";


const TextInput = ({
  name,
  label,
  infoText,
  suffixText,
  disabled = false,
}: {
  name: string;
  label: string;
  infoText?: string;
  suffixText?: string;
  disabled?: boolean;
}) => {
  return (
    <InputGroup>
      <span className="d-inline-flex align-items-center mx-2">
        {label}
      </span>
      <Field
        type="text"
        name={name}
        className="form-control"
        style={{ maxWidth: "200px", minWidth: "80px" }}
        disabled={disabled}
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

export default TextInput;
