import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { FieldArray } from 'formik';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Section = ({ values, initialValues, fieldsComponent }: { values: any, initialValues: any, fieldsComponent: React.FC<{ index: number }> }) => {
  const FieldsComponent = fieldsComponent
  return (
    <FieldArray name="expenses">
      {({ push, remove }) => (
        <>
          {values.map((index: number) => (
            <Row key={index} className="mb-3">
              <FieldsComponent index={index} />
              <Col xs="auto">
                <Button
                  variant="danger"
                  onClick={() => remove(index)}
                  size="sm"
                >
                  Remove
                </Button>
              </Col>
            </Row>
          ))}
          <Button
            variant="secondary"
            onClick={() => push(initialValues)}
          >
            Add Expense
          </Button>
        </>
      )}
    </FieldArray>

  );
};

export default Section;
