import { Col, Row, InputGroup } from "react-bootstrap";
import { Field } from "formik";
import { YEARS } from "../../constants";
import DollarInput from "../inputs/DollarInput";
import CollapsibleDetails from "./CollabsibleDetails";

const SalaryFields = ({ index }: { index: number }) => {
  return (
    <>
      <Row className="my-1">
        <Col>
          <Field
            name={`${SalaryFields.fieldsKey}.${index}.name`}
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
              name={`${SalaryFields.fieldsKey}.${index}.amount`}
              className="form-control"
              placeholder="Annual Amount"
            />
          </InputGroup>
        </Col>
        <Col>
          <InputGroup>
            <span className="d-inline-flex align-items-center mx-2">
              From
            </span>
            <Field
              type="number"
              name={`${SalaryFields.fieldsKey}.${index}.from_year`}
              className="form-control"
              max={YEARS.END}
              min={YEARS.START}
              style={{ maxWidth: "120px", minWidth: "60px" }}
            />
            <InputGroup.Text>(year)</InputGroup.Text>
          </InputGroup>
        </Col>
        <Col>
          <InputGroup>
            <span className="d-inline-flex align-items-center mx-2">
              To
            </span>
            <Field
              type="number"
              name={`${SalaryFields.fieldsKey}.${index}.to_year`}
              className="form-control"
              max={YEARS.END}
              min={YEARS.START}
              style={{ maxWidth: "120px", minWidth: "60px" }}
            />
            <InputGroup.Text>(year)</InputGroup.Text>
          </InputGroup>
        </Col>
      </Row>
      <div className="mt-3">
        <CollapsibleDetails label="Retirement contributions">
          <Row>
            <Col>
              <DollarInput
                name={`${SalaryFields.fieldsKey}.${index}.retirement_contribution`}
                label="Employee 401k"
              />
            </Col>
            <Col>
              <DollarInput
                name={`${SalaryFields.fieldsKey}.${index}.roth_contribution`}
                label="Employee Roth 401k"
              />
            </Col>
            <Col>
              <DollarInput
                name={`${SalaryFields.fieldsKey}.${index}.employer_retirement_contribution`}
                label="Employer 401k"
              />
            </Col>
          </Row>
        </CollapsibleDetails>
      </div>
    </>
  );
};

SalaryFields.initialValues = {
  name: "",
  amount: 0,
  from_year: YEARS.START,
  to_year: YEARS.START,
  retirement_contribution: 0,
  roth_contribution: 0,
  employer_retirement_contribution: 0,
};

SalaryFields.fieldsKey = "salaries";

export default SalaryFields;
