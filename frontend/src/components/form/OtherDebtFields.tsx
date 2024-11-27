import { Col, Row } from "react-bootstrap";
import { Field } from "formik";
import DollarInput from "../inputs/DollarInput";
import PercentInput from "../inputs/PercentInput";

const OtherDebtFields = ({ index }: { index: number }) => {
  return (
    <>
      <Row className="my-1">
        <Col>
          <Field
            name={`${OtherDebtFields.fieldsKey}.${index}.name`}
            className="form-control"
            placeholder="Name"
          />
        </Col>
      </Row>
      <Row className="my-1">
        <Col>
          <DollarInput
            name={`${OtherDebtFields.fieldsKey}.${index}.amount`}
            label="Amount"
          />
        </Col>
        <Col>
          <PercentInput
            name={`${OtherDebtFields.fieldsKey}.${index}.aagr`}
            label="Real interest rate"
            step={0.01}
          />
        </Col>
      </Row>
    </>
  );
};

OtherDebtFields.fieldsKey = "other_debts";

OtherDebtFields.initialValues = {
  name: "",
  amount: 0,
  aagr: 12.5,
};

export default OtherDebtFields;