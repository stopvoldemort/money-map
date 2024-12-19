import { Col, Row } from "react-bootstrap";
import { Field } from "formik";
import DollarInput from "../inputs/DollarInput";
import PercentInput from "../inputs/PercentInput";
import NumberInput from "../inputs/NumberInput";

const ScheduledDebtFields = ({ index }: { index: number }) => {
  return (
    <>
      <Row className="my-2">
        <Col>
          <Field
            name={`${ScheduledDebtFields.fieldsKey}.${index}.name`}
            className="form-control"
            placeholder="Name"
          />
        </Col>
      </Row>
      <Row className="my-1">
        <Col xs={12} md={4} className="my-2">
          <DollarInput
            name={`${ScheduledDebtFields.fieldsKey}.${index}.amount`}
            label="Amount"
            maxWidth="150px"
          />
        </Col>
        <Col xs={12} md={4} className="my-2">
          <PercentInput
            name={`${ScheduledDebtFields.fieldsKey}.${index}.aagr`}
            label="Interest rate"
            step={0.01}
          />
        </Col>
        <Col xs={12} md={4} className="my-2">
          <NumberInput
            name={`${ScheduledDebtFields.fieldsKey}.${index}.remaining_loan_term`}
            label="Remaining years"
          />
        </Col>
      </Row>
    </>
  );
};

ScheduledDebtFields.fieldsKey = "scheduled_debts";

ScheduledDebtFields.initialValues = {
  name: "",
  amount: 0,
  aagr: 6.55,
  remaining_loan_term: 10,
};

export default ScheduledDebtFields;