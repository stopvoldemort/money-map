import { Col } from 'react-bootstrap';
import { Field } from 'formik';

const ExpenseFields = ({ index }: { index: number }) => {
  return (
    <>
      <Col>
        <Field
          name={`${ExpenseFields.fieldsKey}.${index}.name`}
          className="form-control"
          placeholder="Expense Name"
        />
      </Col>
      <Col>
        <Field
          type="number"
          name={`${ExpenseFields.fieldsKey}.${index}.amount`}
          className="form-control"
          placeholder="Amount"
        />
      </Col>
      <Col>
        <Field
          name={`${ExpenseFields.fieldsKey}.${index}.years`}
          className="form-control"
          placeholder="e.g., 2024-2030 or 2024, 2025"
        />
      </Col>
      <Col>
        <div className="form-check">
          <Field
            type="checkbox"
            name={`${ExpenseFields.fieldsKey}.${index}.five_two_nine_eligible`}
            className="form-check-input"
          />
          <label className="form-check-label">
            529 Eligible
          </label>
        </div>
      </Col>
    </>
  )
}

ExpenseFields.initialValues = {
  name: '',
  amount: 0,
  years: '',
  five_two_nine_eligible: false,
}

ExpenseFields.fieldsKey = 'expenses';

export default ExpenseFields;