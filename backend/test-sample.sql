
-- Feature 1: Rename
UPDATE images SET name = "reimu_angry.jpg" WHERE (name = "reimu_annoyed.jpg");

-- Feature 2: Upload Image, i.e. insert into repository and insert entry into database
INSERT INTO images (name, sizex, sizey) VALUES ("reimu_annoyed.jpg", 225, 225);

-- Feature 3: Select by Pattern (fuzzy keyword search)
SELECT name FROM images WHERE name LIKE "%thonk%";

-- Feature 4: Tag Filter (AND MODE)--
SELECT name FROM images WHERE id IN (
  SELECT imageID FROM imageTags AS IT1 WHERE NOT EXISTS (
    SELECT id FROM tags WHERE name = "reimu" OR name = "thonk"
    EXCEPT 
    SELECT tagID FROM imageTags AS IT2 WHERE IT1.ImageID = IT2.ImageID));

-- Feature 5: Delete
DELETE FROM images WHERE (name = "reimu_annoyed.jpg");

-- Feature 6: Resize and make copy
BEGIN TRANSACTION;

  INSERT OR FAIL INTO images (name, sizeX, sizeY) VALUES ("reimu_very_annoyed.jpg", 225, 225);

  UPDATE images SET
    genre = (SELECT genre FROM images WHERE name = "reimu_annoyed.jpg"),
    artist = (SELECT artist FROM images WHERE name = "reimu_annoyed.jpg")
  WHERE name = "reimu_very_annoyed.jpg";
  
  INSERT INTO ImageTags 
                SELECT id, tagID FROM (SELECT id FROM images WHERE name = "reimu_very_annoyed.jpg")
                JOIN (SELECT * FROM ImageTags WHERE imageID in 
                (SELECT id FROM images WHERE name= "reimu_annoyed.jpg"));
COMMIT;
