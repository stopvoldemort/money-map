import { Formik, Form, Field, FieldArray } from "formik";
import { Button, Col, Modal, Form as RBForm, Row } from "react-bootstrap";
import { GettingStartedFormValues } from "./types";
import InfoPopover from "../form/InfoPopover";

const AdultFields = ({ index, personName }: { index: number, personName: string }) => {
  return (
    <Row>
      <Col md={4} xs={12}>
        <RBForm.Group>
          <RBForm.Label>{personName} name</RBForm.Label>
          <Field as={RBForm.Control} name={`adults.${index}.name`} type="text" placeholder="Phyllis" />
        </RBForm.Group>
      </Col>
      <Col md={4} xs={12}>
        <RBForm.Group>
          <RBForm.Label>{personName} age</RBForm.Label>
          <Field as={RBForm.Control} name={`adults.${index}.age`} type="number" placeholder="40" />
        </RBForm.Group>
      </Col>
      <Col md={4} xs={12}>
        <RBForm.Group>
          <RBForm.Label>{personName} annual income ($)</RBForm.Label>
          <Field as={RBForm.Control} name={`adults.${index}.income`} type="number" placeholder="60000" />
        </RBForm.Group>
      </Col>
    </Row>
  )
}

const ChildFields = ({ index, handleRemove }: { index: number, handleRemove: () => void }) => {
  return (
    <Row className="my-2">
      <Col md={4} xs={12}>
        <RBForm.Group>
          <RBForm.Label>Child name</RBForm.Label>
          <Field as={RBForm.Control} name={`children.${index}.name`} type="text" />
        </RBForm.Group>
      </Col>
      <Col md={4} xs={12}>
        <RBForm.Group>
          <RBForm.Label>Child age</RBForm.Label>
          <Field as={RBForm.Control} name={`children.${index}.age`} type="number" />
        </RBForm.Group>
      </Col>
      <Col md={4} xs={12} className="d-flex align-items-center">
        <Button
          variant="outline-danger"
          size="sm"
          className="hover-visible rounded-circle"
          style={{
            width: "24px",
            height: "24px",
            padding: 0,
            lineHeight: 1,
          }}
          onClick={handleRemove}
        >
          ×
        </Button>
      </Col>
    </Row>
  )
}

const GettingStartedForm = ({ closeModal, onSubmit }: { closeModal: () => void, onSubmit: (values: GettingStartedFormValues) => void }) => {
  const initialValues = {
    adults: [
      {
        name: "",
        age: 40,
        income: 60000.0,
      },
      {
        name: "",
        age: 40,
        income: 60000.0,
      }
    ],
    hasPartner: false,
    hasChildren: false,
    children: [{ name: "", age: 0 }],
    annualSpending: 0,
    bankAccounts: 0.0,
    investments: 0.0,
    retirement: 0.0,
    hasHome: false,
    home: {
      value: 500000,
      interestRate: 3.5,
      remainingPrincipal: 350000,
      remainingYears: 25,
    }
  };

  const handleSubmit = (values: typeof initialValues) => {
    onSubmit(values);
    closeModal();
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {({ values, handleChange, handleBlur, handleSubmit }) => (
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <h5>Your family</h5>
            <FieldArray name="adults">
              {() => (
                <>
                  <Row className="my-2">
                    <AdultFields index={0} personName="Your" />
                  </Row>
                  <Row className="my-2 align-items-center">
                    <RBForm.Group controlId="hasPartnerCheckbox">
                      <RBForm.Check
                        type="checkbox"
                        label="I have a partner"
                        name="hasPartner"
                        checked={values.hasPartner}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </RBForm.Group>
                  </Row>
                  {values.hasPartner && (
                    <Row className="my-2">
                      <AdultFields index={1} personName="Partner" />
                    </Row>
                  )}
                </>
              )}
            </FieldArray>
            <Row className="my-2 align-items-center">
              <RBForm.Group controlId="hasChildrenCheckbox">
                <RBForm.Check
                  type="checkbox"
                  label="I have children"
                  name="hasChildren"
                  checked={values.hasChildren}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </RBForm.Group>
            </Row>
            {values.hasChildren && (
              <FieldArray name="children">
                {({ push, remove }) => (
                  <>
                    {values.children.map((_, index) => (
                      <ChildFields key={`child-${index}`} index={index} handleRemove={() => remove(index)} />
                    ))}

                    <Button
                      variant="outline-primary"
                      size="sm"
                      onClick={() => push({ name: "", age: 0 })}
                    >
                      + Add child
                    </Button>
                  </>
                )}
              </FieldArray>
            )}

            <hr />
            <h5>Your finances</h5>

            <Row>
              <Col md={4} xs={12}>
                <RBForm.Group className="mb-3">
                  <RBForm.Label>Bank accounts ($)</RBForm.Label>
                  <Field as={RBForm.Control} name="bankAccounts" type="number" />
                </RBForm.Group>
              </Col>

              <Col md={4} xs={12}>
                <RBForm.Group className="mb-3">
                  <RBForm.Label>Investments ($)</RBForm.Label>
                  <InfoPopover text="How much you have in taxable stocks, bonds, and other investments." />
                  <Field as={RBForm.Control} name="investments" type="number" />
                </RBForm.Group>
              </Col>

              <Col md={4} xs={12}>
                <RBForm.Group className="mb-3">
                  <RBForm.Label>Retirement ($)</RBForm.Label>
                  <InfoPopover text="How much you have in retirement accounts." />
                  <Field as={RBForm.Control} name="retirement" type="number" />
                </RBForm.Group>
              </Col>
            </Row>

            <Row>
              <RBForm.Group className="mb-3">
                <RBForm.Label>Current annual spending (exclude taxes and, if applicable, mortgage payments) ($)</RBForm.Label>
                <Field
                  as={RBForm.Control}
                  name="annualSpending"
                  type="number"
                />
              </RBForm.Group>
            </Row>

            <RBForm.Group controlId="hasHomeCheckbox" className="mb-3">
              <RBForm.Check
                type="checkbox"
                label="I own a home and have a mortgage"
                name="hasHome"
                checked={values.hasHome}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </RBForm.Group>

            {values.hasHome && (
              <>
                <Row className="mb-3">
                  <Col md={6} xs={12}>
                    <RBForm.Group>
                      <RBForm.Label>Home value ($)</RBForm.Label>
                      <Field
                        as={RBForm.Control}
                        name="home.value"
                        type="number"
                      />
                    </RBForm.Group>
                  </Col>

                  <Col md={6} xs={12}>
                    <RBForm.Group>
                      <RBForm.Label>Interest rate (%)</RBForm.Label>
                      <Field
                        as={RBForm.Control}
                        name="home.interestRate"
                        type="number"
                        step="0.01"
                      />
                    </RBForm.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={6} xs={12}>
                    <RBForm.Group>
                      <RBForm.Label>Remaining principal ($)</RBForm.Label>
                      <Field
                        as={RBForm.Control}
                        name="home.remainingPrincipal"
                        type="number"
                      />
                    </RBForm.Group>
                  </Col>

                  <Col md={6} xs={12}>
                    <RBForm.Group>
                      <RBForm.Label>Remaining years</RBForm.Label>
                      <Field
                        as={RBForm.Control}
                        name="home.remainingYears"
                        type="number"
                      />
                    </RBForm.Group>
                  </Col>
                </Row>
              </>
            )}
          </Modal.Body >

          <Modal.Footer>
            <Button variant="secondary" onClick={closeModal}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Modal.Footer>
        </Form >
      )}
    </Formik >
  );
};

export default GettingStartedForm;
