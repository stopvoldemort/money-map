import { Col, Row } from "react-bootstrap";
import { Field } from "formik";
import YearsInput from "../inputs/YearsInput";
import CheckboxInput from "../inputs/CheckboxInput";
import DollarInput from "../inputs/DollarInput";

const ExpenseFields = ({ index }: { index: number }) => {
  return (
    <>
      <Row>
        <Col className="my-2">
          <Field
            name={`${ExpenseFields.fieldsKey}.${index}.name`}
            className="form-control"
            placeholder="Name"
            id={`expense-name-${index}`}
          />
        </Col>
      </Row>
      <Row>
        <Col xs={12} md={4} className="my-2">
          <DollarInput
            name={`${ExpenseFields.fieldsKey}.${index}.amount`}
            label="Amount"
          />
        </Col>
        <Col xs={12} md={4} className="my-2">
          <Field
            name={`${ExpenseFields.fieldsKey}.${index}.years`}
            as={YearsInput}
          />
        </Col>
        <Col xs={12} md={4} className="my-2">
          <CheckboxInput
            name={`${ExpenseFields.fieldsKey}.${index}.five_two_nine_eligible`}
            label="529 Eligible"
          />
        </Col>
      </Row>
    </>
  );
};

ExpenseFields.initialValues = {
  name: "",
  amount: 0,
  years: [],
  five_two_nine_eligible: false,
};

ExpenseFields.fieldsKey = "expenses";

export default ExpenseFields;
