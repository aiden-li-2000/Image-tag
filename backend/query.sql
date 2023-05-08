-- Feature 0: Display n images as is (in no particular order)
SELECT name FROM images LIMIT n; 

-- Feature 1: Rename
UPDATE images SET name = "newname" WHERE (name = "OldName");

-- Feature 2: Upload Image, i.e. insert into repository and insert entry into database
INSERT INTO images (name, sizex, sizey) VALUES ("Name", sizeX, sizeY);

-- Feature 3: Select by Pattern (fuzzy keyword search)
SELECT * FROM images WHERE name LIKE "%pattern1%" AND name LIKE "%pattern2%"; --Select by keyword--

-- Feature 4: Tag Filter (AND MODE)--
SELECT * FROM images WHERE 
  favourite = 0 AND -- favourite if set, comment out if not set
  id IN (
  SELECT imageID FROM imageTags AS IT1 WHERE 
  AND 
  NOT EXISTS (
    SELECT id FROM tags WHERE name = "reimu" OR name = "thonk"
    EXCEPT 
    SELECT tagID FROM imageTags AS IT2 WHERE IT1.ImageID = IT2.ImageID))
    ORDER BY attribute ASC;

-- Feature 5: Delete
DELETE FROM images WHERE (id = 1);
DELETE FROM images WHERE (name = "This");

-- Feature 6: Resize and make copy
BEGIN TRANSACTION;

  INSERT OR FAIL INTO images (name, sizeX, sizeY) VALUES ("ResizedName", sizeX, sizeY);

  UPDATE images SET
    genre = (SELECT genre FROM images WHERE name = "OldName"),
    artist = (SELECT artist FROM images WHERE name = "OldName")
  WHERE name = "ResizedName";
  
  INSERT INTO ImageTags 
                SELECT id, tagID FROM (SELECT id FROM images WHERE name = "ResizedName")
                JOIN (SELECT * FROM ImageTags WHERE imageID in 
                (SELECT id FROM images WHERE name = "OldName"));
COMMIT;


-- Fancy Feature: Sort by
SELECT * FROM images ORDER BY accesstime ASC;

-- Fancy Feature: Tag Manip: Add Tags
INSERT INTO tags (name, expression) VALUES ("default", "character");

-- Fancy Feature: Tag Manip: Assign Tags to Images:
INSERT INTO ImageTags VALUES (imageID, tagID);

-- Fancy Feature: Tag Manip: Delete tag
DELETE FROM Tags (name) WHERE (name = "This");
DELETE FROM Tags (id) WHERE (id = 1);

-- Fancy Feature: Tag Manip: Unassign tag
DELETE FROM imageToTags WHERE (imageID = id) AND (tagID = id);

-- Fancy Feature: (OR Mode Filter by Tag) --
SELECT name FROM images WHERE 
favourite = 0 -- favourite
AND 
id IN (SELECT imageID FROM imageTags WHERE tagID IN (SELECT id FROM tags WHERE name = "reimu" OR name = "thonk"));

-- Fancy Feature: Favourites --
UPDATE images SET favourite = 1 WHERE (id = 1); -- set favourite
UPDATE images SET favourite = 0 WHERE (id = 1); -- unset favourite

-- Fancy Feature: Update time & freq
UPDATE images SET accessfreq = accessfreq + 1 WHERE (id = select_id);
UPDATE images SET accesstime = datetime(CURRENT_TIMESTAMP, 'localtime') WHERE (id = select_id);

