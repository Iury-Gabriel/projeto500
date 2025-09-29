-- CreateTable
CREATE TABLE "public"."Resinas" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "produto1" BOOLEAN,
    "produto2" BOOLEAN,
    "produto3" BOOLEAN,

    CONSTRAINT "Resinas_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Resinas_email_key" ON "public"."Resinas"("email");
