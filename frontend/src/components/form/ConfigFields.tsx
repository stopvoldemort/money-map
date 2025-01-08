import { Col, Row } from "react-bootstrap"
import { Field, FieldArray } from "formik";
import FieldsContainer from "./FieldsContainer";
import InvestmentVehiclesFields from "./InvestmentVehiclesFields";
import { YEARS } from "../../constants";
import NumberInput from "../inputs/NumberInput";
import PercentInput from "../inputs/PercentInput";
import DollarInput from "../inputs/DollarInput";
import TaxBracketInput from "../inputs/TaxBracketInput";
import DynamicFields from "./DynamicFields";
import { ConfigFieldsType } from "./types";
import CollapsibleDetails from "./CollabsibleDetails";


const ConfigFields = ({ values }: { values: ConfigFieldsType }) => {
  return <>
    <h5 className="text-start mx-1">General</h5>
    <FieldsContainer>
      <Row>
        <Field type="hidden" name="config.first_year" />
        <Col xs={12} md={6} className="my-2">
          <NumberInput name="config.last_year" label="Simulate until year" suffixText={`max: ${YEARS.END}`} />
        </Col>
        <Col xs={12} md={6} className="my-2">
          <PercentInput name="config.inflation_rate" label="Inflation rate" infoText="The rate at which prices increase each year. The inflation rate specified here is only used to deflate the value of future debt payments, to ensure that all amounts shown in the simulation are in current dollars." />
        </Col>
      </Row >
      <Row>
        <Col xs={12} md={6} className="my-2">
          <NumberInput name="config.retirement_withdrawal_year" label="Retirement withdrawal year" infoText="The year you can start withdrawing from your retirement accounts without penalty. For the sake of this simulation, it's assumed that you won't withdraw from your retirement accounts before this year." />
        </Col>
        <Col xs={12} md={6} className="my-2">
          <PercentInput name="config.unscheduled_debt_interest_rate" label="Unscheduled debt interest rate" infoText="The interest rate on any debt you accumulate as the simulation progresses. For example, if you have an expense or a scheduled debt payment, but not enough money in your accounts to cover it, that will be added to your unscheduled debt. It will probably be pretty high, like what you'd pay for a credit card." />
        </Col>
      </Row>
      <Row>
        <Col xs={12} md={6} className="my-2">
          <NumberInput name="config.maximum_bank_account_balance" label="Maximum bank balance" infoText="The maximum balance you can have in your bank account. If you exceed this balance at the end of the year, the excess will be transferred to your investment account." />
        </Col>
      </Row>
    </FieldsContainer>

    <h5 className="text-start mx-1">Investment returns</h5>
    <FieldsContainer>
      <Row>
        <FieldArray name="investment_vehicles">
          {() => (
            <>
              <Col xs={12} md={6} className="my-2">
                <InvestmentVehiclesFields index={0} />
              </Col>
              <Col xs={12} md={6} className="my-2">
                <InvestmentVehiclesFields index={1} />
              </Col>
              <Col>
                <InvestmentVehiclesFields index={2} />
              </Col>
            </>
          )}
        </FieldArray>
      </Row>
    </FieldsContainer>

    <h5 className="text-start mx-1">Taxes</h5>
    <FieldsContainer>
      <Row>
        <Col xs={12} md={6} className="my-2">
          <PercentInput name="config.federal_standard_deduction" label="Federal standard deduction" infoText="The standard deduction for federal income tax. The default value is for a married household filing jointly." />
        </Col>
      </Row>
      <CollapsibleDetails label="Federal tax brackets" infoText="The tax brackets for federal income tax. The default values are for a married household filing jointly.">
        <Row className="p-2 m-2 bg-white rounded border border-outline-secondary">
          <DynamicFields
            name="config.federal_tax_brackets"
            values={values.federal_tax_brackets}
            initialValues={TaxBracketInput.initialValues}
            fieldsComponent={TaxBracketInput}
          />
        </Row>
      </CollapsibleDetails>
      <Row>
        <Col xs={12} md={6} className="my-2">
          <DollarInput name="config.state_standard_deduction" label="State standard deduction" infoText="The standard deduction for the state in which you pay state income tax. The default values are for a married household filing jointly in NY." />
        </Col>
      </Row>
      <CollapsibleDetails label="State tax brackets" infoText="The tax brackets for the state in which you pay state income tax. The default values are for a married household filing jointly in NY. You can find your state's tax brackets here: https://taxfoundation.org/data/all/state/state-income-tax-rates-2024/">
        <Row className="p-2 m-2 bg-white rounded border border-outline-secondary">
          <DynamicFields
            name="config.state_tax_brackets"
            values={values.state_tax_brackets}
            initialValues={TaxBracketInput.initialValues}
            fieldsComponent={TaxBracketInput}
          />
        </Row>
      </CollapsibleDetails>
      <Row>
        <Col xs={12} md={6} className="my-2">
          <DollarInput name="config.local_standard_deduction" label="Local standard deduction" infoText="The standard deduction for the locality in which you pay local income tax. The default values are for a married household filing jointly in NYC." />
        </Col>
      </Row>
      <CollapsibleDetails label="Local tax brackets" infoText="The tax brackets for the locality in which you pay local income tax. The default values are for NYC.">
        <Row className="p-2 m-2 bg-white rounded border border-outline-secondary">
          <DynamicFields
            name="config.local_tax_brackets"
            values={values.local_tax_brackets}
            initialValues={TaxBracketInput.initialValues}
            fieldsComponent={TaxBracketInput}
          />
        </Row>
      </CollapsibleDetails>
    </FieldsContainer>
  </>
}

export default ConfigFields;