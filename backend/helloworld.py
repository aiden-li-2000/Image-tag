import sqlite3
from sqlite3 import Connection, Error

from flask import Flask, request

app = Flask(__name__)


@app.route("/test")
def hello():
    return "Hello World!"


@app.route("/searchname", methods=["POST"])
def searchname():
    request_data = request.get_json()
    return "Hello " + request_data.get("name", "[no name found?]") + "!"


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


def main():
    database = input()
    # database = "db.sqlite3"

    # create a database connection
    conn = create_connection(database)
    with conn:
        cur = conn.cursor()
        cur.execute("SELECT * FROM instructor;")
        rows = cur.fetchall()
        for row in rows:
            print(row)

        conn.cursor().execute(
            f"""insert into instructor
			select ID, name, dept_name, 30000
			from student
			where dept_name = 'Computer Science' and
			(name = "Timothy" or name = "Robert" or name = "Stella" or name = "Aiden")
			and tot_cred > 20;
		"""
        )
        conn.commit()

        cur.execute(
            f"""SELECT
        course_id, title FROM course WHERE
        dept_name = "Computer Science" and
        credits >= 2 and
        course_id > 400;
        """
        )
        # cur.execute("SELECT * FROM course;")
        rows = cur.fetchall()
        for row in rows:
            print(row)


if __name__ == "__main__":
    # main() # DB Code
    app.run()
