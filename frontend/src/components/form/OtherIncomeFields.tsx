import { Col, Row, InputGroup } from "react-bootstrap";
import { Field } from "formik";
import YearsInput from "../inputs/YearsInput";
import CollapsibleDetails from "./CollabsibleDetails";

const OtherIncomeFields = ({ index }: { index: number }) => {
  return (
    <>
      <Row className="my-1">
        <Col>
          <Field
            name={`${OtherIncomeFields.fieldsKey}.${index}.name`}
            className="form-control"
            placeholder="Name"
            id={`income-name-${index}`}
          />
        </Col>
      </Row>
      <Row className="my-1">
        <Col>
          <InputGroup>
            <InputGroup.Text>$</InputGroup.Text>
            <Field
              type="number"
              name={`${OtherIncomeFields.fieldsKey}.${index}.amount`}
              className="form-control"
              placeholder="Annual Amount"
            />
          </InputGroup>
        </Col>
        <Col>
          <Field
            name={`${OtherIncomeFields.fieldsKey}.${index}.years`}
            as={YearsInput}
          />
        </Col>
      </Row>
      <CollapsibleDetails label="Edit tax treatment">
        <Row className="my-1">
          <Col>
            <div className="form-check d-flex gap-2">
              <Field
                type="checkbox"
                name={`${OtherIncomeFields.fieldsKey}.${index}.federal_income_tax`}
                className="form-check-input"
                id={`federal-tax-${index}`}
              />
              <label
                className="form-check-label"
                htmlFor={`federal-tax-${index}`}
              >
                Federal Income Tax
              </label>
            </div>
          </Col>
          <Col>
            <div className="form-check d-flex gap-2">
              <Field
                type="checkbox"
                name={`${OtherIncomeFields.fieldsKey}.${index}.state_income_tax`}
                className="form-check-input"
                id={`state-tax-${index}`}
              />
              <label className="form-check-label" htmlFor={`state-tax-${index}`}>
                State Income Tax
              </label>
            </div>
          </Col>
          <Col>
            <div className="form-check d-flex gap-2">
              <Field
                type="checkbox"
                name={`${OtherIncomeFields.fieldsKey}.${index}.local_income_tax`}
                className="form-check-input"
                id={`local-tax-${index}`}
              />
              <label className="form-check-label" htmlFor={`local-tax-${index}`}>
                Local Income Tax
              </label>
            </div>
          </Col>
          <Col>
            <div className="form-check d-flex gap-2">
              <Field
                type="checkbox"
                name={`${OtherIncomeFields.fieldsKey}.${index}.payroll_tax`}
                className="form-check-input"
                id={`payroll-tax-${index}`}
              />
              <label
                className="form-check-label"
                htmlFor={`payroll-tax-${index}`}
              >
                Payroll Tax
              </label>
            </div>
          </Col>
        </Row>
      </CollapsibleDetails>
    </>
  );
};

OtherIncomeFields.initialValues = {
  name: "",
  amount: 0,
  years: [],
  federal_income_tax: true,
  state_income_tax: true,
  local_income_tax: true,
  payroll_tax: true,
};

OtherIncomeFields.fieldsKey = "other_incomes";

export default OtherIncomeFields;
