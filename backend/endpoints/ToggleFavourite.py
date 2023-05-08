import os
from pathlib import Path
from sqlite3 import IntegrityError

from AppContext import AppContext
from endpoints.App import App
from flask import jsonify
from PIL import Image


class ToggleFavourite(App):
    def __init__(self):
        super().__init__()

    def run(self, name: str, fav: bool):
        """
        Resizes oldname to sizex by sizey and copies it to newname
        Parameters:
            name (str): name of the old image
            fav (bool): Whether to make this image favourite or not
        """

        try:
            conn = self.getEngine()
            cur = conn.cursor()
            favourite = 0
            if fav:
                favourite = 1

            cur.execute(
                f"""
            UPDATE images SET favourite = {favourite} WHERE (name = "{name}");"""
            )
            conn.commit()
            # lastrowid does not work because update image
            cur.execute(f"""SELECT id, favourite FROM images where name = "{name}" """)
            retval = cur.fetchone()
            conn.close()
        except Exception as e:
            conn.close()
            return jsonify({"STATUS": 500, "Result": str(e)})

            # Fetchone returns a tuple, so we need to extract id out
        return jsonify(
            {"STATUS": 200, "Result": {"id": retval[0], "favourite": retval[1]}}
        )
