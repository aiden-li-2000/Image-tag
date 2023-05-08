from AppContext import AppContext, imageDict
from endpoints.App import App


class SelectByKeyword(App):
    def __init__(self):
        super().__init__()

    def run(self, keywords):
        """
        Parameters
            keywords (List[str]): A list of case-sensitive keywords to search for
            in the names of images (must match all keywords)
        """
        conn = self.getEngine()
        cur = conn.cursor()
        queryStr = f"""SELECT * FROM images WHERE """
        for k in keywords:
            # Throw in keywords from input somehow
            queryStr += ' name LIKE "%' + k + '%" AND'
        queryStr = queryStr[:-4] + ";"
        cur.execute(queryStr)
        lst = cur.fetchall()
        retval = []
        for item in lst:
            retval.append(imageDict(item))
        return retval
