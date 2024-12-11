import { Col, Row, InputGroup } from "react-bootstrap";
import { Field } from "formik";
import { YEARS } from "../../constants";

const SocialSecurityFields = ({ index }: { index: number }) => {
  return (
    <>
      <Row className="my-1">
        <Col>
          <Field
            name={`${SocialSecurityFields.fieldsKey}.${index}.name`}
            className="form-control"
            placeholder="Name"
            id={`income-name-${index}`}
          />
        </Col>
      </Row>
      <Row className="my-1">
        <Col>
          <InputGroup>
            <InputGroup.Text>$</InputGroup.Text>
            <Field
              type="number"
              name={`${SocialSecurityFields.fieldsKey}.${index}.amount`}
              className="form-control"
              placeholder="Annual Amount"
            />
          </InputGroup>
        </Col>
        <Col>
          <InputGroup>
            <span className="d-inline-flex align-items-center mx-2">
              Start collecting at
            </span>
            <Field
              type="number"
              name={`${SocialSecurityFields.fieldsKey}.${index}.from_year`}
              className="form-control"
              style={{ maxWidth: "120px", minWidth: "60px" }}
            />
            <InputGroup.Text>(year)</InputGroup.Text>
          </InputGroup>
        </Col>
      </Row>
    </>
  );
};

SocialSecurityFields.initialValues = {
  name: "",
  amount: 0,
  from_year: YEARS.START + 20,
};

SocialSecurityFields.fieldsKey = "social_security";

export default SocialSecurityFields;
