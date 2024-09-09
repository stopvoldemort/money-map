from ipywidgets import widgets, HBox
from form.helpers import Helpers


class DebtInput:
    column_labels = [
        "Name",
        "Amount",
        "AAGR",
        "",
    ]

    def __init__(self, form, name: str = "", amount: float = 0.0, aagr: float = 0.0):
        self.form = form

        self.name_widget = widgets.Text(value=name, layout=Helpers.basic_layout())
        self.amount_widget = widgets.FloatText(
            value=amount, layout=Helpers.basic_layout()
        )
        self.aagr_widget = widgets.BoundedFloatText(
            min=0.0, max=1.0, step=0.001, value=aagr, layout=Helpers.basic_layout()
        )
        self.delete_btn = Helpers.delete_button()

        self.delete_btn.on_click(self._on_delete)

        self.widgets_row = [
            self.name_widget,
            self.amount_widget,
            self.aagr_widget,
            self.delete_btn,
        ]

    def _on_delete(self, b):
        self.form.delete_debt_input(self)

    def get_data(self):
        return {
            "name": self.name_widget.value,
            "amount": self.amount_widget.value,
            "aagr": self.aagr_widget.value,
        }
