import { Col, Row } from "react-bootstrap";
import { Field } from "formik";
import PercentInput from "../inputs/PercentInput";
import DollarInput from "../inputs/DollarInput";
import { YEARS } from "../../constants";
import CollapsibleDetails from "./CollabsibleDetails";
import NumberInput from "../inputs/NumberInput";

const HousePurchaseFields = ({ index }: { index: number }) => {
  return (
    <>
      <Row>
        <Col xs={12} md={8} className="my-2">
          <Field
            name={`${HousePurchaseFields.fieldsKey}.${index}.name`}
            className="form-control"
            placeholder="Name"
          />
        </Col>
        <Col xs={12} md={4} className="my-2">
          <NumberInput
            name={`${HousePurchaseFields.fieldsKey}.${index}.year_of_purchase`}
            label="Year of purchase"
          />
        </Col>
      </Row>
      <Row>
        <Col xs={12} md={4} className="my-2">
          <DollarInput
            name={`${HousePurchaseFields.fieldsKey}.${index}.price`}
            label="Price"
          />
        </Col>
        <Col xs={12} md={4} className="my-2">
          <PercentInput
            name={`${HousePurchaseFields.fieldsKey}.${index}.interest_rate`}
            label="Interest rate"
          />
        </Col>
        <Col xs={12} md={4} className="my-2">
          <PercentInput
            name={`${HousePurchaseFields.fieldsKey}.${index}.down_payment_proportion`}
            label="Down payment"
          />
        </Col>
      </Row>
      <CollapsibleDetails label="Edit details">
        <Row>
          <Col xs={12} md={4} className="my-2">
            <NumberInput
              name={`${HousePurchaseFields.fieldsKey}.${index}.loan_term_years`}
              label="Loan term"
              maxWidth="120px"
              suffixText="(years)"
            />
          </Col>
          <Col xs={12} md={4} className="my-2">
            <PercentInput
              name={`${HousePurchaseFields.fieldsKey}.${index}.closing_costs_proportion`}
              label="Closing costs"
            />
          </Col>
          <Col xs={12} md={4} className="my-2">
            <PercentInput
              name={`${HousePurchaseFields.fieldsKey}.${index}.annual_insurance_rate`}
              label="Insurance rate"
              step={0.01}
              infoText="The annual cost of homeowner's insurance"
            />
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={4} className="my-2">
            <DollarInput
              name={`${HousePurchaseFields.fieldsKey}.${index}.annual_upkeep_cost`}
              label="Annual upkeep cost"
              infoText="For example, the cost of maintenance, or condo fees."
            />
          </Col>
          <Col xs={12} md={4} className="my-2">
            <PercentInput
              name={`${HousePurchaseFields.fieldsKey}.${index}.property_tax_rate`}
              label="Tax rate"
              step={0.01}
            />
          </Col>
          <Col xs={12} md={4} className="my-2">
            <PercentInput
              name={`${HousePurchaseFields.fieldsKey}.${index}.aagr`}
              label="Annual appreciation"
              infoText="How much you expect the asset to appreciate each year (adjusted for inflation)"
            />
          </Col>
        </Row >
      </CollapsibleDetails>
    </>
  );
};

HousePurchaseFields.initialValues = {
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

HousePurchaseFields.fieldsKey = "house_purchases";

export default HousePurchaseFields;
