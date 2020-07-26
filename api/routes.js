const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("hello from API");
});

router.use("/users", require("./users"));
/*
Endpoints

------------------------------------
POST /api/users/register
------------------------------------
request body: 
{ "email": "ferrycosv@gmail.com",
  "password": "test",
  "firstName": "Francisco",
  "lastName": "Fernandez",
}

response body:

STATUS 500:
{
  error: "Error registering new user please try again...",
}

STATUS 200:
{
  email: email,
  firstName: firstName,
  lastName: lastName,
}
------------------------------------
POST /api/users/authenticate
------------------------------------
request body: 
{ "email": "ferrycosv@gmail.com",
  "password": "test",
}

response body:

STATUS 500:
{
  error: "Internal error please try again",
}

STATUS 401:
{
  error: "Incorrect email or password",
}

STATUS 200:
{
  status: "success" // server responds ok
}
cookie: token

------------------------------------
PUT /api/users/
------------------------------------
request body: 
{ "password": "test",
  "firstName": "Francisco",
  "lastName": "Fernandez",
}

response body:

STATUS 500:
{
  error: "Internal error please try again",
}

STATUS 401:
{
  error: "Internal error please try again",
}

STATUS 200:
{
  status: "success" // server responds ok
}

Note: valid cookie in header is required to gain access to the route, action is performed for the corresponding token email payload!

------------------------------------
DELETE /api/users/
------------------------------------
request body: 
empty

response body:

STATUS 401:
{
  error: "Internal error please try again",
}

STATUS 200:
{
  status: "success" // server responds ok
}

Note: valid cookie in header is required to gain access to the route, action is performed for the corresponding token email payload!
*/
router.use("/lists", require("./lists"));
/*
Endpoints

------------------------------------
GET /api/lists/
------------------------------------
request body: 
empty

response body:

STATUS 500:
{
  error: "Incorrect email",
}

STATUS 401:
{
  error: "Incorrect email",
}

STATUS 200:
{
  email: user.email, // email from the generated request
  contacts: user.contacts, // contacts array 
}

Note: valid cookie in header is required to gain access to the route, action is performed for the corresponding token email payload!

------------------------------------
PUT /api/lists/
------------------------------------
request body: 
{
    "contacts": [ 
        { "fullName" : "Adriana Alexandra", "contactPlace" : "Gent" }, 
        { "fullName" : "Robert Bach", "contactPlace" : "Gent" },
        { "fullName" : "Erick Arias", "contactPlace" : "San Salvador" }
    ]
}
response body:

STATUS 401:
{
  error: "Internal error please try again",
}

STATUS 200:
{
  status: "success" // server responds ok
}

Note: valid cookie in header is required to gain access to the route, action is performed for the corresponding token email payload!
*/
module.exports = router;
