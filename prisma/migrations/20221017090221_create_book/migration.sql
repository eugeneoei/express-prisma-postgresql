-- CreateTable
CREATE TABLE "Book" (
    "id" TEXT NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "synopsis" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Book_pkey" PRIMARY KEY ("id")
);
