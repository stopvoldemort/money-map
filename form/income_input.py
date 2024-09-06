import ipywidgets as widgets
from form.helpers import Helpers


class IncomeInput:
    def __init__(
        self,
        form,
        name: str = "",
        amount: float = 0.0,
        years: str = "2024-2070",
        deposit_in=None,
        payroll_tax=True,
        federal_income_tax=True,
        ny_income_tax=True,
        nyc_income_tax=True,
    ):
        self.form = form  # Reference to the form instance

        self.name_widget = widgets.Text(value=name, continuous_update=False)
        self.amount_widget = widgets.FloatText(value=amount)
        self.years_widget = widgets.Text(value=years)
        self.account_dropdown = widgets.Dropdown(
            options=self.form.get_account_options(), value=deposit_in
        )
        self.federal_income_tax_widget = widgets.Checkbox(value=federal_income_tax)
        self.ny_income_tax_widget = widgets.Checkbox(value=ny_income_tax)
        self.nyc_income_tax_widget = widgets.Checkbox(value=nyc_income_tax)
        self.payroll_tax_widget = widgets.Checkbox(value=payroll_tax)
        self.delete_btn = Helpers.delete_income_button()

        # self.container = widgets.VBox([
        #     HBox([
        #         self.name_widget,
        #         self.amount_widget,
        #         self.years_widget,
        #         self.account_dropdown,
        #         self.federal_income_tax_widget,
        #         self.ny_income_tax_widget,
        #         self.nyc_income_tax_widget,
        #         self.payroll_tax_widget,
        #         self.delete_btn
        #         ], layout=widgets.Layout(width="100%")
        #     )
        # ], layout=input_layout)

        # Grid layout for this IncomeInput
        self.widgets_row = [
            self.name_widget,
            self.amount_widget,
            self.years_widget,
            self.account_dropdown,
            self.federal_income_tax_widget,
            self.ny_income_tax_widget,
            self.nyc_income_tax_widget,
            self.payroll_tax_widget,
            self.delete_btn,
        ]

        self.delete_btn.on_click(self._on_delete)
        self.name_widget.observe(self._on_name_change, names="value")

    @classmethod
    def labels(cls):
        labels = [
            "Name",
            "Amount",
            "Years",
            "Deposit In",
            "Federal Income Tax",
            "NY Income Tax",
            "NYC Income Tax",
            "Payroll Tax",
            "",
        ]
        return [
            widgets.Label(
                value=l,
                layout=widgets.Layout(
                    overflow="visible", word_wrap="break-word", white_space="normal"
                ),
            )
            for l in labels
        ]

    @classmethod
    def grid(cls, income_inputs):
        # Create a list to hold the grid elements
        income_grid_elements = []

        # Add the labels to the grid
        income_grid_elements.extend(cls.labels())

        # Add each IncomeInput to the grid
        for input_ in income_inputs:
            income_grid_elements.extend(input_.widgets_row)

        # Create the GridBox
        return widgets.GridBox(
            children=income_grid_elements,
            layout=widgets.Layout(
                width="100%",  # Limit the width of the entire grid to fit the screen
                grid_template_columns="repeat(9, minmax(100px, 1fr))",  # Adjust columns as needed
                grid_gap="10px 10px",  # Spacing between rows and columns
                overflow="auto",  # Allow horizontal scrolling if necessary
            ),
        )

    def _on_delete(self, b):
        self.form.delete_income_input(self)

    def _on_name_change(self, change):
        self.form.update_account_dropdowns()

    def update_account_dropdown(self):
        self.account_dropdown.options = self.form.get_account_options()

    def get_data(self):
        years_list = Helpers.parse_years(self.years_widget.value)
        return {
            "name": self.name_widget.value,
            "amount": self.amount_widget.value,
            "years": years_list,
            "deposit_in": self.account_dropdown.value,
            "federal_income_tax": self.federal_income_tax_widget.value,
            "payroll_tax": self.payroll_tax_widget.value,
            "ny_income_tax": self.ny_income_tax_widget.value,
            "nyc_income_tax": self.nyc_income_tax_widget.value,
        }
