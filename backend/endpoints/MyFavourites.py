from AppContext import AppContext, imageDict
from endpoints.App import App
from flask import jsonify

class MyFavourites(App):
    def __init__(self):
        super().__init__()

    def run(self):
        conn = self.getEngine()
        cur = conn.cursor()
        queryStr = f"""SELECT * FROM images WHERE favourite=1"""
        cur.execute(queryStr)
        lst = cur.fetchall()
        retval = []
        for item in lst:
            retval.append(imageDict(item))
        # return retval
        return jsonify({"data": retval})
