import sqlite3
from sqlite3 import Connection, Error

from AppContext import AppContext
from endpoints.AddImage import AddImage
from endpoints.AssignedTags import AssignedTags
from endpoints.AssignTags import AssignTags
from endpoints.DeleteImage import DeleteImage
from endpoints.MyFavourites import MyFavourites
from endpoints.RenameImage import RenameImage
from endpoints.ResizeImage import ResizeImage
from endpoints.SelectAll import SelectAll
from endpoints.SelectById import SelectById
from endpoints.SelectByKeyword import SelectByKeyword
from endpoints.SelectByName import SelectByName
from endpoints.TagFilter import TagFilter
from endpoints.ToggleFavourite import ToggleFavourite
from endpoints.UnAssignTags import UnAssignTags
from endpoints.UpdateAccessTime import UpdateAccessTime
from flask import Flask, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


@app.route("/filterbytags", methods=["POST"])
def filterbytags():
    # pass in request data thru request.json
    request_data = request.get_json()
    return TagFilter().run(
        tags=request_data["tags"],
        favourite=request_data["favourite"],
        mode=request_data["mode"],
        orderby=request_data.get("orderby", ""),
        order=request_data.get("order", "ASC"),
    )


@app.route("/selectid", methods=["GET"])
def selectid():
    # pass in request data thru request.args
    request_data = request.args
    return SelectById().run(request_data["id"])


@app.route("/selectname", methods=["POST"])
def selectname():
    # pass in request data thru request.args
    request_data = request.get_json()
    return SelectByName().run(request_data["name"])


@app.route("/searchkeywords", methods=["POST"])
def searchkeywords():
    # pass in request data thru request.json
    request_data = request.get_json()
    return SelectByKeyword().run(request_data["keywords"])


@app.route("/selectallimages", methods=["GET"])
def selectallimages():
    # Orderby and order are optional parameters
    request_data = request.args
    return SelectAll().run(
        len=request_data["len"],
        orderby=request_data.get("orderby", ""),
        order=request_data.get("order", 0),
    )


@app.route("/upload", methods=["POST"])
def upload():
    # pass in request data thru request.json
    request_data = request.get_json()
    return AddImage().run(request_data["name"])


@app.route("/updateaccess", methods=["POST"])
def updateaccess():
    # pass in request data thru request.json
    request_data = request.get_json()
    return UpdateAccessTime().run(request_data["id"])


@app.route("/resize", methods=["POST"])
def resizeimage():
    # pass in request data thru request.json
    request_data = request.get_json()
    return ResizeImage().run(
        oldname=request_data["oldname"],
        sizex=request_data["sizex"],
        sizey=request_data["sizey"],
        newname=request_data["newname"],
    )


@app.route("/rename", methods=["POST"])
def renameimage():
    # pass in request data thru request.json
    request_data = request.get_json()
    return RenameImage().run(
        oldname=request_data["oldname"], newname=request_data["newname"]
    )


@app.route("/delete", methods=["POST"])
def deleteimage():
    # pass in request data thru request.json
    request_data = request.get_json()
    return DeleteImage().run(request_data["name"])


@app.route("/togglefav", methods=["POST"])
def togglefav():
    # pass in request data thru request.json
    request_data = request.get_json()
    return ToggleFavourite().run(name=request_data["name"], fav=request_data["fav"])


@app.route("/getfavourites", methods=["GET"])
def getfavourites():
    return MyFavourites().run()


@app.route("/assigntags", methods=["POST"])
def assigntags():
    # pass in request data thru request.json
    request_data = request.get_json()
    return AssignTags().run(
        tagIDs=request_data["tagIDs"], imageID=request_data["imageID"]
    )


@app.route("/assignedtags", methods=["POST"])
def assignedtags():
    # pass in request data thru request.json
    request_data = request.get_json()
    return AssignedTags().run(select_id=request_data["imageID"])


@app.route("/unassigntags", methods=["POST"])
def unassigntags():
    # pass in request data thru request.json
    request_data = request.get_json()
    return UnAssignTags().run(
        tagIDs=request_data["tagIDs"], imageID=request_data["imageID"]
    )


if __name__ == "__main__":
    app.run()
