from AppContext import AppContext, imageDict
from endpoints.App import App
from flask import jsonify


class AssignedTags(App):
    def __init__(self):
        super().__init__()

    def run(self, select_id: int):
        conn = self.getEngine()
        cur = conn.cursor()
        cur.execute(
            f"SELECT DISTINCT name, tagID FROM ImageTags JOIN tags ON (id = tagID) WHERE imageID={select_id}"
        )
        tagsAssigned = cur.fetchall()
        cur.execute(
            f"SELECT DISTINCT name, ID FROM tags WHERE id NOT IN (SELECT tagID from ImageTags where imageID={select_id})"
        )
        tagsNotAssigned = cur.fetchall()
        conn.close()
        return jsonify(
            {"STATUS": 200, "Assigned": tagsAssigned, "NotAssigned": tagsNotAssigned}
        )
