import { Col, Row, InputGroup } from "react-bootstrap";
import { Field } from "formik";
import PercentInput from "../inputs/PercentInput";
import DollarInput from "../inputs/DollarInput";
import { YEARS } from "../../constants";
import CollapsibleDetails from "./CollabsibleDetails";

const AssetPurchaseFields = ({ index }: { index: number }) => {
  return (
    <>
      <Row className="my-1">
        <Col>
          <Field
            name={`${AssetPurchaseFields.fieldsKey}.${index}.name`}
            className="form-control"
            placeholder="Name"
          />
        </Col>
      </Row>
      <Row className="my-2" >
        <Col>
          <DollarInput
            name={`${AssetPurchaseFields.fieldsKey}.${index}.price`}
            label="Price"
          />
        </Col>
        <Col>
          <PercentInput
            name={`${AssetPurchaseFields.fieldsKey}.${index}.interest_rate`}
            label="Interest rate"
          />
        </Col>
        <Col>
          <PercentInput
            name={`${AssetPurchaseFields.fieldsKey}.${index}.down_payment_proportion`}
            label="Down payment"
          />
        </Col>
      </Row>
      <CollapsibleDetails label="Edit details">
        <Row className="mt-2">
          <Col>
            <InputGroup>
              <span className="d-inline-flex align-items-center mx-2">
                Loan term
              </span>
              <Field
                type="number"
                name={`${AssetPurchaseFields.fieldsKey}.${index}.loan_term_years`}
                className="form-control"
                max={100}
                min={0}
                style={{ maxWidth: "120px", minWidth: "60px" }}
              />
              <InputGroup.Text>(years)</InputGroup.Text>
            </InputGroup>
          </Col>
          <Col>
            <PercentInput
              name={`${AssetPurchaseFields.fieldsKey}.${index}.closing_costs_proportion`}
              label="Closing costs"
            />
          </Col>
          <Col>
            <PercentInput
              name={`${AssetPurchaseFields.fieldsKey}.${index}.annual_insurance_rate`}
              label="Annual insurance rate"
              step={0.01}
              infoText="For example, the cost of homeowner's insurance"
            />
          </Col>
        </Row >
        <Row className="mt-2">
          <Col>
            <DollarInput
              name={`${AssetPurchaseFields.fieldsKey}.${index}.annual_upkeep_cost`}
              label="Annual upkeep cost"
              infoText="For example, the cost of maintenance"
            />
          </Col>
          <Col>
            <PercentInput
              name={`${AssetPurchaseFields.fieldsKey}.${index}.property_tax_rate`}
              label="Tax rate"
              step={0.01}
              infoText="Likely only applicable if the asset is subject to property taxes."
            />
          </Col>
          <Col>
            {/* TODO: Let assets depreciate */}
            <PercentInput
              name={`${AssetPurchaseFields.fieldsKey}.${index}.aagr`}
              label="Annual appreciation"
              infoText="How much you expect the asset to appreciate each year (adjusted for inflation)"
            />
          </Col>
        </Row >
      </CollapsibleDetails>
    </>
  );
};

AssetPurchaseFields.initialValues = {
  name: "",
  price: 0,
  interest_rate: 6.5,
  year_of_purchase: YEARS.START,
  aagr: 1.0,
  loan_term_years: 30,
  down_payment_proportion: 20.0,
  property_tax_rate: 0.67,
  annual_insurance_rate: 0.55,
  annual_upkeep_cost: 5000,
  closing_costs_proportion: 4.0,
};

AssetPurchaseFields.fieldsKey = "house_purchases";

export default AssetPurchaseFields;
