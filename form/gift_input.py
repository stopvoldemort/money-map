from ipywidgets import widgets, HBox
from helpers import Helpers


class GiftInput:
    def __init__(self, form):
        self.form = form  # Reference to the form instance

        self.name_widget = widgets.Text(description="Name:", continuous_update=False)
        self.amount_widget = widgets.FloatText(description="Amount", value=0.0)
        self.years_widget = widgets.Text(description="Years:", value="")
        self.account_dropdown = widgets.Dropdown(
            options=self.form.get_account_options(), description="Account:"
        )
        self.delete_btn = widgets.Button(description="Delete", button_style="danger")

        self.container = HBox(
            [
                self.name_widget,
                self.amount_widget,
                self.years_widget,
                self.account_dropdown,
                self.delete_btn,
            ]
        )

        self.delete_btn.on_click(self._on_delete)

    def _on_delete(self, b):
        self.form.delete_gift_input(self)

    def update_account_dropdown(self):
        self.account_dropdown.options = self.form.get_account_options()

    def get_data(self):
        years_list = Helpers.parse_years(self.years_widget.value)
        return {
            "name": self.name_widget.value,
            "amount": self.amount_widget.value,
            "years": years_list,
            "account": self.account_dropdown.value,
        }
