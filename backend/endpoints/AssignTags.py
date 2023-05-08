import os
from pathlib import Path
from sqlite3 import IntegrityError
from typing import List

from AppContext import AppContext
from endpoints.App import App
from flask import jsonify
from PIL import Image


class AssignTags(App):
    def __init__(self):
        super().__init__()

    def run(self, tagIDs: List[int], imageID: int):
        """
        Attempts to assign every tag in tags to imageID. If the tag does not exist,
        then ignore it.
        Parameters:
            tagIDs (List[int]): list of tag IDs
            imageID (int): ID of image
        """

        try:
            conn = self.getEngine()
            cur = conn.cursor()
            # add a check for if both imageID and tagID exist and then do something
            for tagID in tagIDs:
                cur.execute(
                    f"""
                INSERT OR IGNORE INTO ImageTags VALUES ({imageID}, {tagID});"""
                )
            conn.commit()
            conn.close()
        except Exception as e:
            conn.close()
            return jsonify({"STATUS": 500, "Result": str(e)})
        return jsonify({"STATUS": 200, "Result": ""})
