A README file describing how to create and load your sample database; and how to run
your working database-driven application, and what feature it currently supports.


# SnapTag

SnapTag is an art database where users can store and search for images of their favourite artists or characters. 

## Pre-requisites

- Python 3.7
- Install npm and nodejs

## Installation

```bash
pip install requirements.txt
npm install
```

## Usage

How to load sample database to platform:

An empty db will be provided. Use the upload function to add in your own images.

Alternatively, replace the db.sqlite3 file with the sampledb.sqlite3 file in backend/.

To run our application:
```bash
cd front-end
npm start
python backend/script-local-server.py

```


## Features our database supports:

- Rename image: Rename image file to a new name
- Upload image to database: Adds a new image to the database
- Search by name: Search by image name
- Filter by tag: Only show images which have all of these tags
- Delete image: Delete image file
- Resize image: Make a resized copy of the image

## Obtaining and setting up Production Dataset
- Download the dataset [prod.zip](https://drive.google.com/file/d/1XkgZWfiwOQlJV-LKcOmobbbIMSwaL59i/view?usp=share_link) here.
- Unzip and deposit /prod inside /backend (as /backend/prod) and take /prod/prod.index to /backend (as /backend/prod.index)
- run `python ProdAddImage.py`

The database and Repository (Repo-Chan) should both be populated consistently.

Prod.index can be generated from `find * -type f | grep -v .webm` under /prod.
