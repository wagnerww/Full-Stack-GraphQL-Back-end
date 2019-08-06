const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "variables.env" });
const Recipe = require("./models/Recipe");
const User = require("./models/User");

//Invoca servidor apollo e middleware para o express
const { graphqlExpress, graphiqlExpress } = require("apollo-server-express");
const { makeExecutableSchema } = require("graphql-tools");

//importa os shcemas e resolvers
const { typeDefs } = require("./schema");
const { resolvers } = require("./resolvers");

//Referencia os chemas e resolvers
const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

//conecta o mongoose
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("DB connected"))
  .catch(err => console.log(err));

const app = express();

corsOptions = {
  origin: "http://localhost:3000",
  credentials: true
};
app.use(cors(corsOptions));

//middleware ded autenticação
app.use(async (req, res, next) => {
  const token = req.headers["authorization"];
  console.log("token", token);
  if (token !== null) {
    try {
      const currentUser = await jwt.verify(token, process.env.SECRET);
      req.currentUser = currentUser;
      //console.log("currentUser", currentUser);
    } catch (error) {}
  }
  next();
});

//Cria app GaphiQL application
app.use("/graphiql", graphiqlExpress({ endpointURL: "/graphql" }));

//Conta os schemas ao GraphQL
app.use(
  "/graphql",
  bodyParser.json(),
  graphqlExpress(({ currentUser }) => ({
    schema,
    context: {
      Recipe,
      User,
      currentUser
    }
  }))
);

//Servidor de aplicação
const PORT = process.env.PORT || 4444;

app.listen(PORT, () => {
  console.log(`servidor rodando na porta ${PORT}`);
});
