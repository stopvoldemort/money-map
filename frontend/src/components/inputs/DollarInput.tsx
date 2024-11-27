import { Field } from "formik";
import { InputGroup } from "react-bootstrap";
import InfoPopover from "../form/InfoPopover";


const DollarInput = ({ name, label, infoText }: { name: string, label: string, infoText?: string }) => (
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
      style={{ maxWidth: "120px" }}
      min={0}
    />
    {infoText && (
      <InfoPopover text={infoText} />
    )}
  </InputGroup>
);

export default DollarInput;
