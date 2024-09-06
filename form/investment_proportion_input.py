from ipywidgets import widgets, HBox


class InvestmentProportionInput:
    def __init__(
        self, form, parent_distribution_input, investment_vehicle=None, proportion=0.0
    ):
        self.form = form
        self.parent_distribution_input = parent_distribution_input  # Reference to the parent InvestmentDistributionInput

        self.investment_widget = widgets.Dropdown(
            options=self.form.get_investment_vehicle_options(),
            description="Vehicle:",
            value=investment_vehicle,
        )
        self.proportion_widget = widgets.FloatText(
            description="Proportion:", value=proportion
        )
        self.delete_btn = widgets.Button(description="Delete", button_style="danger")

        self.container = HBox(
            [
                self.investment_widget,
                self.proportion_widget,
                self.delete_btn,
            ]
        )

        self.delete_btn.on_click(self._on_delete)

    def _on_delete(self, b):
        self.parent_distribution_input.delete_investment_proportion_input(self)

    def get_data(self):
        return {
            "investment_vehicle": self.investment_widget.value,
            "proportion": self.proportion_widget.value,
        }
