import { Col, Row, InputGroup } from 'react-bootstrap';
import { Field } from 'formik';
import YearGrid from './YearComponent/YearGrid';

// TODO: Need to link to an account
const IncomeFields = ({ index }: { index: number }) => {
  return (
    <>
      <Row className="my-1">
        <Col>
          <Field
            name={`${IncomeFields.fieldsKey}.${index}.name`}
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
              name={`${IncomeFields.fieldsKey}.${index}.amount`}
              className="form-control"
              placeholder="Annual Amount"
            />
          </InputGroup>
        </Col>
        <Col>
          <Field
            name={`${IncomeFields.fieldsKey}.${index}.years`}
            as={YearGrid}
          />
        </Col>
      </Row>
      <Row className="my-1">
        <Col>
          <div className="form-check d-flex gap-2">
            <Field
              type="checkbox"
              name={`${IncomeFields.fieldsKey}.${index}.federal_income_tax`}
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
              name={`${IncomeFields.fieldsKey}.${index}.ny_income_tax`}
              className="form-check-input"
              id={`ny-tax-${index}`}
            />
            <label
              className="form-check-label"
              htmlFor={`ny-tax-${index}`}
            >
              NY Income Tax
            </label>
          </div>
        </Col>
        <Col>
          <div className="form-check d-flex gap-2">
            <Field
              type="checkbox"
              name={`${IncomeFields.fieldsKey}.${index}.nyc_income_tax`}
              className="form-check-input"
              id={`nyc-tax-${index}`}
            />
            <label
              className="form-check-label"
              htmlFor={`nyc-tax-${index}`}
            >
              NYC Income Tax
            </label>
          </div>
        </Col>
        <Col>
          <div className="form-check d-flex gap-2">
            <Field
              type="checkbox"
              name={`${IncomeFields.fieldsKey}.${index}.payroll_tax`}
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
    </>
  )
}

IncomeFields.initialValues = {
  name: '',
  amount: 0,
  years: '2024-2070',
  federal_income_tax: true,
  ny_income_tax: true,
  nyc_income_tax: true,
  payroll_tax: true,
}

IncomeFields.fieldsKey = 'incomes';

export default IncomeFields;