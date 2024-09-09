import ipywidgets as widgets
from ipywidgets import HBox, VBox, Label


class Helpers:
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

    # This should be applied to all widgets that are in a grid -- otherwise, grid will not display properly
    @staticmethod
    def basic_layout():
        return widgets.Layout(width="auto")

    @staticmethod
    def simple_grid(inputs, label_text):
        grid_elements = []
        labels = [
            widgets.Label(
                value=l,
                layout=widgets.Layout(
                    overflow="visible",
                    word_wrap="break-word",
                    white_space="normal",
                    align_self="center",
                    text_align="center",
                ),
            )
            for l in label_text
        ]

        grid_elements.extend(labels)

        for input in inputs:
            grid_elements.extend(input.widgets_row)

        return widgets.GridBox(
            children=grid_elements,
            layout=widgets.Layout(
                width="100%",
                grid_template_columns=f"repeat({len(label_text)}, minmax(150px, 1fr))",
                grid_gap="10px 10px",
                overflow="auto",
            ),
        )

    @staticmethod
    def add_input_button(text):
        return widgets.Button(
            description=text,
            layout=widgets.Layout(width="fit-content", margin="4px 0"),
        )

    @staticmethod
    def delete_button():
        return widgets.Button(description="Delete", button_style="danger")

    @staticmethod
    def field(label, widget):
        return VBox(
            [Label(label), widget],
            layout=widgets.Layout(padding="0 4px"),
            justify_content="flex-start",
        )
