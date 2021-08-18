const graphql = require("graphql");

const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql;



// dummy data structure
let books = [
    { name: ""}
]

const BookType = new GraphQLObjectType({
   name: "Book",
   fields: () => ({
      id: { type: GraphQLString },
      name: { type: GraphQLString },
      genres: { type: GraphQLString },
   }),
});

const RootQuery = new GraphQLObjectType({
   name: "RootQueryType",
   fields: () => ({
      book: {
         type: BookType,
         args: { id: { type: GraphQLString } },
         resolve(parent, args) {
            // code to get data form db
         },
      },
   }),
});

module.exports = new GraphQLSchema({
   query: RootQuery,
});
