from ipywidgets import widgets, HBox
from form.helpers import Helpers


class AssetInput:
    column_labels = [
        "Name",
        "Value",
        "AAGR",
        "Tax rate",
        "",
    ]

    def __init__(
        self,
        form,
        name: str = "",
        value: float = 0.0,
        aagr: float = 0.0,
        tax_rate: float = 0.0071,
    ):
        self.form = form

        self.name_widget = widgets.Text(value=name, layout=Helpers.basic_layout())
        self.value_widget = widgets.FloatText(
            value=value, layout=Helpers.basic_layout()
        )
        self.aagr_widget = widgets.BoundedFloatText(
            min=0.0, max=1.0, step=0.001, value=aagr, layout=Helpers.basic_layout()
        )
        self.tax_rate_widget = widgets.BoundedFloatText(
            min=0.0, max=1.0, step=0.0001, value=tax_rate, layout=Helpers.basic_layout()
        )
        self.delete_btn = widgets.Button(description="Delete", button_style="danger")

        self.delete_btn.on_click(self._on_delete)

        self.widgets_row = [
            self.name_widget,
            self.value_widget,
            self.aagr_widget,
            self.tax_rate_widget,
            self.delete_btn,
        ]

    def _on_delete(self, b):
        self.form.delete_debt_input(self)

    def get_data(self):
        return {
            "name": self.name_widget.value,
            "value": self.value_widget.value,
            "aagr": self.aagr_widget.value,
            "tax_rate": self.tax_rate_widget.value,
        }
