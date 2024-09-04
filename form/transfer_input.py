from ipywidgets import widgets, HBox
from form.helpers import Helpers


class TransferInput:
    def __init__(self, form):
        self.form = form  # Reference to the form instance

        self.name_widget = widgets.Text(description="Name:", continuous_update=False)
        self.amount_widget = widgets.FloatText(description="Amount", value=0.0)
        self.years_widget = widgets.Text(description="Years:", value="")
        self.transfer_from_widget = widgets.Dropdown(
            options=self.form.get_account_options(), description="From:"
        )
        self.transfer_to_widget = widgets.Dropdown(
            options=self.form.get_account_options(), description="To:"
        )
        self.required_widget = widgets.Checkbox(description="Required", value=False)
        self.delete_btn = widgets.Button(description="Delete", button_style="danger")

        self.container = HBox(
            [
                self.name_widget,
                self.amount_widget,
                self.years_widget,
                self.transfer_from_widget,
                self.transfer_to_widget,
                self.required_widget,
                self.delete_btn,
            ]
        )

        self.delete_btn.on_click(self._on_delete)

    def _on_delete(self, b):
        self.form.delete_transfer_input(self)

    def update_account_dropdown(self):
        self.transfer_from_widget.options = self.form.get_account_options()
        self.transfer_to_widget.options = self.form.get_account_options()

    def get_data(self):
        years_list = Helpers.parse_years(self.years_widget.value)
        return {
            "name": self.name_widget.value,
            "amount": self.amount_widget.value,
            "years": years_list,
            "transfer_from": self.transfer_from_widget.value,
            "transfer_to": self.transfer_to_widget.value,
            "required": self.required_widget.value,
        }
