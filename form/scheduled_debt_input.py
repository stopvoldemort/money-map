from ipywidgets import widgets, HBox
from form.helpers import Helpers


class ScheduledDebtInput:
    column_labels = [
        "Name",
        "Amount",
        "Real Interest Rate",
        "Remaining Loan Term (years)",
        "Pay From Account",
        "",
    ]

    def __init__(
        self,
        form,
        name: str = "",
        amount: float = 0.0,
        aagr: float = 0.0,
        remaining_loan_term: int = 0,
        pay_from_account=None,
    ):
        self.form = form

        self.name_widget = widgets.Text(value=name, layout=Helpers.basic_layout())
        self.amount_widget = widgets.FloatText(
            value=amount, layout=Helpers.basic_layout()
        )
        self.aagr_widget = widgets.BoundedFloatText(
            min=0.0, max=1.0, step=0.001, value=aagr, layout=Helpers.basic_layout()
        )

        self.remaining_loan_term_widget = widgets.BoundedIntText(
            value=remaining_loan_term, min=0, max=30, layout=Helpers.basic_layout()
        )

        self.pay_from_account_widget = widgets.Dropdown(
            options=self.form.get_account_options(),
            value=pay_from_account,
            layout=Helpers.basic_layout(),
            disabled=self.form.basic,
        )

        self.delete_btn = Helpers.delete_button()

        self.delete_btn.on_click(self._on_delete)

        self.widgets_row = [
            self.name_widget,
            self.amount_widget,
            self.aagr_widget,
            self.remaining_loan_term_widget,
            self.pay_from_account_widget,
            self.delete_btn,
        ]

    def _on_delete(self, b):
        self.form.delete_scheduled_debt_input(self)

    def update_account_dropdown(self, account_options):
        Helpers.update_dropdown_fields(self.pay_from_account_widget, account_options)

    def get_data(self):
        return {
            "name": self.name_widget.value,
            "amount": self.amount_widget.value,
            "aagr": self.aagr_widget.value,
            "remaining_loan_term": self.remaining_loan_term_widget.value,
            "pay_from_account": self.pay_from_account_widget.value,
        }
