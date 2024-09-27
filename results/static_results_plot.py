from typing import List
import pandas as pd
import matplotlib.pyplot as plt
from IPython.display import display, Markdown
import ipywidgets as widgets
from model.aggregator import Aggregator


class StaticResultsPlot:
    def __init__(self):
        self.plot_output = widgets.Output()

    def display(
        self,
        first_year: int,
        last_year: int,
        results: Aggregator,
    ):
        with self.plot_output:
            self.plot_output.clear_output(wait=True)
            years = list(range(first_year, last_year))
            net_worth_df = pd.DataFrame(results.net_worth, columns=years)

            plt.figure(figsize=(10, 6))

            # Net worth median
            median_trajectory = net_worth_df.median(axis=0)
            plt.plot(
                years, median_trajectory, linewidth=2, color="black", label="Net Worth"
            )

            # Components
            retirement_df = pd.DataFrame(results.retirement, columns=years)
            plt.plot(
                years,
                retirement_df.median(axis=0),
                color="blue",
                linewidth=1,
                label="Retirement",
            )

            investments_df = pd.DataFrame(results.investment, columns=years)
            plt.plot(
                years,
                investments_df.median(axis=0),
                color="green",
                linewidth=1,
                label="Investments",
            )

            five_two_nine_df = pd.DataFrame(results.five_two_nine, columns=years)
            plt.plot(
                years,
                five_two_nine_df.median(axis=0),
                color="brown",
                linewidth=1,
                label="529",
            )

            debt_df = pd.DataFrame(results.debt, columns=years)
            plt.plot(
                years,
                -debt_df.median(axis=0),
                color="purple",
                linewidth=1,
                label="Debt",
            )

            bank_account_df = pd.DataFrame(results.bank_account, columns=years)
            plt.plot(
                years,
                bank_account_df.median(axis=0),
                linewidth=1,
                label="Bank account",
            )

            assets_df = pd.DataFrame(results.assets, columns=years)
            plt.plot(
                years,
                assets_df.median(axis=0),
                color="orange",
                linewidth=1,
                label="Assets",
            )
            median_net_worth = "${:,.0f}".format(median_trajectory.iloc[-1])
            result_string = f"## Net Worth in {last_year}: {median_net_worth}"
            display(Markdown(result_string))

            # Customize the plot
            plt.xlabel("Age")
            plt.ylabel("Net Worth")
            plt.legend()

            # Format y-axis labels in millions
            plt.gca().yaxis.set_major_formatter(
                plt.FuncFormatter(lambda x, loc: "{:,.1f}M".format(x / 1e6))
            )

            # Max x-axis dark
            plt.axhline(y=0, color="black", linewidth=1.5)

            plt.grid(True)
            plt.show()

        display(self.plot_output)
