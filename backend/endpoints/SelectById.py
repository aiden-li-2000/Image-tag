from AppContext import AppContext, imageDict
from endpoints.App import App
from flask import jsonify


class SelectById(App):
    def __init__(self):
        super().__init__()

    def run(self, select_id: int):
        conn = self.getEngine()
        cur = conn.cursor()
        cur.execute(f"SELECT * FROM Images WHERE id={select_id}")
        retval = cur.fetchone()
        conn.close()
        return imageDict(retval)
