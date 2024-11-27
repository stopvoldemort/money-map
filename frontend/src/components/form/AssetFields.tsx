import { Col, Row } from "react-bootstrap";
import { Field } from "formik";
import PercentInput from "../inputs/PercentInput";
import DollarInput from "../inputs/DollarInput";

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
      </Row>
      <Row className="mt-2" >
        <Col>
          <DollarInput
            name={`${AssetFields.fieldsKey}.${index}.value`}
            label="Value"
            infoText="The current value of the asset"
          />
        </Col>
        <Col>
          <PercentInput
            name={`${AssetFields.fieldsKey}.${index}.aagr`}
            label="AAGR"
            infoText="How much you expect the asset's value to grow each year"
          /></Col>
        <Col>
          <PercentInput
            name={`${AssetFields.fieldsKey}.${index}.tax_rate`}
            label="Tax rate"
            step={0.01}
            infoText="For example, property taxes"
          />
          {/* TODO: ADD INSURANCE FIELD */}
        </Col>
      </Row >
    </>
  );
};

AssetFields.initialValues = {
  name: "",
  value: 0,
  aagr: 1.5,
  tax_rate: 0.67,
};

AssetFields.fieldsKey = "assets";

export default AssetFields;
