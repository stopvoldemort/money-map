from ipywidgets import widgets, HBox
from form.helpers import Helpers


class TransferInput:
    column_labels = [
        "Name",
        "Amount",
        "Years",
        "From",
        "To",
        "Required",
        "",
    ]

    def __init__(
        self,
        form,
        name: str = "",
        amount: float = 0.0,
        years: str = "",
        transfer_from: str = None,
        transfer_to: str = None,
        required: bool = False,
    ):
        self.form = form

        self.name_widget = widgets.Text(
            value=name, continuous_update=False, layout=Helpers.basic_layout()
        )
        self.amount_widget = widgets.FloatText(
            value=amount, layout=Helpers.basic_layout()
        )
        self.years_widget = widgets.Text(value=years, layout=Helpers.basic_layout())
        self.transfer_from_widget = widgets.Dropdown(
            options=self.form.get_account_options(),
            value=transfer_from,
            layout=Helpers.basic_layout(),
        )
        self.transfer_to_widget = widgets.Dropdown(
            options=self.form.get_account_options(),
            value=transfer_to,
            layout=Helpers.basic_layout(),
        )
        self.required_widget = widgets.Checkbox(
            value=required, layout=Helpers.basic_layout()
        )
        self.delete_btn = widgets.Button(description="Delete", button_style="danger")

        self.widgets_row = [
            self.name_widget,
            self.amount_widget,
            self.years_widget,
            self.transfer_from_widget,
            self.transfer_to_widget,
            self.required_widget,
            self.delete_btn,
        ]

        self.delete_btn.on_click(self._on_delete)

    def _on_delete(self, b):
        self.form.delete_transfer_input(self)

    def update_account_dropdown(self):
        self.transfer_from_widget.options = self.form.get_account_options()
        self.transfer_to_widget.options = self.form.get_account_options()

    def get_data(self):
        return {
            "name": self.name_widget.value,
            "amount": self.amount_widget.value,
            "years": self.years_widget.value,
            "transfer_from": self.transfer_from_widget.value,
            "transfer_to": self.transfer_to_widget.value,
            "required": self.required_widget.value,
        }
