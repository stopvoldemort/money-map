import React from 'react';
import { Formik, Form } from 'formik';
import { Accordion, Button } from 'react-bootstrap';
import ExpenseFields from './ExpenseFields';
import axios from 'axios';
import Section from './Section';
import Fields from './Fields';

interface FormComponentProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onUpdate: (data: any) => void;
}

const FormComponent: React.FC<FormComponentProps> = ({ onUpdate }) => {
  const initialValues = {
    expenses: [{
      name: '',
      amount: 0,
      years: '',
      five_two_nine_eligible: false,
    }]
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={async (values) => {
        try {
          const response = await axios.post('https://dummyurl.com/submit', values);
          onUpdate(response.data);
        } catch (error) {
          console.error('Error submitting form:', error);
        }
      }}
    >
      {(formik) => (
        <Form onSubmit={formik.handleSubmit}>
          <Accordion defaultActiveKey="0">
            <Section title="Expenses">
              <Fields values={formik.values.expenses} initialValues={ExpenseFields.initialValues} fieldsComponent={ExpenseFields} />
            </Section>
          </Accordion>
          <Button variant="primary" type="submit" className="mt-3">Submit</Button>
        </Form>
      )}
    </Formik>
  );
};

export default FormComponent;