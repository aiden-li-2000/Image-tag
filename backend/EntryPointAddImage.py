import os
import sys 
import shutil
from pathlib import Path
from os import listdir
from os.path import isfile, join

from AppContext import AppContext
from endpoints.App import App
from PIL import Image


class EntryPointAddImage(App):
    def __init__(self):
        super().__init__()

    def run(self):
        entryPoint = os.path.join(str(Path(__file__).absolute().parent), "entrypoint")
        files = [f for f in os.listdir(entryPoint) if isfile(join(entryPoint, f))]
        invalidEntries = []
        openedConn = False
        

        for image in files:

            imgpath = str(
                os.path.join(
                    str(Path(__file__).absolute().parent), "entrypoint", image
                )
            )
        
            try:
                img = Image.open(imgpath)

                # get width and height
                sizex = img.width
                sizey = img.height

                print("Processing image: ", imgpath)
                conn = self.getEngine()
                openedConn = True
                cur = conn.cursor()
                cur.execute(
                    f"""
                    INSERT INTO images (name, sizex, sizey)
                    VALUES (\"{image}\", {sizex}, {sizey});
                    """
                )
                cur.execute(f"SELECT id FROM images WHERE name = \'{image}\'")
                imageId = cur.fetchone()[0]
                
                shutil.copy2(imgpath, os.path.join(Path(__file__).absolute().parent, "Repo-Chan"))
                os.remove(imgpath)
                conn.commit()
            except Exception:
                print(image, ": This is not an image!")
                invalidEntries.append(image)

        if openedConn:
            conn.close()
        return invalidEntries;

if __name__ == "__main__":
    EntryPointAddImage().run()
