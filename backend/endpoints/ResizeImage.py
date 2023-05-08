import os
from pathlib import Path
from sqlite3 import IntegrityError

from AppContext import AppContext
from endpoints.App import App
from flask import jsonify
from PIL import Image


class ResizeImage(App):
    def __init__(self):
        super().__init__()

    def run(self, oldname: str, newname: str, sizex: int, sizey: int):
        """
        Resizes oldname to sizex by sizey and copies it to newname
        Parameters:
            oldname (str): name of the old image
            newname (str): name of the new image (must be different from old name)
            SizeX and SizeY are assumed to be positive
        """
        if sizex <= 0 or sizey <= 0:
            return jsonify(
                {"STATUS": 400, "Result": "One of your size parameters is negative!"}
            )

        try:
            conn = self.getEngine()
            cur = conn.cursor()
            cur.executescript(
                f"""
            BEGIN TRANSACTION;

            INSERT OR FAIL INTO images (name, sizeX, sizeY) VALUES ("{newname}", {sizex}, {sizey});

            UPDATE images SET
                genre = (SELECT genre FROM images WHERE name = "{oldname}"),
                artist = (SELECT artist FROM images WHERE name = "{oldname}")
            WHERE name = "{newname}";
            
            INSERT INTO ImageTags 
                SELECT id, tagID FROM (SELECT id FROM images WHERE name = "{newname}")
                JOIN (SELECT tagID FROM ImageTags WHERE imageID in 
                (SELECT id FROM images WHERE name= "{oldname}"));
            """
            )

            # if success continue with file io ops
            # File resize
            oldimg = Image.open(
                os.path.join(
                    str(Path(__file__).absolute().parent.parent), "Repo-Chan", oldname
                )
            )
            newimg = oldimg.copy()

            # resize
            newimg = newimg.resize((sizex, sizey))
            newimg.save(
                os.path.join(
                    str(Path(__file__).absolute().parent.parent), "Repo-Chan", newname
                )
            )

            conn.commit()
            # lastrowid does not work because multiple statements executed
            cur.execute(f"""SELECT id FROM images where name = "{newname}" """)
            retval = cur.fetchone()[0]
            # Fetchone returns a tuple, so we need to extract id out
            conn.close()
        except IntegrityError as e:
            conn.close()
            # Delete not needed because the name already exists in the database
            # We do not want to accidentally delete an existing file
            return jsonify({"STATUS": 400, "Result": str(e)})
        except Exception as e:
            conn.close()
            os.remove(
                os.path.join(
                    str(Path(__file__).absolute().parent.parent), "Repo-Chan", newname
                )
            )
            return jsonify({"STATUS": 500, "Result": str(e)})
        return jsonify({"STATUS": 200, "Result": {"id": retval}})
