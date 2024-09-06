import ipywidgets as widgets
from form.helpers import Helpers


class IncomeInput:
    column_labels = [
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
        self.form = form

        self.name_widget = widgets.Text(
            value=name, continuous_update=False, layout=Helpers.basic_layout()
        )
        self.amount_widget = widgets.FloatText(
            value=amount, layout=Helpers.basic_layout()
        )
        self.years_widget = widgets.Text(value=years, layout=Helpers.basic_layout())
        self.account_dropdown = widgets.Dropdown(
            options=self.form.get_account_options(),
            value=deposit_in,
            layout=Helpers.basic_layout(),
        )
        self.federal_income_tax_widget = widgets.Checkbox(
            value=federal_income_tax, layout=Helpers.basic_layout()
        )
        self.ny_income_tax_widget = widgets.Checkbox(
            value=ny_income_tax, layout=Helpers.basic_layout()
        )
        self.nyc_income_tax_widget = widgets.Checkbox(
            value=nyc_income_tax, layout=Helpers.basic_layout()
        )
        self.payroll_tax_widget = widgets.Checkbox(
            value=payroll_tax, layout=Helpers.basic_layout()
        )
        self.delete_btn = Helpers.delete_income_button()

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

    def _on_delete(self, b):
        self.form.delete_income_input(self)

    def _on_name_change(self, change):
        self.form.update_account_dropdowns()

    def update_account_dropdown(self):
        self.account_dropdown.options = self.form.get_account_options()

    def get_data(self):
        return {
            "name": self.name_widget.value,
            "amount": self.amount_widget.value,
            "years": self.years_widget.value,
            "deposit_in": self.account_dropdown.value,
            "federal_income_tax": self.federal_income_tax_widget.value,
            "payroll_tax": self.payroll_tax_widget.value,
            "ny_income_tax": self.ny_income_tax_widget.value,
            "nyc_income_tax": self.nyc_income_tax_widget.value,
        }
