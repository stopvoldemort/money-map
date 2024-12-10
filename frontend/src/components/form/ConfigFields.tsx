import { Col, Row } from "react-bootstrap"
import { Field, FieldArray } from "formik";
import FieldsContainer from "./FieldsContainer";
import InvestmentVehiclesFields from "./InvestmentVehiclesFields";
import { YEARS } from "../../constants";
import TextInput from "../inputs/TextInput";
import NumberInput from "../inputs/NumberInput";


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
          <TextInput name="config.state" label="State" infoText="The state you live in (for calculating state income tax). Currently only supports NY." disabled />
        </Col>
        <Col>
          <TextInput name="config.locality" label="Locality" infoText="The locality you live in (for calculating local income tax). Currently only supports NYC." disabled />
        </Col>
      </Row>
    </FieldsContainer>
  </>
}

export default ConfigFields;