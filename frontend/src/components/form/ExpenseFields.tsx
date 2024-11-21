import { Col, Row, InputGroup } from "react-bootstrap";
import { Field } from "formik";
import YearsInput from "../inputs/YearsInput";

const ExpenseFields = ({ index }: { index: number }) => {
  return (
    <>
      <Row className="my-1">
        <Col>
          <Field
            name={`${ExpenseFields.fieldsKey}.${index}.name`}
            className="form-control"
            placeholder="Name"
            id={`expense-name-${index}`}
          />
        </Col>
      </Row>
      <Row className="my-1">
        <Col>
          <InputGroup>
            <InputGroup.Text>$</InputGroup.Text>
            <Field
              type="number"
              name={`${ExpenseFields.fieldsKey}.${index}.amount`}
              className="form-control"
              placeholder="Amount"
            />
          </InputGroup>
        </Col>
        <Col>
          <Field
            name={`${ExpenseFields.fieldsKey}.${index}.years`}
            as={YearsInput}
          />
        </Col>
        <Col>
          <div className="form-check d-flex gap-2">
            <Field
              type="checkbox"
              name={`${ExpenseFields.fieldsKey}.${index}.five_two_nine_eligible`}
              className="form-check-input"
              id={`five-two-nine-${index}`}
            />
            <label
              className="form-check-label"
              htmlFor={`five-two-nine-${index}`}
            >
              529 Eligible
            </label>
          </div>
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
