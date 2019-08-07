exports.typeDefs = `

  type Recipe {
    _id:ID
    name:String!
    category:String!
    description:String!
    intructions:String!
    createdDate:String
    likes:Int
    username:String
  }

  type User {
    _id:ID
    username:String! @unique
    password:String!
    email:String!
    joinDate:String
    favorites:[Recipe]
  }

  type Query {
    getAllRecipes:[Recipe]
    getRecipe(_id:ID!):Recipe
    searchRecipes(searchTerm:String): [Recipe]
    getCurrentUser:User
    getUserRecipes(username:String):[Recipe]
  }

  type Token {
    token:String!
  }

  type Mutation {
    addRecipe(name:String!, description:String!, category:String!, 
    intructions:String!, username:String): Recipe
    deleteUserRecipe(_id:ID):Recipe
    signupUser(username: String!, email: String!, password:String!):Token
    likeRecipe(_id:ID!, username:String!):Recipe
    signInUser(username: String!, password:String!):Token
  }

  

`;
