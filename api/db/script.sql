CREATE TABLE "user" (
	"id"	INTEGER PRIMARY KEY AUTOINCREMENT,
	"email"	TEXT NOT NULL UNIQUE,
	"firstName"	TEXT NOT NULL,
	"lastName"	TEXT NOT NULL,
	"password"	TEXT NOT NULL,
	"creationDate"	TEXT,
	"lastUpdate"	TEXT
);
CREATE TABLE "contact" (
	"id"	INTEGER PRIMARY KEY AUTOINCREMENT,
	"userId"	INTEGER NOT NULL,
	"fullName"	TEXT,
	"contactDate"	TEXT,
	"contactPlace"	TEXT,
	"creationDate"	TEXT,
	"lastUpdate"	TEXT,
	"status"	TEXT,
	FOREIGN KEY("userId") REFERENCES "user"("id")
);

