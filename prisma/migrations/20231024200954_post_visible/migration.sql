-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_blogPost" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "textData" TEXT NOT NULL,
    "postDate" DATETIME NOT NULL,
    "postCreated" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "postUpdated" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "postVisible" BOOLEAN NOT NULL DEFAULT true
);
INSERT INTO "new_blogPost" ("id", "postCreated", "postDate", "postUpdated", "textData", "title") SELECT "id", "postCreated", "postDate", "postUpdated", "textData", "title" FROM "blogPost";
DROP TABLE "blogPost";
ALTER TABLE "new_blogPost" RENAME TO "blogPost";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
