import React from 'react';
import { Formik, Form } from 'formik';
import { Accordion, Button } from 'react-bootstrap';
import ExpenseFields from './ExpenseFields';
import Section from './Section';
import Fields from './Fields';

interface FormComponentProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onUpdate: (data: any) => void;
}

const FormComponent: React.FC<FormComponentProps> = ({ onUpdate }) => {
  const initialValues = {
    expenses: [ExpenseFields.initialValues]
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={async (values) => {
        try {
          onUpdate(values);
        } catch (error) {
          console.error('Error submitting form:', error);
        }
      }}
    >
      {(formik) => (
        <Form onSubmit={formik.handleSubmit}>
          <Accordion>
            <Section title="Expenses">
              <Fields
                name="expenses"
                values={formik.values.expenses}
                initialValues={ExpenseFields.initialValues}
                fieldsComponent={ExpenseFields}
              />
            </Section>
          </Accordion>
          <Button variant="primary" type="submit" className="mt-3">Submit</Button>
        </Form>
      )}
    </Formik>
  );
};

export default FormComponent;