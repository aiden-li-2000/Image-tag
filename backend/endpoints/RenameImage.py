import os
from pathlib import Path
from sqlite3 import IntegrityError

from AppContext import AppContext
from endpoints.App import App
from flask import jsonify
from PIL import Image


class RenameImage(App):
    def __init__(self):
        super().__init__()

    def run(self, oldname: str, newname: str):
        """
        Resizes oldname to sizex by sizey and copies it to newname
        Parameters:
            oldname (str): name of the old image
            newname (str): name of the new image (must be different from old name)
        """

        try:
            conn = self.getEngine()
            cur = conn.cursor()
            # To do add rollback ops on op fail from python
            cur.execute(
                f"""UPDATE images SET name = "{newname}" WHERE name = "{oldname}";"""
            )

            # if success continue with file rename
            os.rename(
                os.path.join(
                    str(Path(__file__).absolute().parent.parent), "Repo-Chan", oldname
                ),
                os.path.join(
                    str(Path(__file__).absolute().parent.parent), "Repo-Chan", newname
                ),
            )

            # if success continue with sql commit
            conn.commit()

            cur.execute(f"""SELECT id, name FROM images WHERE name = "{newname}";""")
            retval = cur.fetchone()
            conn.close()
            return jsonify(
                {"STATUS": 200, "Result": {"id": retval[0], "name": retval[1]}}
            )
        except IntegrityError as e:
            return jsonify({"STATUS": 400, "Result": str(e)})
        except Exception as e:
            return jsonify({"STATUS": 500, "Result": str(e)})
