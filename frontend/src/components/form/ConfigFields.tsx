import { Col, Row } from "react-bootstrap"
import { Field, FieldArray } from "formik";
import FieldsContainer from "./FieldsContainer";
import InvestmentVehiclesFields from "./InvestmentVehiclesFields";
import { YEARS } from "../../constants";
import TextInput from "../inputs/TextInput";
import NumberInput from "../inputs/NumberInput";
import PercentInput from "../inputs/PercentInput";


const ConfigFields = () => {
  return <>
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
          <TextInput name="config.state" label="State" infoText="The state in which you pay state income tax. Currently only supports NY." disabled />
        </Col>
        <Col xs={12} md={6} className="my-2">
          <TextInput name="config.locality" label="Locality" infoText="The locality in which you pay local income tax. Currently only supports NYC." disabled />
        </Col>
      </Row>
      <Row>
        <Col xs={12} md={6} className="my-2">
          <NumberInput name="config.retirement_withdrawal_year" label="Retirement withdrawal year" infoText="The year you can start withdrawing from your retirement accounts without penalty. For the sake of this simulation, it's assumed that you won't withdraw from your retirement accounts before this year." />
        </Col>
        <Col xs={12} md={6} className="my-2">
          <PercentInput name="config.unscheduled_debt_interest_rate" label="Unscheduled debt interest rate" infoText="The interest rate on any debt you accumulate as the simulation progresses. For example, if you have an expense or a scheduled debt payment, but not enough money in your accounts to cover it, that will be added to your unscheduled debt." />
        </Col>
      </Row>
      <Row>
        <Col xs={12} md={6} className="my-2">
          <NumberInput name="config.maximum_bank_account_balance" label="Maximum bank balance" infoText="The maximum balance you can have in your bank account. If you exceed this balance at the end of the year, the excess will be transferred to your investment account." />
        </Col>
      </Row>
    </FieldsContainer>
  </>
}

export default ConfigFields;