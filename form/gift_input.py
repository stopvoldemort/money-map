from ipywidgets import widgets, HBox
from form.helpers import Helpers


class GiftInput:
    column_labels = [
        "Name",
        "Amount",
        "Years",
        "Account",
        "",
    ]

    def __init__(
        self,
        form,
        name: str = "",
        amount: float = 0.0,
        years: str = "",
        account: str = None,
    ):
        self.form = form  # Reference to the form instance

        self.name_widget = widgets.Text(
            value=name, continuous_update=False, layout=Helpers.basic_layout()
        )
        self.amount_widget = widgets.FloatText(
            value=amount, layout=Helpers.basic_layout()
        )
        self.years_widget = widgets.Text(value=years, layout=Helpers.basic_layout())
        self.account_dropdown = widgets.Dropdown(
            options=self.form.get_account_options(),
            value=account,
            layout=Helpers.basic_layout(),
        )
        self.delete_btn = Helpers.delete_button()

        self.widgets_row = [
            self.name_widget,
            self.amount_widget,
            self.years_widget,
            self.account_dropdown,
            self.delete_btn,
        ]

        self.delete_btn.on_click(self._on_delete)

    def _on_delete(self, b):
        self.form.delete_gift_input(self)

    def update_account_dropdown(self):
        self.account_dropdown.options = self.form.get_account_options()

    def get_data(self):
        return {
            "name": self.name_widget.value,
            "amount": self.amount_widget.value,
            "years": self.years_widget.value,
            "account": self.account_dropdown.value,
        }
