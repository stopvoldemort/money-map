import ipywidgets as widgets
from ipywidgets import HBox, VBox, Label


class Helpers:
    @staticmethod
    def parse_years(input_string):
        years = set()
        input_string = input_string.replace(" ", "")  # Remove any spaces
        parts = input_string.split(",")

        for part in parts:
            if "-" in part:
                try:
                    start, end = part.split("-")
                    start, end = int(start), int(end)
                    if start > end:
                        start, end = end, start
                    years.update(range(start, end + 1))
                except ValueError:
                    continue  # Skip invalid ranges
            else:
                try:
                    year = int(part)
                    years.add(year)
                except ValueError:
                    continue  # Skip invalid years

        return sorted(years)

    @staticmethod
    def input_layout():
        return widgets.Layout(
            border="solid 0.5px gray", padding="10px", margin="10px", width="auto"
        )

    @staticmethod
    def inputs_layout():
        return widgets.Layout(
            border="solid 2px black",
            padding="0 10px 10px 10px",
            margin="0 10px 10px 10px",
            width="auto",
        )

    @classmethod
    def inputsGroup(cls, h_size, title, input_widgets, add_btn):
        inputs = [widgets.HTML(value="<p>None</p>")]
        if len(input_widgets) > 0:
            inputs = input_widgets

        return VBox(
            [
                widgets.HTML(value=f"<{h_size}>{title}</{h_size}>"),
                *inputs,
                add_btn,
            ],
            layout=cls.inputs_layout(),
        )

    @classmethod
    def inputs_group_v2(cls, h_size, title, grid, add_btn, is_empty=False):
        body = widgets.HTML(value="<p>None</p>")
        if not is_empty:
            body = grid

        return VBox(
            [
                widgets.HTML(value=f"<{h_size}>{title}</{h_size}>"),
                body,
                add_btn,
            ],
            layout=cls.inputs_layout(),
        )

    @staticmethod
    def add_input_button(text):
        return widgets.Button(
            description=text, layout=widgets.Layout(width="fit-content", margin="4px")
        )

    @staticmethod
    def delete_income_button():
        return widgets.Button(
            description="Delete",
            button_style="danger",
            layout=widgets.Layout(width="auto", overflow="visible", margin="4px 8px"),
        )

    @staticmethod
    def field(label, widget):
        return VBox(
            [Label(label), widget],
            layout=widgets.Layout(padding="0 4px"),
            justify_content="flex-start",
        )
