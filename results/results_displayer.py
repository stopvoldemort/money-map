from typing import List
import pandas as pd
import matplotlib.pyplot as plt
from IPython.display import display, Markdown
import ipywidgets as widgets
from model.aggregator import Aggregator


class ResultsDisplayer:
    def __init__(self):
        # Output widget to hold the plot
        self.plot_output = widgets.Output()

    def display(
        self,
        first_year: int,
        last_year: int,
        aggregator: Aggregator,
        dynamic: bool = False,
        debug: bool = False,
    ):
        with self.plot_output:
            # Clear the plot output
            self.plot_output.clear_output(wait=True)
            years = list(range(first_year, last_year))
            df = pd.DataFrame(aggregator.net_worth, columns=years)
            number_of_simulations = df.shape[0]

            # All net worths
            plt.figure(figsize=(10, 6))

            # Net worth median
            median_trajectory = df.median(axis=0)
            plt.plot(years, median_trajectory, linewidth=2, label="Median")

            # Up to 50 trajctories
            num_trajectories_to_plot = min(50, df.shape[0])
            for i in range(num_trajectories_to_plot):
                plt.plot(
                    years, df.iloc[i], linewidth=1, color="gray", alpha=0.5
                )  # alpha controls transparency

            if debug:
                # Components
                retirement_df = pd.DataFrame(aggregator.retirement, columns=years)
                plt.plot(
                    years,
                    retirement_df.median(axis=0),
                    color="blue",
                    linewidth=1,
                    label="Retirement",
                )

                investments_df = pd.DataFrame(aggregator.investment, columns=years)
                plt.plot(
                    years,
                    investments_df.median(axis=0),
                    color="green",
                    linewidth=1,
                    label="Investments",
                )

                five_two_nine_df = pd.DataFrame(aggregator.five_two_nine, columns=years)
                plt.plot(
                    years,
                    five_two_nine_df.median(axis=0),
                    color="brown",
                    linewidth=1,
                    label="529",
                )

                debt_df = pd.DataFrame(aggregator.debt, columns=years)
                plt.plot(
                    years,
                    -debt_df.median(axis=0),
                    color="purple",
                    linewidth=1,
                    label="Debt",
                )

                bank_account_df = pd.DataFrame(aggregator.bank_account, columns=years)
                plt.plot(
                    years,
                    bank_account_df.median(axis=0),
                    color="yellow",
                    linewidth=1,
                    label="Bank account",
                )

                assets_df = pd.DataFrame(aggregator.assets, columns=years)
                plt.plot(
                    years,
                    assets_df.median(axis=0),
                    color="orange",
                    linewidth=1,
                    label="Assets",
                )

            if dynamic:
                # Calculate percentages
                below_one_million_count = (df[last_year - 1] < 1000000).sum()
                below_zero_count = (df[last_year - 1] < 0).sum()

                below_one_million_percent = (
                    below_one_million_count / number_of_simulations
                ) * 100
                below_zero_percent = (below_zero_count / number_of_simulations) * 100

                # Display results
                median_net_worth = "${:,.0f}".format(median_trajectory.iloc[-1])
                result_string = f"## Net Worth in {last_year}\n\n###Median: {median_net_worth}###\n\n###Likelihood under $1M: {below_one_million_percent:.0f}%###\n\n###Likelihood under $0: {below_zero_percent:.0f}%###"
                display(Markdown(result_string))

            # Customize the plot
            plt.xlabel("Age")
            plt.ylabel("Net Worth")
            plt.legend()

            # Format y-axis labels in millions
            plt.gca().yaxis.set_major_formatter(
                plt.FuncFormatter(lambda x, loc: "{:,.1f}M".format(x / 1e6))
            )

            # If dynamic, scale y-axis according to the 33th/67th percentile
            if dynamic:
                plt.ylim(
                    df.quantile(0.33, axis=0).min(), df.quantile(0.67, axis=0).max()
                )

            # Max x-axis dark
            plt.axhline(y=0, color="black", linewidth=1.5)

            plt.grid(True)
            plt.show()

        display(self.plot_output)
