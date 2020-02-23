require('dotenv').config();
const { ApolloServer, PubSub } = require('apollo-server');
const jwt = require('jsonwebtoken');
const typeDefs = require('./schema') ;
const resolvers = require('./resolvers') ;
const pubSub = new PubSub();
const PORT = process.env.PORT || 5000;
const authKey = process.env.AUTH_SECRET;
const authKeyRf = process.env.AUTH_SECRET_RF;

const server = new ApolloServer({
    debug: false,
    cors:true,
    path:'/graphql',
    typeDefs, 
    resolvers,
    context:(req,res) => ({
        req,
        res,
        pubSub,
        genToken: ({ userName, password }) => {

            const token = jwt.sign({ userName, password }, authKey, { expiresIn: '30d' });
            const rfToken = jwt.sign({ userName, password }, authKeyRf);
      
            return { token, rfToken }
          },
    })
});


server.listen(PORT).then(({subscriptionsUrl, url})=> {
    console.log(`Server Listing on ${url}`)
    console.log(`Subscriptions Listing on ${subscriptionsUrl}`)
})