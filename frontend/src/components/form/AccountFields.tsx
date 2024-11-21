import { useState } from 'react';
import { Row, InputGroup, Form, Collapse } from 'react-bootstrap';
import { Field, useFormikContext } from 'formik';
import LineGraphWithAnchorsInput from '../inputs/LineGraphWithAnchorsInput';
import { ChevronRight, ChevronDown } from 'react-bootstrap-icons';


const AccountFields = ({ index }: { index: number }) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { values } = useFormikContext<any>();
  const fieldsKey = "accounts";
  const [open, setOpen] = useState(false);

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
        <div className="mt-3">
          {values.accounts[index].investments.length > 0 && (
            <div>
              <div
                onClick={() => setOpen(!open)}
                role="button"
                className="d-flex align-items-center mb-2"
                style={{ cursor: 'pointer' }}
              >
                {open ? <ChevronDown /> : <ChevronRight />}
                <span className="ms-1 small">Edit investment strategy</span>
              </div>
              <Collapse in={open}>
                <div>
                  <Field
                    name={`${fieldsKey}.${index}.investments`}
                    as={LineGraphWithAnchorsInput}
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