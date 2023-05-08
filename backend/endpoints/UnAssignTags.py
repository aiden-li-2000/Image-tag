import os
from pathlib import Path
from sqlite3 import IntegrityError
from typing import List

from AppContext import AppContext
from endpoints.App import App
from flask import jsonify
from PIL import Image


class UnAssignTags(App):
    def __init__(self):
        super().__init__()

    def run(self, tagIDs: List[int], imageID: int):
        """
        Attempts to unassign every tag in tags from name. If the tag does not exist,
        then ignore it.
        Parameters:
            tagIDs (List[int]): list of tags
            imageID (int): Name of image
        """

        try:
            conn = self.getEngine()
            cur = conn.cursor()
            for tagID in tagIDs:
                cur.execute(
                    f"""
                DELETE FROM ImageTags WHERE (imageID = {imageID}) AND (tagID = {tagID});"""
                )
                # cannot use lastrowid because not insert
            conn.commit()
            conn.close()
        except Exception as e:
            conn.close()
            return jsonify({"STATUS": 500, "Result": str(e)})
        return jsonify({"STATUS": 200, "Result": ""})
