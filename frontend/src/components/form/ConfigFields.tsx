import { Col, Row } from "react-bootstrap"
import { Field, FieldArray } from "formik";
import FieldsContainer from "./FieldsContainer";
import InvestmentVehiclesFields from "./InvestmentVehiclesFields";
import { YEARS } from "../../constants";
import TextInput from "../inputs/TextInput";


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
          <TextInput name="config.last_year" label="Simulate until year" suffixText={`max: ${YEARS.END}`} />
        </Col>
      </Row >
    </FieldsContainer>
  </>
}

export default ConfigFields;