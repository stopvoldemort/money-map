import { Col, Row } from "react-bootstrap"
import { FieldArray } from "formik";
import FieldsContainer from "./FieldsContainer";
import InvestmentVehiclesFields from "./InvestmentVehiclesFields";


const InvestmentReturnFields = () => {
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
    </FieldsContainer>
  </>
}

export default InvestmentReturnFields;