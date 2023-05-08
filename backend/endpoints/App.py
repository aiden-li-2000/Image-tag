from abc import ABC, abstractmethod

from AppContext import AppContext


class App(ABC):
    def __init__(self):
        self.appctx = AppContext()

    @abstractmethod
    def run(self, other_parameters):
        pass
        # i genuinely don't remember how abstract classes in python work

    def getEngine(self):
        return self.appctx.getConnection()
        # somehow get access to the sqlite engine
