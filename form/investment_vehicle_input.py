from ipywidgets import HBox, Text, FloatText, Button


class InvestmentVehicleInput:
    def __init__(self, form, name="", aagr=0.0, dynamic_mean=0.0, dynamic_std_dev=0.0):
        self.form = form  # Reference to the form instance

        self.name_widget = Text(
            description="Name:", value=name, continuous_update=False
        )
        self.aagr_widget = FloatText(description="AAGR:", value=aagr)
        self.dynamic_mean_widget = FloatText(
            description="Dynamic Mean:", value=dynamic_mean
        )
        self.dynamic_std_dev_widget = FloatText(
            description="Dynamic Std Dev:", value=dynamic_std_dev
        )
        self.delete_btn = Button(description="Delete", button_style="danger")

        self.container = HBox(
            [
                self.name_widget,
                self.aagr_widget,
                self.dynamic_mean_widget,
                self.dynamic_std_dev_widget,
                self.delete_btn,
            ]
        )

        self.delete_btn.on_click(self._on_delete)
        self.name_widget.observe(self._on_name_change, names="value")

    def _on_delete(self, b):
        self.form.delete_investment_vehicle_input(self)
        self.form.update_investment_vehicle_dropdowns()

    def _on_name_change(self, change):
        self.form.update_investment_vehicle_dropdowns()

    def get_data(self):
        return {
            "name": self.name_widget.value,
            "aagr": self.aagr_widget.value,
            "dynamic_mean": self.dynamic_mean_widget.value,
            "dynamic_std_dev": self.dynamic_std_dev_widget.value,
        }
