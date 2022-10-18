require("dotenv").config();
const express = require("express");
const { PrismaClient } = require("@prisma/client");

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

// TODO: serve express build base file
app.get("/", (req, res) => {
    res.json({
        message: "success"
    });
});

app.get("/authors", async (req, res) => {
    try {
        const authors = await prisma.author.findMany({
            select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
                createdAt: true,
                updatedAt: true,
                books: {
                    select: {
                        book: {
                            select: {
                                id: true,
                                title: true,
                                synopsis: true
                            }
                        }
                    }
                }
            }
        });
        const formattedAuthors = authors.map(author => ({
            ...author,
            books: author.books.map(book => book.book)
        }));
        res.json(formattedAuthors);
    } catch (error) {
        const { code, message } = error;
        console.log("Error getting authors");
        console.log("Error code:", code);
        res.json({
            error: message
        });
    }
});

app.post("/authors", async (req, res) => {
    try {
        const body = req.body;
        const author = await prisma.author.create({
            data: body
        });
        res.json(author);
    } catch (error) {
        const { code, message } = error;
        const isUniqueConstraintError = code === "P2002";
        console.log("Error creating author");
        console.log("Error code:", code);
        res.json({
            error: isUniqueConstraintError
                ? "Email has already been taken."
                : message
        });
    }
});

app.get("/books", async (req, res) => {
    try {
        const books = await prisma.book.findMany({
            select: {
                id: true,
                title: true,
                synopsis: true,
                createdAt: true,
                updatedAt: true,
                authors: {
                    select: {
                        author: {
                            select: {
                                id: true,
                                firstName: true,
                                lastName: true
                            }
                        }
                    }
                }
            }
        });
        const formattedBooks = books.map(book => ({
            ...book,
            authors: book.authors.map(author => author.author)
        }));
        res.json(formattedBooks);
    } catch (error) {
        console.log(error);
        const { code, message } = error;
        console.log("Error getting books");
        console.log("Error code:", code);
        res.json({
            error: message
        });
    }
});

app.post("/books", async (req, res) => {
    try {
        const { title, synopsis, authors } = req.body;
        const authorIds = authors.map(authorId => ({ authorId }));
        const book = await prisma.book.create({
            data: {
                title,
                synopsis,
                authors: {
                    create: authorIds // this creates rows in the join table
                }
            },
            select: {
                id: true,
                title: true,
                synopsis: true,
                createdAt: true,
                updatedAt: true,
                authors: {
                    select: {
                        author: {
                            select: {
                                id: true,
                                firstName: true,
                                lastName: true
                            }
                        }
                    }
                }
            }
        });
        const formattedBook = {
            ...book,
            authors: book.authors.map(author => author.author)
        };
        res.json(formattedBook);
    } catch (error) {
        console.log(error);
        const { code, message } = error;
        console.log("Error creating book");
        console.log("Error code:", code);
        res.json({
            error: message
        });
    }
});

app.get("/books/:bookId", async (req, res) => {
    try {
        const book = await prisma.book.findUnique({
            where: {
                id: req.params.bookId
            },
            select: {
                id: true,
                title: true,
                synopsis: true,
                createdAt: true,
                updatedAt: true,
                authors: {
                    select: {
                        author: {
                            select: {
                                id: true,
                                firstName: true,
                                lastName: true
                            }
                        }
                    }
                }
            }
        });
        if (book) {
            const formattedBook = {
                ...book,
                authors: book.authors.map(author => author.author)
            };
            res.json(formattedBook);
        } else {
            res.status(404).json({
                error: "Book not found."
            })
        }
    } catch (error) {
        console.log(error);
        const { code, message } = error;
        console.log("Error finding book");
        console.log("Error code:", code);
        res.json({
            error: message
        });
    }
});

app.delete("/books/:bookId", async (req, res) => {
    try {
        await prisma.book.delete({
            where: { id: req.params.bookId }
        });
        res.status(204).send();
    } catch (error) {
        console.log(error);
        const { code, meta } = error;
        console.log("Error deleting book");
        console.log("Error code:", code);
        res.json({
            error: meta.cause
        });
    }
});

// app.post("/books/:bookId/reviews", async (req, res) => {
//     /*
//         eg req.body
//         {
//             "content": "great book!",
//             "rating": 1.1
//         }
//     */
//     try {
//         const review = await db.review.create({
//             bookId: req.params.bookId,
//             ...req.body
//         });
//         res.json(review);
//     } catch (error) {
//         console.log(error);
//         res.json({
//             error: error.errors[0].message
//         });
//     }
// });

app.listen(process.env.PORT, () =>
    console.log(
        `${process.env.ENVIRONMENT} express server listening on port ${process.env.PORT}!`
    )
);
