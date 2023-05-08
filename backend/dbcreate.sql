PRAGMA foreign_keys = ON;
CREATE TABLE IF NOT EXISTS images (id INTEGER PRIMARY KEY, name varchar UNIQUE NOT NULL, genre varchar, createtime timestamp DEFAULT(datetime(CURRENT_TIMESTAMP, 'localtime')), accesstime timestamp DEFAULT(datetime(CURRENT_TIMESTAMP, 'localtime')), accessfreq int DEFAULT(0) CHECK (accessfreq > -1), sizeX int CHECK(sizeX > 0), sizeY int CHECK(sizeY > 0), artist varchar, favourite int default(0) check (favourite = 0 or favourite = 1));

CREATE TABLE IF NOT EXISTS tags (id INTEGER PRIMARY KEY, name varchar NOT NULL, type varchar CHECK(type = "character" OR type = "show" OR type = "expression") NOT NULL);

CREATE INDEX accfreq ON images (accessfreq);
CREATE INDEX acctime ON images (accesstime);
CREATE INDEX cretime ON images (createtime);
-- CREATE TABLE IF NOT EXISTS resizeOptions(name varchar PRIMARY KEY, sizeX int NOT NULL CHECK(sizeX > 0), sizeY int NOT NULL CHECK(sizeY > 0));

-- CREATE TABLE IF NOT EXISTS BatchEditOption (pattern varchar PRIMARY KEY, option varchar NOT NULL DEFAULT('apply') CHECK (option = "apply" OR option = "unapply"));



-- CREATE TABLE IF NOT EXISTS BatchTags (pattern varchar NOT NULL, tagID int NOT NULL, PRIMARY KEY (pattern, tagID), FOREIGN KEY (pattern) REFERENCES BatchEditOption(pattern) ON UPDATE CASCADE ON DELETE CASCADE, FOREIGN KEY (tagID) REFERENCES tags(id) ON UPDATE CASCADE ON DELETE CASCADE);

CREATE TABLE IF NOT EXISTS ImageTags(imageID int NOT NULL, tagID int NOT NULL, PRIMARY KEY(imageID, tagID), FOREIGN KEY(imageID) REFERENCES images(id) ON UPDATE CASCADE ON DELETE CASCADE, FOREIGN KEY (tagID) REFERENCES tags(id) ON UPDATE CASCADE ON DELETE CASCADE);

-- CREATE TABLE IF NOT EXISTS ImageResizeOptions(ResizeName varchar NOT NULL, ImageID int NOT NULL, PRIMARY KEY(ResizeName, ImageID), FOREIGN KEY(ResizeName) REFERENCES BatchEditOption(pattern) ON UPDATE CASCADE ON DELETE CASCADE, FOREIGN KEY (ImageID) REFERENCES images(id) ON UPDATE CASCADE ON DELETE CASCADE);

