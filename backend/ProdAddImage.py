import os
import sys 
import shutil
from pathlib import Path

from AppContext import AppContext
from endpoints.App import App
from PIL import Image


class ProdAddImage(App):
    def __init__(self):
        super().__init__()

    def run(self, indexFile : str):
        with open (indexFile) as file:
            lines = file.readlines()
            for line in lines:
                subdir = "./"
                tags = []
                image = ""
                slash = line.find("/")

                # Consume the full subdirs
                while slash != -1:
                    subdir = subdir + "/" + line[:slash]
                    tags.append(line[:slash])
                    line = line[slash + 1:]
                    slash = line.find("/")
                
                if slash == -1:
                    image = line[:-1]

                imgpath = str(
                    os.path.join(
                        str(Path(__file__).absolute().parent), "prod", subdir, image
                    )
                )

                # This breaks if its a video (webm), but it's the user's fault for putting a video in an image repository
                # But we are not indexing these files so it should be fine for the population of prod dataset
                # This problem is dealt with in the dynamic entry
                img = Image.open(imgpath)

                # get width and height
                sizex = img.width
                sizey = img.height

                print("Processing image: ", imgpath)
                conn = self.getEngine()
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
                for tag in tags:
                    if tag == "tohru" or tag == "jashin chan" or tag == "haruhi" or tag == "kaguya":
                        typeOfTag = "character"
                    else:
                        typeOfTag = "expression"
                    cur.execute(
                        f"""
                        INSERT OR IGNORE INTO tags (name, type)
                        VALUES (\'{tag}\', \'{typeOfTag}\');
                        """
                    )
                    cur.execute(f"SELECT id FROM tags WHERE name = \'{tag}\'")
                    tagId = cur.fetchone()[0]

                    cur.execute(
                        f"""
                        INSERT INTO imageTags VALUES (\"{imageId}\", \"{tagId}\");
                        """
                    )
                conn.commit()

        conn.close()

if __name__ == "__main__":
    ProdAddImage().run("prod.index")
