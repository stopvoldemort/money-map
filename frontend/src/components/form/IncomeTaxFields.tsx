import { Col, Row } from "react-bootstrap"
import FieldsContainer from "./FieldsContainer";
import DollarInput from "../inputs/DollarInput";
import TaxBracketInput from "../inputs/TaxBracketInput";
import DynamicFields from "./DynamicFields";
import { ConfigFieldsType } from "./types";
import CollapsibleDetails from "./CollabsibleDetails";


const IncomeTaxFields = ({ values }: { values: ConfigFieldsType }) => {
  return <>
    <FieldsContainer>
      <CollapsibleDetails label="State" infoText="The default values are for NY.">
        <Row>
          <Col xs={12} md={6} className="my-2">
            <DollarInput name="config.state_standard_deduction" label="Standard deduction" infoText="The default value is for NY." />
          </Col>
        </Row>
        <Row className="p-2 m-2 bg-white rounded border border-outline-secondary">
          <DynamicFields
            name="config.state_tax_brackets"
            values={values.state_tax_brackets}
            initialValues={TaxBracketInput.initialValues}
            fieldsComponent={TaxBracketInput}
          />
        </Row>
      </CollapsibleDetails>
      <CollapsibleDetails label="Local" infoText="The default values are for NYC.">
        <Row>
          <Col xs={12} md={6} className="my-2">
            <DollarInput name="config.local_standard_deduction" label="Standard deduction" infoText="The default value is for NYC." />
          </Col>
        </Row>
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

export default IncomeTaxFields;