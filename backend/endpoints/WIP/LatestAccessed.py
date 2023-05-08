from AppContext import AppContext
from endpoints.App import App


class LatestAccessed(App):
    def __init__(self):
        super().__init__()

    def run(self):
        cur = self.getEngine()
        # returns list of 5 to 10 images in base64 format
        return []
