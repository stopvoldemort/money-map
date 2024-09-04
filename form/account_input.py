from ipywidgets import widgets, VBox, HBox
from model.account_type import AccountType
from form.helpers import Helpers
from form.investment_distribution_input import InvestmentDistributionInput


class AccountInput:
    def __init__(
        self,
        form,
        name="",
        account_type=AccountType.BANK,
        starting_balance=0.0,
        earliest_withdrawal_year=2024,
    ):
        self.form = form  # Reference to the form instance
        self.investment_distribution_inputs = (
            []
        )  # Store instances of InvestmentDistributionInput

        self.name_widget = widgets.Text(
            description="Name:", value=name, continuous_update=False
        )
        self.account_type_widget = widgets.Dropdown(
            options=AccountType.ALL, description="Type:", value=account_type
        )
        self.starting_balance_widget = widgets.FloatText(
            description="Balance", value=starting_balance
        )
        self.earliest_withdrawal_year_widget = widgets.IntSlider(
            min=2024,
            max=2070,
            step=1,
            value=earliest_withdrawal_year,
            continuous_update=True,
        )

        self.investment_distributions_widget = widgets.VBox(
            layout=widgets.Layout(
                border="solid 0.5px gray", padding="10px", margin="10px", width="auto"
            )
        )
        self.add_investment_distribution_btn = Helpers.add_input_button(
            "Add Investment Distribution"
        )
        self.add_investment_distribution_btn.on_click(
            self.add_investment_distribution_input
        )

        self.delete_btn = widgets.Button(description="Delete", button_style="danger")

        self.container = VBox(
            [
                HBox(
                    [
                        self.name_widget,
                        self.account_type_widget,
                        self.starting_balance_widget,
                        VBox(
                            [
                                widgets.Label("Earliest Withdrawal Year"),
                                self.earliest_withdrawal_year_widget,
                            ]
                        ),
                        self.delete_btn,
                    ]
                ),
                widgets.HTML(value="<h3>Investment Distributions</h3>"),
                self.investment_distributions_widget,
                self.add_investment_distribution_btn,
            ],
            layout=Helpers.input_layout(),
        )

        self.delete_btn.on_click(self._on_delete)
        self.name_widget.observe(self._on_name_change, names="value")

    def add_investment_distribution_input(self, b=None):
        investment_distribution_input = InvestmentDistributionInput(self.form, self)
        self.investment_distribution_inputs.append(investment_distribution_input)
        self.investment_distributions_widget.children = list(
            self.investment_distributions_widget.children
        ) + [investment_distribution_input.container]

    def delete_investment_distribution_input(self, investment_distribution_input):
        if investment_distribution_input in self.investment_distribution_inputs:
            self.investment_distribution_inputs.remove(investment_distribution_input)
            # Update the widget display after deletion
            self.investment_distributions_widget.children = [
                input.container for input in self.investment_distribution_inputs
            ]

    def update_investment_vehicle_dropdowns(self):
        for investment_distribution_input in self.investment_distribution_inputs:
            for (
                investment_proportion_input
            ) in investment_distribution_input.investment_proportions_widget.children:
                investment_proportion_input.investment_widget.options = (
                    self.form.get_investment_vehicle_options()
                )

    def _on_delete(self, b):
        self.form.delete_account_input(self)

    def _on_name_change(self, change):
        self.form.update_account_dropdowns()

    def get_data(self):
        return {
            "name": self.name_widget.value,
            "account_type": self.account_type_widget.value,
            "starting_balance": self.starting_balance_widget.value,
            "earliest_withdrawal_year": self.earliest_withdrawal_year_widget.value,
            "investment_distributions": [
                input.get_data() for input in self.investment_distribution_inputs
            ],
        }
