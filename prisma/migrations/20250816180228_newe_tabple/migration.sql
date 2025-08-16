-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Moldes" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "produto1" BOOLEAN,
    "produto2" BOOLEAN,
    "produto3" BOOLEAN,
    "produto4" BOOLEAN,
    "produto5" BOOLEAN,
    "produto6" BOOLEAN,
    "produto7" BOOLEAN,
    "produto8" BOOLEAN,
    "produto9" BOOLEAN,
    "produto10" BOOLEAN,
    "produto11" BOOLEAN,
    "produto12" BOOLEAN,
    "produto13" BOOLEAN,
    "produto14" BOOLEAN
);
INSERT INTO "new_Moldes" ("email", "id", "name", "produto1", "produto10", "produto11", "produto12", "produto13", "produto14", "produto2", "produto3", "produto4", "produto5", "produto6", "produto7", "produto8", "produto9") SELECT "email", "id", "name", "produto1", "produto10", "produto11", "produto12", "produto13", "produto14", "produto2", "produto3", "produto4", "produto5", "produto6", "produto7", "produto8", "produto9" FROM "Moldes";
DROP TABLE "Moldes";
ALTER TABLE "new_Moldes" RENAME TO "Moldes";
CREATE UNIQUE INDEX "Moldes_email_key" ON "Moldes"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
