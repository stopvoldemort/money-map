import { Col, Row, InputGroup } from "react-bootstrap";
import { Field } from "formik";
import PercentInput from "../inputs/PercentInput";

const AssetFields = ({ index }: { index: number }) => {
  return (
    <>
      <Row className="my-1">
        <Col>
          <Field
            name={`${AssetFields.fieldsKey}.${index}.name`}
            className="form-control"
            placeholder="Name"
          />
        </Col>
        <Col>
          <InputGroup>
            <InputGroup.Text>Value</InputGroup.Text>
            <Field
              type="number"
              name={`${AssetFields.fieldsKey}.${index}.value`}
              className="form-control"
              placeholder="Value"
            />
            <InputGroup.Text>$</InputGroup.Text>
          </InputGroup>
        </Col>
      </Row>
      <Row className="mt-2" >
        <Col>
          <PercentInput
            name={`${AssetFields.fieldsKey}.${index}.aagr`}
            label="AAGR"
            infoText="The real average annual growth rate of the asset"
          /></Col>
        <Col>
          <PercentInput
            name={`${AssetFields.fieldsKey}.${index}.tax_rate`}
            label="Tax rate"
            step={0.01}
          /></Col>
      </Row >
    </>
  );
};

AssetFields.initialValues = {
  name: "",
  value: 0,
  aagr: 2.5,
  tax_rate: 0.67,
};

AssetFields.fieldsKey = "assets";

export default AssetFields;
