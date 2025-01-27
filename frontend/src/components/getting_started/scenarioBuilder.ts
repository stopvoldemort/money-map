import { Scenario } from "../../context/scenarioConstants";
import { GettingStartedFormValues, Adult, Child, Home } from "./types";
import { initialValues } from "../form/initialValues";
import { cloneDeep } from "lodash";
import { ACCOUNT_TYPES, YEARS } from "../../constants";
import { FormValuesType, SocialSecurityFieldsType, SalaryFieldsType, ExpenseFieldsType, AssetFieldsType, ScheduledDebtFieldsType } from "../form/types";
import { v4 as uuidv4 } from "uuid";
import { federalStandardDeduction, federalTaxBrackets, localStandardDeduction, localTaxBrackets, SINGLE, NY, NYC, stateStandardDeduction, stateTaxBrackets } from "../form/taxData";
import HousePurchaseFields from "../form/HousePurchaseFields";

const EVERYDAY_CHILD_EXPENSE = 10000;

const setAccountStartingBalance = (initialFormValues: FormValuesType, accountType: string, startingBalance: number) => {
  const account = initialFormValues.accounts.find(account => account.account_type === accountType);
  if (account) {
    account.starting_balance = startingBalance;
  }
}

const adultRetirementYear = (adult: Adult) => {
  return YEARS.START + (65 - adult.age);
}

const setAdultSalary = (scenarioValues: FormValuesType, adult: Adult) => {
  const salary: SalaryFieldsType = {
    name: `${adult.name} salary`,
    amount: adult.income,
    from_year: YEARS.START,
    to_year: adultRetirementYear(adult) - 1,
    retirement_contribution: adult.income * 0.04,
    roth_contribution: 0,
    employer_retirement_contribution: adult.income * 0.04,
  }
  scenarioValues.salaries.push(salary);
}

const setAdultSocialSecurity = (scenarioValues: FormValuesType, adult: Adult) => {
  const socialSecurity: SocialSecurityFieldsType = {
    name: `${adult.name} social security`,
    amount: 35000,
    from_year: adultRetirementYear(adult),
  }
  scenarioValues.social_security.push(socialSecurity);
}

const setTaxData = (scenarioValues: FormValuesType, hasPartner: boolean) => {
  if (!hasPartner) {
    scenarioValues.config.federal_standard_deduction = federalStandardDeduction[SINGLE];
    scenarioValues.config.state_standard_deduction = stateStandardDeduction[NY][SINGLE];
    scenarioValues.config.local_standard_deduction = localStandardDeduction[NYC][SINGLE];
    scenarioValues.config.federal_tax_brackets = federalTaxBrackets[SINGLE];
    scenarioValues.config.state_tax_brackets = stateTaxBrackets[NY][SINGLE];
    scenarioValues.config.local_tax_brackets = localTaxBrackets[NYC][SINGLE];
  }
}

const setCollegeExpenses = (scenarioValues: FormValuesType, child: Child) => {
  const collegeStartYear = YEARS.START + Math.max(18 - child.age, 0);
  const collegeEndYear = YEARS.START + Math.min(21 - child.age, 21);

  const collegeYears = Array.from(
    { length: collegeEndYear - collegeStartYear + 1 },
    (_, i) => collegeStartYear + i
  )
  const collegeExpense: ExpenseFieldsType = {
    name: `${child.name} college expenses`,
    amount: 50000,
    years: collegeYears,
    five_two_nine_eligible: true,
  }
  scenarioValues.expenses.push(collegeExpense);
}

const setEverydayChildExpenses = (scenarioValues: FormValuesType, child: Child) => {
  if (child.age >= 18) {
    return;
  }

  const livingAtHomeEndYear = YEARS.START + (18 - child.age) - 1;
  const livingAtHomeYears = Array.from(
    { length: livingAtHomeEndYear - YEARS.START + 1 },
    (_, i) => YEARS.START + i
  )
  const everydayExpense: ExpenseFieldsType = {
    name: `Extra expenses for ${child.name}`,
    amount: EVERYDAY_CHILD_EXPENSE,
    years: livingAtHomeYears,
    five_two_nine_eligible: false,
  }
  scenarioValues.expenses.push(everydayExpense);
}

const setEverydayExpenses = (scenarioValues: FormValuesType, annualSpending: number, children: Child[]) => {
  const childrenAtHomeAtStart = children.filter(child => child.age < 18);
  const childrenAtHomeExpense = childrenAtHomeAtStart.length * EVERYDAY_CHILD_EXPENSE

  const everydayExpense: ExpenseFieldsType = {
    name: "Baseline spending",
    amount: Math.max(0, annualSpending - childrenAtHomeExpense),
    years: Array.from(
      { length: YEARS.END - YEARS.START + 1 },
      (_, i) => YEARS.START + i
    ),
    five_two_nine_eligible: false,
  }
  scenarioValues.expenses.push(everydayExpense);
}

const handleOwnsHome = (scenarioValues: FormValuesType, home: Home) => {
  const asset: AssetFieldsType = {
    name: "Home",
    value: home.value,
    aagr: HousePurchaseFields.initialValues.aagr,
    tax_rate: HousePurchaseFields.initialValues.property_tax_rate,
    sell_on: 0,
    sales_taxes_amount: 0,
  }
  scenarioValues.assets.push(asset);

  const mortgage: ScheduledDebtFieldsType = {
    name: "Mortgage",
    amount: home.remainingPrincipal,
    aagr: home.interestRate,
    remaining_loan_term: home.remainingYears,
  }
  scenarioValues.scheduled_debts.push(mortgage);
}


export const buildScenario = (formValues: GettingStartedFormValues): Scenario => {
  const scenarioValues = cloneDeep(initialValues);
  if (!formValues.hasPartner) {
    formValues.adults = [formValues.adults[0]];
  }

  if (!formValues.hasChildren) {
    formValues.children = [];
  }

  setAccountStartingBalance(scenarioValues, ACCOUNT_TYPES.BANK.value, formValues.bankAccounts);
  setAccountStartingBalance(scenarioValues, ACCOUNT_TYPES.INVESTMENT.value, formValues.investments);
  setAccountStartingBalance(scenarioValues, ACCOUNT_TYPES.RETIREMENT.value, formValues.retirement);

  setTaxData(scenarioValues, formValues.hasPartner);

  handleOwnsHome(scenarioValues, formValues.home);

  scenarioValues.config.retirement_withdrawal_year = Math.min(...formValues.adults.map(adultRetirementYear));

  formValues.adults.forEach(adult => setAdultSalary(scenarioValues, adult))
  formValues.adults.forEach(adult => setAdultSocialSecurity(scenarioValues, adult))

  formValues.children.forEach(child => setCollegeExpenses(scenarioValues, child))
  formValues.children.forEach(child => setEverydayChildExpenses(scenarioValues, child))

  setEverydayExpenses(scenarioValues, formValues.annualSpending, formValues.children);

  return { id: uuidv4(), values: scenarioValues };
}
