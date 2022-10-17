-- DropForeignKey
ALTER TABLE "BooksOnAuthors" DROP CONSTRAINT "BooksOnAuthors_authorId_fkey";

-- DropForeignKey
ALTER TABLE "BooksOnAuthors" DROP CONSTRAINT "BooksOnAuthors_bookId_fkey";

-- DropTable
DROP TABLE "BooksOnAuthors";

