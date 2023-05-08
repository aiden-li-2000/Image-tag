from AppContext import AppContext
from endpoints.App import App


class SortBy(App):
    def __init__(self):
        super().__init__()

    def run(self):
        cur = self.getEngine()
