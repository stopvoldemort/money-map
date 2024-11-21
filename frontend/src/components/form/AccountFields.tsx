import { Row, InputGroup, Form } from 'react-bootstrap';
import { Field, useFormikContext } from 'formik';
import LineGraphWithAnchorsInput from '../inputs/LineGraphWithAnchorsInput';


const AccountFields = ({ index }: { index: number }) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { values } = useFormikContext<any>();
  const fieldsKey = "accounts";

  return (
    <>
      <Row className="mb-4">
        <InputGroup>
          <div className="form-label text-start" id={`account-name-${index}`}>
            {values.accounts[index].name}
          </div>
          <Field
            type="hidden"
            name={`${fieldsKey}.${index}.name`}
          />
          <Field
            type="hidden"
            name={`${fieldsKey}.${index}.account_type`}
          />
        </InputGroup>
        <InputGroup>
          <InputGroup.Text>$</InputGroup.Text>
          <Field
            id={`account-starting-balance-${index}`}
            type="number"
            name={`${fieldsKey}.${index}.starting_balance`}
            as={Form.Control}
          />
        </InputGroup>
        {values.accounts[index].investments.length > 0 && (
          <Field
            name={`${fieldsKey}.${index}.investments`}
            as={LineGraphWithAnchorsInput}
          />)
        }
      </Row>
    </>
  )
}


export default AccountFields;