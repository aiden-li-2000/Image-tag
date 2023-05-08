from AppContext import AppContext, imageDict
from endpoints.App import App
from flask import jsonify


class SelectAll(App):
    def __init__(self):
        super().__init__()

    def run(self, len: int, orderby: str, order: bool):
        # string ORDERBY is a sortable attribute in Image Table
        # order is 0 = DESC, 1 = ASC
        # Select len amount of images
        conn = self.getEngine()
        cur = conn.cursor()
        queryStr = f"""SELECT * FROM Images """
        if orderby != "":
            queryStr += " ORDER BY "
            queryStr += orderby
            if order:
                queryStr += " ASC "
            else:
                queryStr += " DESC "
        queryStr += f"""LIMIT {len};"""
        cur.execute(queryStr)
        lst = cur.fetchall()
        retval = []
        for item in lst:
            retval.append(imageDict(item))
        conn.close()
        return jsonify({"data": retval})