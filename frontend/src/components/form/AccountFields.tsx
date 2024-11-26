import { useState } from 'react';
import { Row, InputGroup, Form, Collapse } from 'react-bootstrap';
import { Field, useFormikContext } from 'formik';
import InvestmentsInput from '../inputs/InvestmentsInput';
import { ChevronRight, ChevronDown } from 'react-bootstrap-icons';
import { FormValuesType } from './types';

const AccountFields = ({ index }: { index: number }) => {
  const { values } = useFormikContext<FormValuesType>();
  const fieldsKey = "accounts";
  const [showInvestments, setShowInvestments] = useState(false);

  return (
    <>
      <Row className="mb-4">
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
        <div className="mt-3">
          {values.accounts[index].investments.length > 0 && (
            <div>
              <div
                onClick={() => setShowInvestments(!showInvestments)}
                role="button"
                className="d-flex align-items-center mb-2"
                style={{ cursor: 'pointer' }}
              >
                {showInvestments ? <ChevronDown /> : <ChevronRight />}
                <span className="ms-1 small">Edit investment strategy</span>
              </div>
              <Collapse in={showInvestments}>
                <div>
                  <Field
                    name={`${fieldsKey}.${index}.investments`}
                    as={InvestmentsInput}
                  />
                </div>
              </Collapse>
            </div>
          )}
        </div>
      </Row>
    </>
  )
}


export default AccountFields;