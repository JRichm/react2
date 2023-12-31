-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "userCreated" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userUpdated" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "blogPost" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "textData" TEXT NOT NULL,
    "postDate" DATETIME NOT NULL,
    "postCreated" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "postUpdated" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
