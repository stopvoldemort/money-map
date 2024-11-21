from ipywidgets import widgets, HBox
from form.helpers import Helpers


class ExpenseInput:
    column_labels = [
        "Name",
        "Annual Amount",
        "Years",
        "529 Eligible",
        "",
    ]

    def __init__(
        self,
        form,
        name: str = "",
        amount: float = 0.0,
        years: str = "2024-2070",
        five_two_nine_eligible: bool = False,
    ):
        self.form = form  # Reference to the form instance

        self.name_widget = widgets.Text(
            value=name, continuous_update=False, layout=Helpers.basic_layout()
        )
        self.amount_widget = widgets.FloatText(
            value=amount, layout=Helpers.basic_layout()
        )
        self.years_widget = widgets.Text(value=years, layout=Helpers.basic_layout())
        self.five_two_nine_eligible_widget = widgets.Checkbox(
            value=five_two_nine_eligible, layout=Helpers.basic_layout()
        )
        self.delete_btn = Helpers.delete_button()
        self.delete_btn.on_click(self._on_delete)

        self.widgets_row = [
            self.name_widget,
            self.amount_widget,
            self.years_widget,
            self.five_two_nine_eligible_widget,
            self.delete_btn,
        ]

    def _on_delete(self, b):
        self.form.delete_expense_input(self)

    def get_data(self):
        return {
            "name": self.name_widget.value,
            "amount": self.amount_widget.value,
            "years": self.years_widget.value,
            "five_two_nine_eligible": self.five_two_nine_eligible_widget.value,
        }
