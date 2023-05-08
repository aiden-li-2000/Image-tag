from AppContext import AppContext, imageDict
from endpoints.App import App
from flask import jsonify


class TagFilter(App):
    def __init__(self):
        super().__init__()

    def run(self, tags, favourite=0, mode=0, orderby="", order="ASC"):
        """
        Parameters
            tags (List[str]): A list of case-sensitive tags to search for
            in the names of images (must match all keywords)
            favourite: bool to indicate whether to select from favourite or not
            mode: bool to indicate whether And mode (0) or Or mode (1)
            orderby: attribute (in image table) to order by
            order: "ASC" or "DESC"
        """
        conn = self.getEngine()
        cur = conn.cursor()
        queryStr = f"""SELECT * FROM images WHERE """
        if favourite:
            queryStr += "favourite = TRUE AND "

        if mode == 0:
            # AND mode
            queryStr += f"""id IN (
            SELECT imageID FROM imageTags AS IT1 WHERE NOT EXISTS (
            SELECT id FROM tags WHERE"""
            for tag in tags:
                # Throw in keywords from input somehow
                queryStr += ' name ="' + tag + '" OR'
            queryStr = (
                queryStr[:-3]
                + f"""
            EXCEPT
            SELECT tagID FROM imageTags AS IT2 WHERE IT1.ImageID = IT2.ImageID));"""
            )
        else:
            # OR mode
            queryStr += f"""id IN (SELECT imageID FROM imageTags WHERE tagID IN (SELECT id FROM tags WHERE """
            for tag in tags:
                # Throw in keywords from input somehow
                queryStr += ' name ="' + tag + '" OR'
            queryStr = queryStr[:-3] + "));"
        if orderby != "":
            queryStr = queryStr[:-1] + f""" ORDER BY {orderby} {order};"""
        cur.execute(queryStr)
        lst = cur.fetchall()
        retval = []
        for item in lst:
            retval.append(imageDict(item))
        # return retval
        return jsonify({"STATUS": 200, "data": retval})
