const express = require("express");
const cors = require("cors");
const graphqlHTTP = require("express-graphql");

const schema = require("./schema/schema");

const app = express();

//** Middle Ware */
const middleware = [cors()];
app.use(middleware);

app.use(
   "/graphql",
   graphqlHTTP({
      schema,
   })
);

app.get("/", (req, res) => {
   res.send("Root page is available");
});

app.listen(7000, () => {
   console.log("port is running 7000");
});
