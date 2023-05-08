import os
import sqlite3
from pathlib import Path
from sqlite3 import Connection, Error

database = "db.sqlite3"


def create_connection(db_file: str):
    """create a database connection to the SQLite database
        specified by the db_file
    :param db_file: database file
    :return: Connection object or None
    """
    conn = None
    try:
        conn = sqlite3.connect(db_file)
    except Error as e:
        print(e)

    return conn


class AppContext:
    def __init__(self):
        # Database should be under backend/
        dbpath = os.path.join(str(Path(__file__).absolute().parent), database)
        self.conn = create_connection(dbpath)

    def getConnection(self):
        self.conn.execute("PRAGMA foreign_keys = ON")
        return self.conn


def imageDict(vals: tuple):
    keys = [
        "id",
        "name",
        "genre",
        "createtime",
        "accesstime",
        "accessfreq",
        "sizeX",
        "sizeY",
        "artist",
        "favourite",
        "NSFW",
    ]
    retval = {}
    for i in range(len(vals)):
        retval[keys[i]] = vals[i]
    return retval
