import { Col, Row } from 'react-bootstrap';
import { Field, useFormikContext } from 'formik';
import { FormValuesType } from './types';
import PercentInput from '../inputs/PercentInput';


const InvestmentVehiclesFields = ({ index }: { index: number }) => {
  const { values } = useFormikContext<FormValuesType>();
  const fieldsKey = "investment_vehicles";

  return (
    <Row>
      <Field
        type="hidden"
        name={`${fieldsKey}.${index}.name`}
      />
      <Col>
        <PercentInput
          name={`${fieldsKey}.${index}.aagr`}
          label={`${values.investment_vehicles[index].name} AAGR`}
        />
      </Col>
    </Row>
  )
}


export default InvestmentVehiclesFields;