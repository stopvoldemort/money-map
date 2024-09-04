# money-map

TODO:

- Results should be deleted between runs
- Make InvestmentDistribution, etc. fields more understandable
- Still need an AssetInput class
- Need an input for the house purchase, and then add it to the FormParser
- Make all input labels readable
- Add instructions
- Let Income, Expense, and maybe other classes grow over time (i.e., have an AAGR)
- Maybe allow for randomness besides just market returns, e.g., income amounts, expense amounts?
- Improve results display
  - Report the results for each year in a table, e.g., account balances, total spending, total income, taxes
    - Probably only show on non-dynamic runs
    - Really just an enhancement of the "debug" setting
- Incorporate 401k/IRA required withdrawals
- Come up with a way to use machine learning to adjust parameters to minimize the likelihood of ending up with below $1 million, given a certain level of income and spending.
- Form can be pre-populated with values from a Google Workbook (with sheets for "expenses", "incomes", etc.)
