import { Row, InputGroup, Form } from 'react-bootstrap';
import { Field, useFormikContext } from 'formik';
import InvestmentsInput from '../inputs/InvestmentsInput';
import { FormValuesType } from './types';
import CollapsibleDetails from './CollabsibleDetails';


const AccountFields = ({ index }: { index: number }) => {
  const { values } = useFormikContext<FormValuesType>();
  const fieldsKey = "accounts";

  return (
    <>
      <Row className="my-3">
        <InputGroup>
          <div className="form-label text-start" id={`account-name-${index}`} style={{ fontWeight: "500" }}>
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
        <div className="mt-2">
          {values.accounts[index].investments.length > 0 && (
            <CollapsibleDetails label="Edit investment strategy">
              <Field
                name={`${fieldsKey}.${index}.investments`}
                as={InvestmentsInput}
              />
            </CollapsibleDetails>
          )}
        </div>
      </Row >
    </>
  )
}


export default AccountFields;