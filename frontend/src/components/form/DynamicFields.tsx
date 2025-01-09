import React from "react";
import { Button } from "react-bootstrap";
import { FieldArray } from "formik";
import FieldsContainer from "./FieldsContainer";
import {
  OtherIncomeFieldsType,
  ExpenseFieldsType,
  AssetFieldsType,
  ScheduledDebtFieldsType,
  OtherDebtFieldsType,
  SalaryFieldsType,
  TransferFieldsType,
  AssetPurchaseFieldsType,
  SocialSecurityFieldsType,
  TaxBracketFieldsType,
} from "./types";

const DynamicFields = ({
  name,
  values,
  initialValues,
  fieldsComponent,
}: {
  name: string;
  values: OtherIncomeFieldsType[] | ExpenseFieldsType[] | AssetFieldsType[] | ScheduledDebtFieldsType[] | OtherDebtFieldsType[] | SalaryFieldsType[] | TransferFieldsType[] | AssetPurchaseFieldsType[] | SocialSecurityFieldsType[] | TaxBracketFieldsType[];
  initialValues: OtherIncomeFieldsType | ExpenseFieldsType | AssetFieldsType | ScheduledDebtFieldsType | OtherDebtFieldsType | SalaryFieldsType | TransferFieldsType | AssetPurchaseFieldsType | SocialSecurityFieldsType | TaxBracketFieldsType;
  fieldsComponent: React.FC<{ index: number, name: string }>;
}) => {
  const FieldsComponent = fieldsComponent;
  return (
    <FieldArray name={name}>
      {({ push, remove }) => (
        <React.Fragment>
          {values.map((_: unknown, index: number) => (
            <FieldsContainer key={index}>
              <Button
                variant="outline-danger"
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
              <FieldsComponent index={index} name={name} />
            </FieldsContainer>
          ))}
          <div className="text-start">
            <Button
              variant="outline-primary"
              size="sm"
              className="rounded-circle"
              onClick={() => push(initialValues)}
              style={{ width: "32px", height: "32px", padding: 0 }}
            >
              +
            </Button>
            <span className="text-primary d-inline-flex align-items-center mx-2" style={{ height: "32px" }}>
              Click to add
            </span>
          </div>
        </React.Fragment>
      )}
    </FieldArray>
  );
};

export default DynamicFields;
