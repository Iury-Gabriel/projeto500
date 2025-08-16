-- CreateTable
CREATE TABLE "Moldes" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "produto1" BOOLEAN NOT NULL,
    "produto2" BOOLEAN NOT NULL,
    "produto3" BOOLEAN NOT NULL,
    "produto4" BOOLEAN NOT NULL,
    "produto5" BOOLEAN NOT NULL,
    "produto6" BOOLEAN NOT NULL,
    "produto7" BOOLEAN NOT NULL,
    "produto8" BOOLEAN NOT NULL,
    "produto9" BOOLEAN NOT NULL,
    "produto10" BOOLEAN NOT NULL,
    "produto11" BOOLEAN NOT NULL,
    "produto12" BOOLEAN NOT NULL,
    "produto13" BOOLEAN NOT NULL,
    "produto14" BOOLEAN NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Moldes_email_key" ON "Moldes"("email");
