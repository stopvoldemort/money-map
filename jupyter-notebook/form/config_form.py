import ipywidgets as widgets
from IPython.display import display


class ConfigForm:
    STATIC_PLOT = "Static - plot"
    STATIC_TABLE = "Static - table"
    DYNAMIC = "Dynamic"

    def __init__(self):
        self.mode_widget = widgets.RadioButtons(
            options=[
                ConfigForm.STATIC_PLOT,
                ConfigForm.STATIC_TABLE,
                ConfigForm.DYNAMIC,
            ],
            value=ConfigForm.STATIC_PLOT,
            description="Mode:",
            disabled=False,
        )

        self.first_year_widget = widgets.IntText(
            value=2024, description="First Year:", disabled=True
        )

        self.last_year_widget = widgets.IntText(
            value=2070, description="Last Year:", disabled=True
        )

    def display(self):
        display(
            widgets.HBox(
                [self.mode_widget, self.first_year_widget, self.last_year_widget]
            )
        )

    def get_all_data(self) -> dict:
        return {
            "mode": self.mode_widget.value,
            "first_year": self.first_year_widget.value,
            "last_year": self.last_year_widget.value,
        }
