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
              <Col>
                <InvestmentVehiclesFields index={0} />
              </Col>
              <Col>
                <InvestmentVehiclesFields index={1} />
              </Col>
            </>
          )}
        </FieldArray>
      </Row>
      <Row>
        <Field type="hidden" name="config.first_year" />
        <Col>
          <NumberInput name="config.last_year" label="Simulate until year" suffixText={`max: ${YEARS.END}`} />
        </Col>
      </Row >
      <Row className="my-4">
        <Col>
          <TextInput name="config.state" label="State" infoText="The state in which you pay state income tax. Currently only supports NY." disabled />
        </Col>
        <Col>
          <TextInput name="config.locality" label="Locality" infoText="The locality in which you pay local income tax. Currently only supports NYC." disabled />
        </Col>
      </Row>
      <Row>
        <Col>
          <NumberInput name="config.retirement_withdrawal_year" label="Retirement withdrawal year" infoText="The year you can start withdrawing from your retirement accounts without penalty. For the sake of this simulation, it's assumed that you won't withdraw from your retirement accounts before this year." />
        </Col>
        <Col>
          <PercentInput name="config.unscheduled_debt_interest_rate" label="Unscheduled debt interest rate" infoText="The interest rate on any debt you accumulate as the simulation progresses. For example, if you have an expense or a scheduled debt payment, but not enough money in your accounts to cover it, that will be added to your unscheduled debt." />
        </Col>
      </Row>
    </FieldsContainer>
  </>
}

export default ConfigFields;