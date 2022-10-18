-- DropForeignKey
ALTER TABLE "BooksOnAuthors" DROP CONSTRAINT "BooksOnAuthors_authorId_fkey";

-- DropForeignKey
ALTER TABLE "BooksOnAuthors" DROP CONSTRAINT "BooksOnAuthors_bookId_fkey";

-- AddForeignKey
ALTER TABLE "BooksOnAuthors" ADD CONSTRAINT "BooksOnAuthors_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Author"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BooksOnAuthors" ADD CONSTRAINT "BooksOnAuthors_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE CASCADE ON UPDATE CASCADE;
