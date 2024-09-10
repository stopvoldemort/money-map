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
        investment_distributions=[],
    ):
        self.form = form  # Reference to the form instance

        self.investment_distribution_inputs = []

        self.name_widget = widgets.Text(
            value=name, continuous_update=False, layout=Helpers.basic_layout()
        )
        self.name_widget.observe(self._on_name_change, names="value")

        self.account_type_widget = widgets.Dropdown(
            options=AccountType.ALL, value=account_type, layout=Helpers.basic_layout()
        )
        self.account_type_widget.observe(
            lambda change: self.earliest_withdrawal_year_widget.set_trait(
                "disabled", change["new"] != AccountType.RETIREMENT
            ),
            names="value",
        )
        self.starting_balance_widget = widgets.FloatText(
            value=starting_balance, layout=Helpers.basic_layout()
        )
        self.earliest_withdrawal_year_widget = widgets.BoundedIntText(
            min=2024,
            max=2070,
            step=1,
            value=earliest_withdrawal_year,
            disabled=self.account_type_widget.value != AccountType.RETIREMENT,
            layout=Helpers.basic_layout(),
        )

        self.investment_distributions_widget = widgets.VBox(
            layout=widgets.Layout(
                border="solid 0.5px gray", padding="10px", margin="10px", width="auto"
            )
        )

        self.add_investment_distribution_btn = Helpers.add_input_button("Add Period")
        self.add_investment_distribution_btn.on_click(
            self.handle_add_investment_distribution_input
        )

        self.delete_btn = Helpers.delete_button()
        self.delete_btn.on_click(self._on_delete)

        self.widgets_row = [
            self.name_widget,
            self.account_type_widget,
            self.starting_balance_widget,
            self.earliest_withdrawal_year_widget,
            self.delete_btn,
        ]

        self.container = VBox(
            [
                Helpers.simple_grid(
                    [self],
                    [
                        "Name",
                        "Type",
                        "Starting Balance",
                        "Earliest Withdrawal Year",
                        "",
                    ],
                ),
                widgets.HTML(value="<h3>Investment Plan (if applicable)</h3>"),
                self.investment_distributions_widget,
                self.add_investment_distribution_btn,
            ],
            layout=Helpers.input_layout(),
        )

        for data in investment_distributions:
            self.add_investment_distribution_input(data)

    def add_investment_distribution_input(self, data: dict = {}):
        investment_distribution_input = InvestmentDistributionInput(
            self.form, self, **data
        )
        self.investment_distribution_inputs.append(investment_distribution_input)
        self.investment_distributions_widget.children = list(
            self.investment_distributions_widget.children
        ) + [investment_distribution_input.container]

    def handle_add_investment_distribution_input(self, b=None):
        self.add_investment_distribution_input()

    def delete_investment_distribution_input(self, investment_distribution_input):
        if investment_distribution_input in self.investment_distribution_inputs:
            self.investment_distribution_inputs.remove(investment_distribution_input)
            self.investment_distributions_widget.children = [
                input.container for input in self.investment_distribution_inputs
            ]

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
