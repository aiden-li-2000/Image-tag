from AppContext import AppContext
from endpoints.App import App
from flask import jsonify


class UpdateAccessTime(App):
    def __init__(self):
        super().__init__()

    def run(self, select_id: int):
        conn = self.getEngine()
        cur = conn.cursor()
        queryStr = f"""
        UPDATE images SET accessfreq = accessfreq + 1 WHERE (id = {select_id});
        UPDATE images SET accesstime = datetime(CURRENT_TIMESTAMP, 'localtime') WHERE (id = {select_id});"""
        cur.executescript(queryStr)
        conn.commit()
        queryStr = (
            f"""SELECT accessfreq, accesstime FROM images where id={select_id};"""
        )
        cur.execute(queryStr)
        retval = cur.fetchone()
        conn.close()
        return jsonify(
            {
                "STATUS": 200,
                "Result": {"accessfreq": retval[0], "accesstime": retval[1]},
            }
        )
