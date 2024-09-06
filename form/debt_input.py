from ipywidgets import widgets, HBox
from form.helpers import Helpers


class DebtInput:
    def __init__(self, form, name: str = "", amount: float = 0.0, aagr: float = 0.0):
        self.form = form  # Reference to the form instance

        self.name_widget = widgets.Text(value=name)
        self.amount_widget = widgets.FloatText(value=amount)
        self.aagr_widget = widgets.BoundedFloatText(
            min=0.0,
            max=1.0,
            step=0.001,
            value=aagr,
        )
        self.delete_btn = widgets.Button(description="Delete", button_style="danger")

        self.delete_btn.on_click(self._on_delete)

        self.widgets_row = [
            self.name_widget,
            self.amount_widget,
            self.aagr_widget,
            self.delete_btn,
        ]

    @staticmethod
    def grid(inputs):
        grid_elements = []

        label_text = [
            "Name",
            "Amount",
            "AAGR",
            "",
        ]
        labels = [
            widgets.Label(
                value=l,
                layout=widgets.Layout(
                    overflow="visible", word_wrap="break-word", white_space="normal"
                ),
            )
            for l in label_text
        ]

        grid_elements.extend(labels)

        for d in inputs:
            grid_elements.extend(d.widgets_row)

        return widgets.GridBox(
            children=grid_elements,
            layout=widgets.Layout(
                width="100%",  # Limit the width of the entire grid to fit the screen
                grid_template_columns=f"repeat({len(label_text)}, minmax(100px, 200px))",  # Adjust columns as needed
                grid_gap="10px 10px",  # Spacing between rows and columns
                overflow="auto",  # Allow horizontal scrolling if necessary
            ),
        )

    def _on_delete(self, b):
        self.form.delete_debt_input(self)

    def get_data(self):
        return {
            "name": self.name_widget.value,
            "amount": self.amount_widget.value,
            "aagr": self.aagr_widget.value,
        }
