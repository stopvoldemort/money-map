import React from "react";
import { Button } from "react-bootstrap";
import { FieldArray } from "formik";
import FieldsContainer from "./FieldsContainer";
import { IncomeFieldsType, ExpenseFieldsType } from "./types";
const DynamicFields = ({
  name,
  values,
  initialValues,
  fieldsComponent,
}: {
  name: string;
  values: IncomeFieldsType[] | ExpenseFieldsType[];
  initialValues: IncomeFieldsType | ExpenseFieldsType;
  fieldsComponent: React.FC<{ index: number }>;
}) => {
  const FieldsComponent = fieldsComponent;
  return (
    <FieldArray name={name}>
      {({ push, remove }) => (
        <React.Fragment>
          {values.length === 0 && <FieldsContainer>None</FieldsContainer>}
          {values.map((_: unknown, index: number) => (
            <FieldsContainer key={index}>
              <Button
                variant="outline-secondary"
                size="sm"
                className="position-absolute hover-visible rounded-circle"
                style={{
                  top: -10,
                  right: -10,
                  width: "24px",
                  height: "24px",
                  padding: 0,
                  lineHeight: 1,
                }}
                onClick={() => remove(index)}
              >
                ×
              </Button>
              <FieldsComponent index={index} />
            </FieldsContainer>
          ))}
          <div className="text-start">
            <Button
              variant="outline-secondary"
              size="sm"
              className="rounded-circle"
              onClick={() => push(initialValues)}
              style={{ width: "32px", height: "32px", padding: 0 }}
            >
              +
            </Button>
          </div>
        </React.Fragment>
      )}
    </FieldArray>
  );
};

export default DynamicFields;
