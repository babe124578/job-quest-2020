# Section 1: basic-js-ts

## Notes

    - All contents of this part are in folder basic-js-ts

# Section 2: Back-End (Thai jokes)

## Requirement

- [Docker](https://www.docker.com/) and `docker-compose`
- [node](https://nodejs.org) (This project use node 12.16.1)

## Description

- This project created by [ExpressJS](https://expressjs.com/) and [MongoDB](https://www.mongodb.com/)
- The service above wrapped by Docker and using docker-compose to run.

---

## To run this project

1.  Go to /back-end
2.  Run `docker-compose up -d --build`
3.  Access the API using browser `(localhost or 127.0.0.1)` method _GET_ only
4.  Access the API with other method [GET, POST, PUT, DELETE] use `curl` or postman application.

## To test this project

1.  Start project with previous sub-section
2.  Run `npm install`
3.  Run `npm test`
    - This will be tested by [newman](https://www.npmjs.com/package/newman)
4.  Or use **`runner`** in [Postman](https://www.postman.com/) to test the API

---

## Endpoint

- For local use
  - Run on http://localhost or http://127.0.0.1 port 80
  - e.g. http://localhost/1
- For on server
  - Run on http://13.229.236.171 port 80
  - e.g. http://13.229.236.171/1
  - If cannot access it please contact me. (Maybe I just stop instance due to instance cost)
- You can click on GET route to see example.
- For other method please use `curl` or ` postman`
- **For route POST and DELETE. User must provide `username` and `password` in Header**
  - Format will be like this :
    ```json
    {
      "username": "<user username>",
      "password": "<user password>"
    }
    ```
  - Import postman_collection in folder back-end/tests to see example

#### 1. [GET `/`](http://19.229.236.171)

    Get all jokes

#### 2. POST `/`

    Add new joke by add below in body.

```json
{
  "text": "<Joke text here.>"
}
```

#### 3. [GET `/:id`](http://19.229.236.171/1)

    Get one joke with provided id

#### 4. DELETE `/:id`

    Delete one joke with provided id

#### 5. POST `/:id/like`

    Like one joke with provided id

#### 6. POST `/:id/dislike`

    Dislike one joke with provided id

#### 7. PUT `/register`

    Register new user with provided username and password by add below in body.

```json
{
  "username": "<New username>",
  "password": "<New password>"
}
```

# Section 3: Back-End Question

1. Explain First-party cookie & Third-party cookie
   - First-party-cookie is the cookie that created under visited website domain.
     - e.g. visit facebook.com will receive first-party-cookie that created by facebook
   - Third-party-cookie is the cookie that created by other domain maybe its come from image, iframe or javascript which load from another websites.
     - example -> Visit facebook.com and facebook have advertisement from Lazada, so we can receive cookie from lazada.com as a third-party-cookie
2. Explain CAP Theorem.

   - CAP Theorm is the theorm about the impossible for distributed data store to provide more following than two guarantees at the same time.
     - `C`onsistency => Every read will receive most recent write or error only.
     - `A`vailability => Every request will receive non-error response but not guarantee that is mose recent write
     - `P`artition tolerance => System can operate even if any node down
   - For CA pair is for RDBMS which has high Consistency, Availability but no Partition tolerance
   - For P. If system failure the system (or us) should decide to
     - Cancel the operation that means no Availability but ensure Consistency.
     - Continue the operation that means still have Availability but lack of Consistency.

3. Considering two queries, Which one is faster.

   ```javascript
      const searchIds = ['1', '2', '3', ...];

      const query1 = await Product.find({ id: { \$in: searchIds } });

      const query2 = await Promise.all(searchIds.map(searchId => Product.find({ id: searchId })));
   ```

   - `query1` is faster becaure command find in node mongodb will return cursor which is like an instance and meta of output. user must do something with the cursor e.g. .toArray() or .forEach() or any array method to retrive data from database.

4. Explain XSS / SQL Injection / Man in the Middle Attack, and how to prevent each attack type.

   - XSS => Cross Site Scripting is the way that attacker attack by send script to the webpage using some Vulnerability.
     - e.g. website has `<div>`input text`</div>`, so the attacker can input some script directly e.g. type `<script/>` directly to the search field.
     - To prevent OWASP has 4 suggestion
       - Use framework which have ability to prevent automaticaly (ruby on rail, reactJS)
       - Prevent using request data to show as HTML output
       - Use encoding
       - Open Content Security Policy(CSP) -> so server can setup that website can retrive data from specify source only.
   - SQL Injection => Is the way that attacker attack by input sql command on UI to retrive data from SQL database(or DEOP, DELETE etc.)
     - e.g. SQL is SELECT \* FROM user WHERE \$userid
     - Attacker can use 1 OR 1=1 in userid field since OR 1=1 always true. So the database will return all row to trhe attacker.
     - To prevent that a way from w3school is to use SQL Parameter
     ```SQL
     txtUserId = getRequestString("UserId");
     txtSQL = "SELECT * FROM Users WHERE UserId = @0";
     db.Execute(txtSQL,txtUserId);
     ```
     - The parameter represent by @
     - The SQL engine checks each parameter to ensure that it is correct for its column and are treated literally, and not as part of the SQL to be executed.
   - Man in the middle attack => Means someone (attacker) trying to sniff or modify the packet between sender and receiver.
     - To prevent it should be encryption the packet or use SSL

5. Explain the different between using `callback` / `Promise` / `async await`. When to use and when not to.

   - Callback is a function that is passed to another function. When the first function done it will run secone function.
     - Problem is callback can create "Callback Hell" which is nesting function in function in function ...
     - Promise can help Callback Hell
   - Promise is guarantee that will resolved in the future or rejected
     - Promise is an obj and has 3 states: Pending, Resolved, Rejected e.g. request data from server, it will be in pending until receive or reject data.
     - Promise has side effect is Chaining, code will be hard to read if promise have many .then() chaining
   - Async/Await act like promise but more human readable
   - Callback should use in situation that your function maybe use multiple times.
   - Promise,Async/Await should use when need consistency such as API
   - Promise shouldn't use when the action often does not finish or occur because promise is an object with state and thus its consume a lot of memory. That can cause insufficient memory usage.

6. Explain how HTTP protocol works.
   1. Browser(client) uses TCP/IP protocol to connect to web server.
   2. Browser sends HTTP request using connection from 1st step.
   3. Server receives HTTP request.
   4. Server responses with HTTP response.
   5. Browser receives HTTP response.
   6. Browser render HTTP response.
