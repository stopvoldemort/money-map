import React from "react";
import { Formik, Form } from "formik";
import { Accordion, Button } from "react-bootstrap";
import ExpenseFields from "./ExpenseFields";
import IncomeFields from "./IncomeFields";
import Section from "./Section";
import DynamicFields from "./DynamicFields";
import { ACCOUNT_TYPES, YEARS } from "../constants";
import Accounts from "./Accounts";
import LineGraphWithAnchorsInput from "./LineGraphWithAnchorsInput";
interface FormComponentProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onUpdate: (data: any) => void;
}

const FormComponent: React.FC<FormComponentProps> = ({ onUpdate }) => {
  const initialValues = {
    expenses: [],
    incomes: [],
    accounts: [
      {
        name: 'Bank accounts',
        account_type: ACCOUNT_TYPES.BANK,
        starting_balance: 0,
        earliest_withdrawal_year: YEARS.START,
        investment_distributions: [],
      }, {
        name: 'Investment accounts',
        account_type: ACCOUNT_TYPES.INVESTMENT,
        starting_balance: 0,
        earliest_withdrawal_year: YEARS.START,
        investment_distributions: [],
      }, {
        name: 'Traditional IRA/401k accounts',
        account_type: ACCOUNT_TYPES.RETIREMENT,
        starting_balance: 0,
        earliest_withdrawal_year: YEARS.RETIREMENT_START,
        investment_distributions: [],
      }, {
        name: 'Roth IRA/401k accounts',
        account_type: ACCOUNT_TYPES.ROTH_IRA,
        starting_balance: 0,
        earliest_withdrawal_year: YEARS.RETIREMENT_START,
        investment_distributions: [],
      }, {
        name: '529 accounts',
        account_type: ACCOUNT_TYPES.FIVE_TWO_NINE,
        starting_balance: 0,
        earliest_withdrawal_year: YEARS.START,
        investment_distributions: [],
      }
    ],
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={async (values) => {
        try {
          onUpdate(values);
        } catch (error) {
          console.error("Error submitting form:", error);
        }
      }}
    >
      {(formik) => (
        <Form onSubmit={formik.handleSubmit}>
          <Accordion alwaysOpen>
            <Section title="Savings">
              <Accounts />
              <LineGraphWithAnchorsInput anchors={[{ year: 2024, value: 50 }, { year: 2029, value: 50 }, { year: 2034, value: 50 }, { year: 2039, value: 50 }, { year: 2044, value: 50 }, { year: 2049, value: 50 }, { year: 2054, value: 50 }, { year: 2059, value: 50 }, { year: 2064, value: 50 }, { year: 2069, value: 50 }]} onAnchorChange={(data) => { console.log(data) }} />
            </Section>
            <Section title="Income">
              <DynamicFields
                name="incomes"
                values={formik.values.incomes}
                initialValues={IncomeFields.initialValues}
                fieldsComponent={IncomeFields}
              />
            </Section>
            <Section title="Assets">{[]}</Section>
            <Section title="Spending">
              <DynamicFields
                name="expenses"
                values={formik.values.expenses}
                initialValues={ExpenseFields.initialValues}
                fieldsComponent={ExpenseFields}
              />
            </Section>
            <Section title="Debts">{[]}</Section>
            <Section title="Transfers">{[]}</Section>
            <Section title="Miscellaneous">{[]}</Section>
          </Accordion>
          <Button variant="primary" type="submit" className="mt-3">
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default FormComponent;
