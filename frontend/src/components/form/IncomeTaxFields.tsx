import { Col, Row } from "react-bootstrap"
import FieldsContainer from "./FieldsContainer";
import PercentInput from "../inputs/PercentInput";
import DollarInput from "../inputs/DollarInput";
import TaxBracketInput from "../inputs/TaxBracketInput";
import DynamicFields from "./DynamicFields";
import { ConfigFieldsType } from "./types";
import CollapsibleDetails from "./CollabsibleDetails";


const IncomeTaxFields = ({ values }: { values: ConfigFieldsType }) => {
  return <>
    <FieldsContainer>
      <Row>
        <Col xs={12} md={6} className="my-2">
          <PercentInput name="config.federal_standard_deduction" label="Federal standard deduction" />
        </Col>
      </Row>
      <CollapsibleDetails label="Federal income tax brackets">
        <Row className="p-2 m-2 bg-white rounded border border-outline-secondary">
          <DynamicFields
            name="config.federal_tax_brackets"
            values={values.federal_tax_brackets}
            initialValues={TaxBracketInput.initialValues}
            fieldsComponent={TaxBracketInput}
          />
        </Row>
      </CollapsibleDetails>
      <Row>
        <Col xs={12} md={6} className="my-2">
          <DollarInput name="config.state_standard_deduction" label="State standard deduction" infoText="The default value is for NY." />
        </Col>
      </Row>
      <CollapsibleDetails label="State income tax brackets" infoText="The default values are for NY.">
        <Row className="p-2 m-2 bg-white rounded border border-outline-secondary">
          <DynamicFields
            name="config.state_tax_brackets"
            values={values.state_tax_brackets}
            initialValues={TaxBracketInput.initialValues}
            fieldsComponent={TaxBracketInput}
          />
        </Row>
      </CollapsibleDetails>
      <Row>
        <Col xs={12} md={6} className="my-2">
          <DollarInput name="config.local_standard_deduction" label="Local standard deduction" infoText="The default value is for NYC." />
        </Col>
      </Row>
      <CollapsibleDetails label="Local income tax brackets" infoText="The default values are for NYC.">
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