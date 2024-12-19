import { Field } from "formik";
import { InputGroup } from "react-bootstrap";
import InfoPopover from "../form/InfoPopover";


const DollarInput = ({ name, label, infoText, maxWidth = "120px" }: { name: string, label: string, infoText?: string, maxWidth?: string }) => (
  <InputGroup>
    <span className="d-inline-flex align-items-center mx-2">
      {label}
    </span>
    <InputGroup.Text>$</InputGroup.Text>
    <Field
      type="number"
      name={name}
      className="form-control"
      placeholder="Value"
      style={{ maxWidth: maxWidth, minWidth: "80px" }}
    />
    {infoText && (
      <InfoPopover text={infoText} />
    )}
  </InputGroup>
);

export default DollarInput;
