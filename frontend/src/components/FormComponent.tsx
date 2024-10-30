import React from 'react';
import { Formik, Form } from 'formik';
import { Accordion, Card, Button } from 'react-bootstrap';
import axios from 'axios';
import WiredField from './WiredField';

interface FormComponentProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onUpdate: (data: any) => void;
}

const FormComponent: React.FC<FormComponentProps> = ({ onUpdate }) => {
    return (
        <Formik
            initialValues={{
                name: '',
                age: '',
                income: '',
                expenses: ''
            }}
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
                        <Card>
                            <Card.Header>
                                <Accordion.Item eventKey="0">
                                    Section 1: Personal Information
                                </Accordion.Item>
                            </Card.Header>
                            <Accordion.Collapse eventKey="0">
                                <Card.Body>
                                    <div className="mb-3">
                                        <label htmlFor="name" className="form-label">Name:</label>
                                        <WiredField
                                            name="name"
                                            type="text"
                                            className="form-control"
                                            formik={formik}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="age" className="form-label">Age:</label>
                                        <WiredField
                                            name="age"
                                            type="number"
                                            className="form-control"
                                            formik={formik}
                                        />
                                    </div>
                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                        <Card>
                            <Card.Header>
                                <Accordion.Item eventKey="1">
                                    Section 2: Financial Information
                                </Accordion.Item>
                            </Card.Header>
                            <Accordion.Collapse eventKey="1">
                                <Card.Body>
                                    <div className="mb-3">
                                        <label htmlFor="income" className="form-label">Income:</label>
                                        <WiredField
                                            name="income"
                                            type="number"
                                            className="form-control"
                                            formik={formik}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="expenses" className="form-label">Expenses:</label>
                                        <WiredField
                                            name="expenses"
                                            type="number"
                                            className="form-control"
                                            formik={formik}
                                        />
                                    </div>
                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                    </Accordion>
                    <Button variant="primary" type="submit" className="mt-3">Submit</Button>
                </Form>
            )}
        </Formik>
    );
};

export default FormComponent;