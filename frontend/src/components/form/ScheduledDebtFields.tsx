import { Col, InputGroup, Row } from "react-bootstrap";
import { Field } from "formik";
import DollarInput from "../inputs/DollarInput";
import PercentInput from "../inputs/PercentInput";

const ScheduledDebtFields = ({ index }: { index: number }) => {
  return (
    <>
      <Row className="my-1">
        <Col>
          <Field
            name={`${ScheduledDebtFields.fieldsKey}.${index}.name`}
            className="form-control"
            placeholder="Name"
          />
        </Col>
      </Row>
      <Row className="my-1">
        <Col>
          <DollarInput
            name={`${ScheduledDebtFields.fieldsKey}.${index}.amount`}
            label="Amount"
          />
        </Col>
        <Col>
          <PercentInput
            name={`${ScheduledDebtFields.fieldsKey}.${index}.aagr`}
            label="Real Interest Rate"
            step={0.01}
          />
        </Col>
        <Col>
          <InputGroup>
            <span className="d-inline-flex align-items-center mx-2">
              Remaining Loan Term
            </span>
            <Field
              type="number"
              name={`${ScheduledDebtFields.fieldsKey}.${index}.remaining_loan_term`}
              className="form-control"
              max={100}
              min={0}
              style={{ maxWidth: "120px", minWidth: "60px" }}
            />
            <InputGroup.Text>(years)</InputGroup.Text>
          </InputGroup>
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