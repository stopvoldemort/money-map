import ipywidgets as widgets
from ipywidgets import HBox, VBox, Label


class Helpers:
    @staticmethod
    def input_layout():
        return widgets.Layout(
            border="solid 0.5px gray", padding="10px", margin="10px", width="auto"
        )

    @staticmethod
    def inputs_group(title, input_widgets, add_btn, is_empty=False):
        body = widgets.HTML(value="<p>None</p>")
        if not is_empty:
            body = input_widgets

        return VBox(
            [
                widgets.HTML(value=f"<h2>{title}</h2>"),
                body,
                add_btn,
            ],
            layout=widgets.Layout(
                border="solid 2px black",
                padding="0 10px 10px 10px",
                margin="0 10px 10px 10px",
                width="auto",
            ),
        )

    @staticmethod
    def account_inputs_group(title, account_inputs, add_btn, is_empty=False):
        body = widgets.HTML(value="<p>None</p>")
        if not is_empty:
            body = [account_input.container for account_input in account_inputs]

        return VBox(
            [
                widgets.HTML(value=f"<h2>{title}</h2>"),
                *body,
                add_btn,
            ],
            layout=widgets.Layout(
                border="solid 2px black",
                padding="0 10px 10px 10px",
                margin="0 10px 10px 10px",
                width="auto",
            ),
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

    @staticmethod
    def update_dropdown_fields(dropdown, options):
        if dropdown.value not in options:
            dropdown.value = None
        dropdown.options = options
