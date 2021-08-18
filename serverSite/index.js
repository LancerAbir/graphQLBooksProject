const express = require("express");
const cors = require("cors");
const { graphqlHTTP } = require('express-graphql');

const schema = require("./schema/schema");

const app = express();

//** Middle Ware */
const middleware = [cors()];
app.use(middleware);

app.use(
   "/graphql",
   graphqlHTTP({
      schema,
      graphiql: true
   })
);

app.get("/", (req, res) => {
   res.send(`<h1>Root page is available</h1>`);
});

app.listen(7000, () => {
   console.log("port is running 7000");
});
