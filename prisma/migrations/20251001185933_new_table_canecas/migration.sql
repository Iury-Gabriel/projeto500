-- CreateTable
CREATE TABLE "public"."Canecas" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "produto1" BOOLEAN,
    "produto2" BOOLEAN,
    "produto3" BOOLEAN,
    "produto4" BOOLEAN,
    "produto5" BOOLEAN,

    CONSTRAINT "Canecas_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Canecas_email_key" ON "public"."Canecas"("email");
