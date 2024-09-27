# money-map

TODO:

- Let Income, Expense, and maybe other classes grow over time (i.e., have an AAGR)
- Report the results for each year in a table, e.g., account balances, total spending, total income, taxes
  - Probably only show on non-dynamic runs
  - Really just an enhancement of the "debug" setting
- Add a ceiling on an account, after which money goes into another account
- Incorporate 401k/IRA required withdrawals
- Assets can be sold.
- House purchases can occur on a specific year.

- Dynamic model improvements

  - Bond and stock market returns are correlated

- "Basic" form improvements
  - Stock and bond returns are configurable
  - Accounts can be invested at differing degrees of aggressiveness (cautious, moderate, aggressive)
    - Note that this probably only really matters when running the dynamic model, since risk has no bearing in the static model risk
