const Koa = require('koa')
const mount = require('koa-mount')
const graphqlHTTP = require('koa-graphql')
const database = require('./repository/database.js')
const schema = require('./graphql/schema.js')

database.initialize({uri: 'mongodb://koa-graphql-mongodb:cefHif-citma4-hykqen@ds221003.mlab.com:21003/koa-graphql-mongodb'})

const app = new Koa()
app.listen(9000)

app.use(mount('/graphql', graphqlHTTP({schema, graphiql: true})))

const handleError = error => log.error('server error', error)
app.on('error', handleError)
