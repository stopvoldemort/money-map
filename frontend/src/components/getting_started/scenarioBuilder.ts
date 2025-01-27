import { Scenario } from "../../context/scenarioConstants";
import { GettingStartedFormValues, Adult } from "./types";
import { initialValues } from "../form/initialValues";
import { cloneDeep } from "lodash";
import { ACCOUNT_TYPES, YEARS } from "../../constants";
import { FormValuesType, SocialSecurityFieldsType, SalaryFieldsType } from "../form/types";
import { v4 as uuidv4 } from "uuid";

const updateAccountStartingBalance = (initialFormValues: FormValuesType, accountType: string, startingBalance: number) => {
  const account = initialFormValues.accounts.find(account => account.account_type === accountType);
  if (account) {
    account.starting_balance = startingBalance;
  }
}

const handleAdult = (scenarioValues: FormValuesType, adult: Adult) => {
  const salary: SalaryFieldsType = {
    name: `${adult.name} salary`,
    amount: adult.income,
    from_year: YEARS.START,
    to_year: YEARS.START + (65 - adult.age),
    retirement_contribution: adult.income * 0.04,
    roth_contribution: 0,
    employer_retirement_contribution: adult.income * 0.04,
  }
  scenarioValues.salaries.push(salary);

  const socialSecurity: SocialSecurityFieldsType = {
    name: `${adult.name} social security`,
    amount: 35000,
    from_year: YEARS.START + (65 - adult.age),
  }
  scenarioValues.social_security.push(socialSecurity);
}

export const buildScenario = (formValues: GettingStartedFormValues): Scenario => {
  const scenarioValues = cloneDeep(initialValues);

  updateAccountStartingBalance(scenarioValues, ACCOUNT_TYPES.BANK.value, formValues.bankAccounts);
  updateAccountStartingBalance(scenarioValues, ACCOUNT_TYPES.INVESTMENT.value, formValues.investments);
  updateAccountStartingBalance(scenarioValues, ACCOUNT_TYPES.RETIREMENT.value, formValues.retirement);

  formValues.adults.forEach(adult => handleAdult(scenarioValues, adult));

  return { id: uuidv4(), values: scenarioValues };
}
