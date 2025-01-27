import { Scenario } from "../../context/scenarioConstants";
import { GettingStartedFormValues, Adult, Child } from "./types";
import { initialValues } from "../form/initialValues";
import { cloneDeep } from "lodash";
import { ACCOUNT_TYPES, YEARS } from "../../constants";
import { FormValuesType, SocialSecurityFieldsType, SalaryFieldsType } from "../form/types";
import { v4 as uuidv4 } from "uuid";
import { federalStandardDeduction, federalTaxBrackets, localStandardDeduction, localTaxBrackets, SINGLE, NY, NYC, stateStandardDeduction, stateTaxBrackets } from "../form/taxData";

const updateAccountStartingBalance = (initialFormValues: FormValuesType, accountType: string, startingBalance: number) => {
  const account = initialFormValues.accounts.find(account => account.account_type === accountType);
  if (account) {
    account.starting_balance = startingBalance;
  }
}

const adultRetirementYear = (adult: Adult) => {
  return YEARS.START + (65 - adult.age);
}

const handleAdult = (scenarioValues: FormValuesType, adult: Adult) => {
  const salary: SalaryFieldsType = {
    name: `${adult.name} salary`,
    amount: adult.income,
    from_year: YEARS.START,
    to_year: adultRetirementYear(adult),
    retirement_contribution: adult.income * 0.04,
    roth_contribution: 0,
    employer_retirement_contribution: adult.income * 0.04,
  }
  scenarioValues.salaries.push(salary);

  const socialSecurity: SocialSecurityFieldsType = {
    name: `${adult.name} social security`,
    amount: 35000,
    from_year: adultRetirementYear(adult),
  }
  scenarioValues.social_security.push(socialSecurity);
}

const handleAdults = (scenarioValues: FormValuesType, adults: Adult[]) => {
  scenarioValues.config.retirement_withdrawal_year = Math.min(...adults.map(adultRetirementYear));

  adults.forEach(adult => handleAdult(scenarioValues, adult));
}

const handleChildren = (scenarioValues: FormValuesType, children: Child[]) => {
  console.log(children, scenarioValues);
  // todo
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

export const buildScenario = (formValues: GettingStartedFormValues): Scenario => {
  const scenarioValues = cloneDeep(initialValues);

  updateAccountStartingBalance(scenarioValues, ACCOUNT_TYPES.BANK.value, formValues.bankAccounts);
  updateAccountStartingBalance(scenarioValues, ACCOUNT_TYPES.INVESTMENT.value, formValues.investments);
  updateAccountStartingBalance(scenarioValues, ACCOUNT_TYPES.RETIREMENT.value, formValues.retirement);

  setTaxData(scenarioValues, formValues.hasPartner);

  if (!formValues.hasPartner) {
    formValues.adults = [formValues.adults[0]];
  }
  handleAdults(scenarioValues, formValues.adults);

  if (!formValues.hasChildren) {
    handleChildren(scenarioValues, formValues.children);
  }

  return { id: uuidv4(), values: scenarioValues };
}
