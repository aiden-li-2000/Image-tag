import os
from pathlib import Path

from AppContext import AppContext
from endpoints.App import App
from PIL import Image


class AddImage(App):
    def __init__(self):
        super().__init__()

    def run(self, name: str):
        img = Image.open(
            os.path.join(
                str(Path(__file__).absolute().parent.parent), "Repo-Chan", name
            )
        )
        # get width and height
        sizex = img.width
        sizey = img.height
        # creates an object and returns the id of it
        conn = self.getEngine()
        cur = conn.cursor()
        cur.execute(
            f"""
            INSERT INTO images (name, sizex, sizey)
            VALUES (\"{name}\", {sizex}, {sizey});
            """
        )
        conn.commit()
        retval = cur.lastrowid
        conn.close()
        return {"id": retval}
        # lastrowid is the last created object
