from results.dynamic_results_displayer import DynamicResultsDisplayer
from results.static_results_table import StaticResultsTable
from results.static_results_plot import StaticResultsPlot
from form.config_form import ConfigForm


class ResultsDisplayer:
    def __init__(self, results, first_year, last_year, mode):
        self.results = results
        self.first_year = first_year
        self.last_year = last_year
        self.mode = mode

    def display(self):
        if self.mode == ConfigForm.DYNAMIC:
            DynamicResultsDisplayer().display(
                first_year=self.first_year,
                last_year=self.last_year,
                results=self.results,
            )
        if self.mode == ConfigForm.STATIC_PLOT:
            StaticResultsPlot().display(
                first_year=self.first_year,
                last_year=self.last_year,
                results=self.results,
            )
        if self.mode == ConfigForm.STATIC_TABLE:
            StaticResultsTable().display(
                first_year=self.first_year,
                last_year=self.last_year,
                results=self.results,
            )
