import React from 'react';
import { Button, Container } from 'react-bootstrap';
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
              <Container key={index} className="p-3 mb-3 bg-light rounded position-relative" style={{ border: '1px solid #dee2e6' }}>
                <Button
                  variant="outline-secondary"
                  size="sm"
                  className="position-absolute hover-visible rounded-circle"
                  style={{
                    top: -10,
                    right: -10,
                    width: '24px',
                    height: '24px',
                    padding: 0,
                    lineHeight: 1
                  }}
                  onClick={() => remove(index)}
                >
                  ×
                </Button>
                <FieldsComponent index={index} />
              </Container>
            ))
          }
          <div className="text-start">
            <Button
              variant="outline-secondary"
              size="sm"
              className="rounded-circle"
              onClick={() => push(initialValues)}
              style={{ width: '32px', height: '32px', padding: 0 }}
            >
              +
            </Button>
          </div>
        </React.Fragment>
      )}
    </FieldArray>
  );
};

export default Fields;
