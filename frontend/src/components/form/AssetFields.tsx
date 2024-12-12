import { Col, Row } from "react-bootstrap";
import { Field } from "formik";
import PercentInput from "../inputs/PercentInput";
import DollarInput from "../inputs/DollarInput";
import NumberInput from "../inputs/NumberInput";
import CollapsibleDetails from "./CollabsibleDetails";

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
      <Row className="my-3" >
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
        </Col>
      </Row>
      <CollapsibleDetails label="Edit sale details">
        <Row className="mt-2">
          <Col>
            <NumberInput
              name={`${AssetFields.fieldsKey}.${index}.sell_on`}
              label="Sell on"
              suffixText="(year)"
              infoText="The year you want to sell the asset. If you don't intend to sell, leave it at 0"
            />
          </Col>
          <Col>
            <DollarInput
              name={`${AssetFields.fieldsKey}.${index}.sales_taxes_amount`}
              label="Sale taxes"
              infoText="The tax bill you will receive when you sell the asset (approximate, in dollars)"
            />
          </Col>
        </Row>
      </CollapsibleDetails>
    </>
  );
};

AssetFields.initialValues = {
  name: "",
  value: 0,
  aagr: 1.5,
  tax_rate: 0.67,
  sell_on: 0,
  sales_taxes_amount: 0.0,
};

AssetFields.fieldsKey = "assets";

export default AssetFields;
