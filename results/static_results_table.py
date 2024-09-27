from IPython.display import HTML, display
import ipywidgets as widgets
import pandas as pd
import math


class StaticResultsTable:
    def __init__(self):
        self.plot_output = widgets.Output()

    @staticmethod
    def in_dollars(amounts):
        def formatted(amount):
            if amount is math.isnan(amount):
                return ""
            return "${:,.0f}".format(amount)

        return [formatted(a) for a in amounts]

    def display(self, results, first_year, last_year):
        with self.plot_output:
            self.plot_output.clear_output(wait=True)
            table = pd.DataFrame(
                {
                    "Year": list(range(first_year, last_year)),
                    "Net Worth": StaticResultsTable.in_dollars(results.net_worth[0]),
                    "Income": StaticResultsTable.in_dollars(results.income[0]),
                    "Investment Returns": StaticResultsTable.in_dollars(
                        results.investment_gains[0]
                    ),
                    "Expenses": StaticResultsTable.in_dollars(results.expenses[0]),
                    "Taxes": StaticResultsTable.in_dollars(results.taxes[0]),
                    "Bank": StaticResultsTable.in_dollars(results.bank_account[0]),
                    "Investments": StaticResultsTable.in_dollars(results.investment[0]),
                    "529": StaticResultsTable.in_dollars(results.five_two_nine[0]),
                    "Retirement": StaticResultsTable.in_dollars(results.retirement[0]),
                    "Roth IRA": StaticResultsTable.in_dollars(results.roth_ira[0]),
                    "Other Assets": StaticResultsTable.in_dollars(results.assets[0]),
                    "Debts": StaticResultsTable.in_dollars(results.debt[0]),
                }
            )

            display(HTML(table.to_html(index=False)))

        display(self.plot_output)
