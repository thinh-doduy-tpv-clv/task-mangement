CREATE TABLE task (
    id serial PRIMARY KEY,
    title VARCHAR NOT NULL,
    description VARCHAR,
    "dueDate" TIMESTAMP,
    status VARCHAR DEFAULT 'TODO' NOT NULL,
    "createdAt" TIMESTAMP DEFAULT now() NOT NULL,
    "userId" INTEGER
);


CREATE TABLE "user" (
    id serial PRIMARY KEY,
    username VARCHAR NOT NULL,
    email VARCHAR NOT NULL,
    password VARCHAR NOT NULL,
    "refreshToken" VARCHAR,
    "createdAt" TIMESTAMP DEFAULT now() NOT NULL
);