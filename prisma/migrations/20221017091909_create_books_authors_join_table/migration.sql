-- CreateTable
CREATE TABLE "BooksOnAuthors" (
    "authorId" TEXT NOT NULL,
    "bookId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BooksOnAuthors_pkey" PRIMARY KEY ("authorId","bookId")
);

-- AddForeignKey
ALTER TABLE "BooksOnAuthors" ADD CONSTRAINT "BooksOnAuthors_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Author"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BooksOnAuthors" ADD CONSTRAINT "BooksOnAuthors_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
