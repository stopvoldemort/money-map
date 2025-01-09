import { Row, Col } from "react-bootstrap";
import PercentInput from "./PercentInput";
import DollarInput from "./DollarInput";
const TaxBracketInput = ({ name, index }: { name: string, index: number }) => {
  return <Row>
    <Col xs={12} md={6}>
      <PercentInput
        name={`${name}.${index}.rate`}
        label="Rate"
      />
    </Col>
    <Col xs={12} md={6}>
      <DollarInput
        name={`${name}.${index}.upper_bound`}
        label="Upper bound"
      />
    </Col>
  </Row>;
};

TaxBracketInput.initialValues = {
  upper_bound: 0,
  rate: 0,
};

export default TaxBracketInput;
