import { Col, Row, InputGroup } from "react-bootstrap";
import { Field } from "formik";
import YearsInput from "../inputs/YearsInput";
import CollapsibleDetails from "./CollabsibleDetails";
import CheckboxInput from "../inputs/CheckboxInput";
import { ACCOUNT_TYPES } from "../../constants";

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
        <Col xs={12} md={4} className="my-2">
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
        <Col xs={12} md={4} className="my-2">
          <Field
            name={`${OtherIncomeFields.fieldsKey}.${index}.years`}
            as={YearsInput}
          />
        </Col>
        <Col xs={12} md={4} className="my-2">
          <InputGroup>
            <span className="d-inline-flex align-items-center mx-2">
              Deposit in
            </span>
            <Field
              name={`${OtherIncomeFields.fieldsKey}.${index}.deposit_in`}
              className="form-control"
              as="select"
            >
              {
                Object.values(ACCOUNT_TYPES).map((accountType) => (
                  <option value={accountType.value} key={`${OtherIncomeFields.fieldsKey}.${index}.deposit_in.${accountType.value}`}>{accountType.name}</option>
                ))
              }
            </Field>
          </InputGroup>
        </Col>
      </Row>
      <CollapsibleDetails label="Edit tax treatment">
        <Row>
          <Col xs={12} md={6} className="my-2">
            <CheckboxInput
              label="Federal income tax"
              name={`${OtherIncomeFields.fieldsKey}.${index}.federal_income_tax`}
            />
          </Col>
          <Col xs={12} md={6} className="my-2">
            <CheckboxInput
              label="State income tax"
              name={`${OtherIncomeFields.fieldsKey}.${index}.state_income_tax`}
            />
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={6} className="my-2">
            <CheckboxInput
              name={`${OtherIncomeFields.fieldsKey}.${index}.local_income_tax`}
              label="Local income tax"
            />
          </Col>
          <Col xs={12} md={6} className="my-2">
            <CheckboxInput
              name={`${OtherIncomeFields.fieldsKey}.${index}.payroll_tax`}
              label="Payroll tax"
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
  deposit_in: ACCOUNT_TYPES.BANK.value,
  federal_income_tax: true,
  state_income_tax: true,
  local_income_tax: true,
  payroll_tax: true,
};

OtherIncomeFields.fieldsKey = "other_incomes";

export default OtherIncomeFields;
