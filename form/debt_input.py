from ipywidgets import widgets, HBox
from helpers import Helpers


class DebtInput:
    def __init__(self, form):
        self.form = form  # Reference to the form instance

        self.name_widget = widgets.Text(description="Name:")
        self.amount_widget = widgets.FloatText(description="Amount", value=0.0)
        self.aagr_widget = widgets.FloatSlider(
            description="AAGR",
            min=0.0,
            max=1.0,
            step=0.001,
            value=0.0,
            continuous_update=True,
        )
        self.delete_btn = widgets.Button(description="Delete", button_style="danger")

        self.delete_btn.on_click(self._on_delete)

        self.container = HBox(
            [self.name_widget, self.amount_widget, self.aagr_widget, self.delete_btn],
            layout=Helpers.input_layout(),
        )

    def _on_delete(self, b):
        self.form.delete_debt_input(self)

    def get_data(self):
        return {
            "name": self.name_widget.value,
            "amount": self.amount_widget.value,
            "aagr": self.aagr_widget.value,
        }
