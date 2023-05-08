from AppContext import AppContext, imageDict
from endpoints.App import App
from flask import jsonify


class SelectByName(App):
    def __init__(self):
        super().__init__()

    def run(self, name: str):
        conn = self.getEngine()
        cur = conn.cursor()
        cur.execute(
            f"""SELECT * FROM Images WHERE UPPER(name) LIKE UPPER("%{name}%");"""
        )
        lst = cur.fetchall()
        retval = []
        for item in lst:
            retval.append(imageDict(item))
        # return retval
        return jsonify({"data": retval})
