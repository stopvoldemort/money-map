import { Col, Row } from 'react-bootstrap';
import { Field, useFormikContext } from 'formik';
import { FormValuesType } from './types';
import PercentInput from '../inputs/PercentInput';


const InvestmentVehiclesFields = ({ index }: { index: number }) => {
  const { values } = useFormikContext<FormValuesType>();
  const fieldsKey = "investment_vehicles";

  return (
    <Row className='mb-4'>
      <Field
        type="hidden"
        name={`${fieldsKey}.${index}.name`}
      />
      <Col xs={12} md={4}>
        <PercentInput
          name={`${fieldsKey}.${index}.aagr`}
          label={`${values.investment_vehicles[index].name} AAGR`}
        />
      </Col>
      {/* <Col xs={12} md={4}>
        <PercentInput
          name={`${fieldsKey}.${index}.dynamic_mean`}
          label="Dynamic mean"
          infoText='TODO: Add a description'
        />
      </Col>
      <Col xs={12} md={4}>
        <PercentInput
          name={`${fieldsKey}.${index}.dynamic_std_dev`}
          label="Dynamic SD"
          infoText='TODO: Add a description'
        />
      </Col> */}
    </Row>
  )
}


export default InvestmentVehiclesFields;