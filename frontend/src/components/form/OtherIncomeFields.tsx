import { Col, Row, InputGroup } from "react-bootstrap";
import { Field } from "formik";
import YearsInput from "../inputs/YearsInput";
import CollapsibleDetails from "./CollabsibleDetails";
import CheckboxInput from "../inputs/CheckboxInput";

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
      <Row>
        <Col xs={12} md={6} className="my-2">
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
        <Col xs={12} md={6} className="my-2">
          <Field
            name={`${OtherIncomeFields.fieldsKey}.${index}.years`}
            as={YearsInput}
          />
        </Col>
      </Row>
      <CollapsibleDetails label="Edit tax treatment">
        <Row>
          <Col xs={12} md={6} className="my-2">
            <CheckboxInput
              label="Federal Income Tax"
              name={`${OtherIncomeFields.fieldsKey}.${index}.federal_income_tax`}
            />
          </Col>
          <Col xs={12} md={6} className="my-2">
            <CheckboxInput
              label="State Income Tax"
              name={`${OtherIncomeFields.fieldsKey}.${index}.state_income_tax`}
            />
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={6} className="my-2">
            <CheckboxInput
              name={`${OtherIncomeFields.fieldsKey}.${index}.local_income_tax`}
              label="Local Income Tax"
            />
          </Col>
          <Col xs={12} md={6} className="my-2">
            <CheckboxInput
              name={`${OtherIncomeFields.fieldsKey}.${index}.payroll_tax`}
              label="Payroll Tax"
            />
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
