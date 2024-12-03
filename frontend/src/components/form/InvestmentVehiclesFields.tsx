import { Col, InputGroup, Row } from 'react-bootstrap';
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
      <Col xs={12}>
        <InputGroup>
          <div className="form-label text-start" id={`account-name-${index}`} style={{ fontWeight: "500" }}>
            {values.investment_vehicles[index].name}
          </div>
        </InputGroup>
      </Col>
      <Col xs={12} md={4}>
        <PercentInput
          name={`${fieldsKey}.${index}.aagr`}
          label="AAGR"
        />
      </Col>
      <Col xs={12} md={4}>
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
      </Col>
    </Row>
  )
}


export default InvestmentVehiclesFields;