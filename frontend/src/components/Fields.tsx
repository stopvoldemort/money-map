import React from 'react';
import { Row, Col, Button, Container } from 'react-bootstrap';
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
              <Container key={index} className="p-3 mb-3 bg-light rounded" style={{ border: '1px solid #dee2e6' }}>
                <Row>
                  <FieldsComponent index={index} />
                  <Col xs="auto" className="ms-auto">
                    <Button
                      variant="danger"
                      onClick={() => remove(index)}
                      size="sm"
                    >
                      Remove
                    </Button>
                  </Col>
                </Row>
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
