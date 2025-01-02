import { Col, Row } from "react-bootstrap";
import { Field } from "formik";
import DollarInput from "../inputs/DollarInput";
import PercentInput from "../inputs/PercentInput";

const OtherDebtFields = ({ index }: { index: number }) => {
  return (
    <>
      <Row className="my-2">
        <Col>
          <Field
            name={`${OtherDebtFields.fieldsKey}.${index}.name`}
            className="form-control"
            placeholder="Name"
          />
        </Col>
      </Row>
      <Row>
        <Col xs={12} md={6} className="my-2">
          <DollarInput
            name={`${OtherDebtFields.fieldsKey}.${index}.amount`}
            label="Amount"
          />
        </Col>
        <Col xs={12} md={6} className="my-2">
          <PercentInput
            name={`${OtherDebtFields.fieldsKey}.${index}.aagr`}
            label="Interest rate"
            step={0.01}
            infoText="The interest rate on the debt, adjusted for inflation."
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