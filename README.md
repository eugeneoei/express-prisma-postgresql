# Express Prisma PostgreSQL

TODO

# Getting Started

TODO

# Prisma commands

```bash
# npx prisma migrate dev --name <name-of-migration-file>
npx prisma migrate dev --name init
```

### Creating migrations up and down files

**Step 1: Make changes to `schema.prisma` file**

Before creating the down migration `sql` file, make the necessary changes to the respective schemas in `schema.prisma` file

**Step 2: Generate down `sql` file**

Run the following command to generate a down `sql` file:

```bash
npx prisma migrate diff --from-schema-datamodel prisma/schema.prisma --to-schema-datasource prisma/schema.prisma --script > down.sql
```

This generates a `down.sql` file in the root folder. This generated `sql` file contains the `sql` commands that will undo the changes made in the `schema.prisma` file.

**Step 4: Generate migration file**

Run the following command to generate a migration `sql` file:

```bash
# npx prisma migrate dev --name <short-name-to-describe-changes>
npx prisma migrate dev --name create-books-authors-join-table
```

This will generate a migration folder based on the name you have given in the command above and in it, a `migration.sql` file and will also execute all `sql` statements in the file. To better manage migrations, move the generated down `sql` file from Step 3 in the root folder into this migration folder.

**Step 5: Undo migration based on a specific down file**

Run following command to undo changes declared in a specific down file:

```bash
# npx prisma db execute --file <path-to-specific-down-sql-file> --schema prisma/schema.prisma
npx prisma db execute --file ./prisma/migrations/20221017091909_create_books_authors_join_table/down.sql --schema prisma/schema.prisma
```

### Running a specific migration file

```bash
# npx prisma db execute --file <path-to-specific-up-sql-file>
npx prisma db execute --file ./prisma/migrations/20221017091909_create_books_authors_join_table/migration.sql
```