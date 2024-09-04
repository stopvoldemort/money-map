from ipywidgets import widgets, HBox
from form.helpers import Helpers


class ExpenseInput:
    def __init__(self, form):
        self.form = form  # Reference to the form instance

        self.name_widget = widgets.Text(description="Name:", continuous_update=False)
        self.amount_widget = widgets.FloatText(description="Amount", value=0.0)
        self.years_widget = widgets.Text(description="Years:", value="")
        self.five_two_nine_eligible_widget = widgets.Checkbox(
            description="529 Eligible", value=False
        )
        self.delete_btn = widgets.Button(description="Delete", button_style="danger")

        self.container = HBox(
            [
                self.name_widget,
                self.amount_widget,
                self.years_widget,
                self.five_two_nine_eligible_widget,
                self.delete_btn,
            ]
        )

        self.delete_btn.on_click(self._on_delete)

    def _on_delete(self, b):
        self.form.delete_expense_input(self)

    def get_data(self):
        years_list = Helpers.parse_years(self.years_widget.value)
        return {
            "name": self.name_widget.value,
            "amount": self.amount_widget.value,
            "years": years_list,
            "five_two_nine_eligible": self.five_two_nine_eligible_widget.value,
        }
