import os
from pathlib import Path

from AppContext import AppContext
from endpoints.App import App
from flask import jsonify
from PIL import Image


class DeleteImage(App):
    def __init__(self):
        super().__init__()

    def run(self, name: str):
        """
        Parameters
            name (str): name of the image to be deleted (Assumed that it exists)
        """

        try:
            conn = self.getEngine()
            cur = conn.cursor()
            cur.execute(
                f"""
                DELETE FROM images WHERE name = "{name}";
                """
            )
            imgPath = os.path.join(
                str(Path(__file__).absolute().parent.parent), "Repo-Chan", name
            )
            os.remove(imgPath)
            conn.commit()
            conn.close()
        except Exception as e:
            conn.close()
            return jsonify({"STATUS": 500, "Result": str(e)})
        return jsonify({"STATUS": 200, "Result": ""})
