from ipywidgets import VBox, Text, Button
from investment_proportion_input import InvestmentProportionInput
from helpers import Helpers


class InvestmentDistributionInput:
    def __init__(self, form, account_input):
        self.form = form
        self.account_input = account_input  # Reference to the parent AccountInput
        self.investment_proportion_inputs = (
            []
        )  # Store instances of InvestmentProportionInput

        self.years_widget = Text(description="Years:", continuous_update=False)
        self.investment_proportions_widget = VBox()
        self.add_investment_proportion_btn = Helpers.add_input_button(
            "Add Investment Proportion"
        )
        self.delete_btn = Button(
            description="Delete Distribution", button_style="danger"
        )

        self.add_investment_proportion_btn.on_click(
            self.add_investment_proportion_input
        )
        self.delete_btn.on_click(self._on_delete)

        self.container = VBox(
            [
                self.years_widget,
                self.investment_proportions_widget,
                self.add_investment_proportion_btn,
                self.delete_btn,
            ]
        )

    def _on_delete(self, b):
        self.account_input.delete_investment_distribution_input(self)

    def add_investment_proportion_input(self, b=None):
        investment_proportion_input = InvestmentProportionInput(self.form, self)
        self.investment_proportion_inputs.append(investment_proportion_input)
        self.investment_proportions_widget.children = list(
            self.investment_proportions_widget.children
        ) + [investment_proportion_input.container]

    def delete_investment_proportion_input(self, investment_proportion_input):
        if investment_proportion_input in self.investment_proportion_inputs:
            self.investment_proportion_inputs.remove(investment_proportion_input)
            self.investment_proportions_widget.children = [
                input.container for input in self.investment_proportion_inputs
            ]

    def get_data(self):
        years = Helpers.parse_years(self.years_widget.value)
        investment_proportions = [
            input.get_data() for input in self.investment_proportion_inputs
        ]
        return {
            "years": years,
            "investment_proportions": investment_proportions,
        }
