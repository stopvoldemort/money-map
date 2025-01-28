import { Col, InputGroup, Row } from "react-bootstrap";
import { Field } from "formik";
import DollarInput from "../inputs/DollarInput";
import YearsInput from "../inputs/YearsInput";
import { ACCOUNT_TYPES } from "../../constants";

const TransferFields = ({ index }: { index: number }) => {
  return (
    <>
      <Row className="mt-1">
        <Col>
          <Field
            name={`${TransferFields.fieldsKey}.${index}.name`}
            className="form-control"
            placeholder="Name"
          />
        </Col>
      </Row>
      <Row>
        <Col xs={12} md={6} className="my-2">
          <DollarInput
            name={`${TransferFields.fieldsKey}.${index}.amount`}
            label="Amount"
          />
        </Col>
        <Col xs={12} md={6} className="my-2">
          <Field
            name={`${TransferFields.fieldsKey}.${index}.years`}
            as={YearsInput}
          />
        </Col>
      </Row>
      <Row>
        <Col xs={12} md={6} className="my-2">
          <InputGroup>
            <span className="d-inline-flex align-items-center mx-2">
              From
            </span>
            <Field
              name={`${TransferFields.fieldsKey}.${index}.transfer_from`}
              className="form-control"
              as="select"
            >
              {
                Object.values(ACCOUNT_TYPES).map((accountType) => (
                  <option value={accountType.value} key={`${TransferFields.fieldsKey}.${index}.transfer_from.${accountType.value}`}>{accountType.name}</option>
                ))
              }
            </Field>
          </InputGroup>
        </Col>
        <Col xs={12} md={6} className="my-2">
          <InputGroup>
            <span className="d-inline-flex align-items-center mx-2">
              To
            </span>
            <Field
              name={`${TransferFields.fieldsKey}.${index}.transfer_to`}
              className="form-control"
              as="select"
            >
              {
                Object.values(ACCOUNT_TYPES).map((accountType) => (
                  <option value={accountType.value} key={`${TransferFields.fieldsKey}.${index}.transfer_to.${accountType.value}`}>{accountType.name}</option>
                ))
              }
            </Field>
          </InputGroup>
        </Col>
      </Row>
    </>
  );
};

TransferFields.initialValues = {
  name: "",
  amount: 0,
  years: [],
  transfer_from: ACCOUNT_TYPES.BANK.value,
  transfer_to: ACCOUNT_TYPES.RETIREMENT.value,
};

TransferFields.fieldsKey = "transfers";

export default TransferFields;
