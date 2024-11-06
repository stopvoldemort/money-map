import React from 'react';
import { Button, CloseButton, Container } from 'react-bootstrap';
import { FieldArray } from 'formik';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Fields = ({ name, values, initialValues, fieldsComponent }: { name: string, values: any, initialValues: any, fieldsComponent: React.FC<{ index: number }> }) => {
  const FieldsComponent = fieldsComponent
  return (
    <FieldArray name={name}>
      {({ push, remove }) => (
        <React.Fragment >
          {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            values.map((_: any, index: number) => (
              <Container key={index} className="position-relative p-3 mb-3 bg-light rounded" style={{ border: '1px solid #dee2e6' }}>
                <CloseButton
                  className="position-absolute top-0 end-0 m-0"
                  variant="danger"
                  onClick={() => remove(index)}
                />
                <FieldsComponent index={index} />
              </Container>
            ))
          }
          <Button
            variant="primary"
            onClick={() => push(initialValues)}
          >
            Add
          </Button>
        </React.Fragment>
      )}
    </FieldArray>
  );
};

export default Fields;
