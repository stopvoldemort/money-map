from ipywidgets import widgets
from form.helpers import Helpers


class HousePurchaseInput:
    column_labels = [
        "Price",
        "Mortgage rate",
        "Purchase year",
        "Loan term (years)",
        "Mortgage payments from",
        "Down payment from",
        "Down payment (0.2 = 20%)",
        "Property tax rate (0.0071 = 0.71%)",
        "",
    ]

    def __init__(
        self,
        form,
        home_price: int = 500000,
        annual_interest_rate: float = 0.065,
        first_year: int = 2024,
        loan_term_years: int = 30,
        mortgage_acct_src=None,
        down_payment_acct_src=None,
        down_payment_proportion: float = 0.20,
        property_tax_rate: float = 0.0071,
    ):
        self.form = form
        self.last_year = 2070

        self.home_price_widget = widgets.IntText(
            value=home_price, layout=Helpers.basic_layout()
        )
        self.annual_interest_rate_widget = widgets.BoundedFloatText(
            min=0.0,
            max=1.0,
            step=0.0001,
            value=annual_interest_rate,
            layout=Helpers.basic_layout(),
        )

        self.first_year_widget = widgets.BoundedIntText(
            value=first_year, min=2024, max=2070, layout=Helpers.basic_layout()
        )

        self.loan_term_years_widget = widgets.BoundedIntText(
            value=loan_term_years, min=0, max=30, layout=Helpers.basic_layout()
        )

        self.mortgage_acct_src_widget = widgets.Dropdown(
            options=self.form.get_account_options(),
            value=mortgage_acct_src,
            layout=Helpers.basic_layout(),
        )

        self.down_payment_acct_src_widget = widgets.Dropdown(
            options=self.form.get_account_options(),
            value=down_payment_acct_src,
            layout=Helpers.basic_layout(),
        )

        self.down_payment_proportion_widget = widgets.BoundedFloatText(
            min=0.0,
            max=1.0,
            step=0.01,
            value=down_payment_proportion,
            layout=Helpers.basic_layout(),
        )

        self.property_tax_rate_widget = widgets.BoundedFloatText(
            min=0.0,
            max=1.0,
            step=0.0001,
            value=property_tax_rate,
            layout=Helpers.basic_layout(),
        )

        self.delete_btn = Helpers.delete_button()
        self.delete_btn.on_click(self._on_delete)

        self.widgets_row = [
            self.home_price_widget,
            self.annual_interest_rate_widget,
            self.first_year_widget,
            self.loan_term_years_widget,
            self.mortgage_acct_src_widget,
            self.down_payment_acct_src_widget,
            self.down_payment_proportion_widget,
            self.property_tax_rate_widget,
            self.delete_btn,
        ]

    def _on_delete(self, b):
        self.form.delete_house_purchase_input(self)

    def get_data(self):
        return {
            "home_price": self.home_price_widget.value,
            "annual_interest_rate": self.annual_interest_rate_widget.value,
            "first_year": self.first_year_widget.value,
            "last_year": self.last_year,
            "loan_term_years": self.loan_term_years_widget.value,
            "mortgage_acct_src": self.mortgage_acct_src_widget.value,
            "down_payment_acct_src": self.down_payment_acct_src_widget.value,
            "down_payment_proportion": self.down_payment_proportion_widget.value,
            "property_tax_rate": self.property_tax_rate_widget.value,
        }
