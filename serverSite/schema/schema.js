const graphql = require("graphql");
const _ = require("lodash")

const { 
   GraphQLObjectType, 
   GraphQLString, 
   GraphQLSchema, 
   GraphQLID, 
   GraphQLInt,
   GraphQLList, 
} = graphql;



// dummy data structure
let books = [
   { 
      name: "জোছনা ও জননীর গল্প", 
      genres: "উপন্যাস", 
      id: '1', 
      authorId: "1"
   },
   { 
      name: "সঞ্চিতা", 
      genres: "কবিতা", 
      id: '2', 
      authorId: "2"
   },
   { 
      name: "গীতাঞ্জলী", 
      genres: "উপন্যাস", 
      id: '3', 
      authorId: "3"
   },
   { 
      name: "কাবলি ওয়ালা", 
      genres: "ছোট গল্প", 
      id: '4', 
      authorId: "3"
   },
   { 
      name: "অগ্নিবীণা", 
      genres: "গল্প", 
      id: '5', 
      authorId: "2"
   },
   { 
      name: "চোখের বালি", 
      genres: "উপন্যাস", 
      id: '6', 
      authorId: "3"
   },
   { 
      name: "শেষের কবিতা", 
      genres: "গল্প", 
      id: '7', 
      authorId: "2"
   },
   { 
      name: "সোনার তরী", 
      genres: "গল্প", 
      id: '8', 
      authorId: "2"
   },
]

let authors = [
   { 
      name: "হুমায়ূন আহমেদ", 
      age: 45,
      id:"1" 
   },
   { 
      name: "রবীন্দ্রনাথ ঠাকুর", 
      age: 80, 
      id:"2"
   },
   { 
      name: "কাজী নজরুল ইসলাম", 
      age: 90, 
      id:"3"
   }
]

const BookType = new GraphQLObjectType({
   name: "Book",
   fields: () => ({
      id: { type: GraphQLID },
      name: { type: GraphQLString },
      genres: { type: GraphQLString },
      author: {
         type: AuthorType,
         resolve(parent, args){
            // code to get data form db
            return _.find(authors, {id: parent.authorId})
         }
      }
   }),
});

const AuthorType = new GraphQLObjectType({
   name: "Author",
   fields: () => ({
      id: { type: GraphQLID },
      name: { type: GraphQLString },
      age: { type: GraphQLInt },
      book: { 
         type: new GraphQLList(BookType),
         resolve(parent, args) {
            // code to get data form db
            return _.filter(books, {authorId: parent.id})
         }
      }
   }),
});




const RootQuery = new GraphQLObjectType({
   name: "RootQueryType",
   fields: () => ({
      book: {
         type: BookType,
         args: { id: { type: GraphQLID } },
         resolve(parent, args) {
            // code to get data form db
            return _.find(books, {id: args.id})
         },
      },
      author: {
         type: AuthorType,
         args: { id: { type: GraphQLID } },
         resolve(parent, args) {
            // code to get data form db
            return _.find(authors, {id: args.id})
         },
      },
      books: { 
         type: new GraphQLList(BookType),
         resolve(parent, args) {
            // code to get data form db
            return books
         }
      },
      authors: { 
         type: new GraphQLList(AuthorType),
         resolve(parent, args) {
            // code to get data form db
            return authors
         }
      }
   }),

});

module.exports = new GraphQLSchema({
   query: RootQuery,
});
