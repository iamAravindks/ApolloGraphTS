/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import { ApolloServer } from '@apollo/server'
import { makeExecutableSchema } from '@graphql-tools/schema';
import { ApolloServerPluginDrainHttpServer as ApolloDrain } from '@apollo/server/plugin/drainHttpServer'
import { useServer } from 'graphql-ws/lib/use/ws'
import { expressMiddleware } from '@apollo/server/express4'

import { readFileSync } from "fs";
import express from 'express'
import { createServer } from "http";
import { WebSocketServer } from "ws";
import cors from 'cors'
import bodyParser from "body-parser"

// import { typeDefs } from './graphql/types'
import { resolvers } from "./graphql/resolvers";



const typeDefs = readFileSync(`${__dirname}/graphql/schema.graphql`, { encoding: "utf-8" })



const schema = makeExecutableSchema({
    typeDefs,
    resolvers
})

// Create an Express app and HTTP server; we will attach the WebSocket
// server and the ApolloServer to this HTTP server.

const app = express()
const httpServer = createServer(app)

const wsServer = new WebSocketServer({
    server: httpServer,
    path: "/graphql"
})


const getDynamicContext = async (ctx: any, msg: unknown, args: unknown) =>
{
    // ctx is the graphql-ws Context where connectionParams live
    if (ctx.connectionParams.authentication) {
        console.log(msg, args)
        return { hello: "world" };
    }
    // Otherwise let our resolvers know we don't have a current user
    return { currentUser: null };
};

const serverCleanUp = useServer({
    schema,
    context: async (ctx, msg, args) =>
    {
        console.log("is this works")
        // You can define your own function for setting a dynamic context
        // or provide a static value
        return getDynamicContext(ctx, msg, args);
    },

}, wsServer)

// set up ApolloServer

export interface MyContext
{
    token?: string;
}


const server = new ApolloServer<MyContext>({
    schema,
    status400ForVariableCoercionErrors: true,
    includeStacktraceInErrorResponses: process.env.NODE_ENV === "development",
    plugins: [
        ApolloDrain({ httpServer }),
        // proper shutdown for the websocket server
        {

            async serverWillStart()
            {
                return {
                    async drainServer()
                    {
                        await serverCleanUp.dispose()
                    }
                }
            }
        },

    ],
})



const startSever = async () =>
{
    const PORT = process.env.PORT
    await server.start()
    app.use("/graphql", cors<cors.CorsRequest>(), bodyParser.json(), expressMiddleware(server,
        {
            // test to check the context is set or not !!
            context: async () => ({ token: "token" }),
        }))
    httpServer.listen(PORT, () =>
    {
        console.log(`🚀 Query endpoint ready at http://localhost:${PORT}/graphql`);
        console.log(`🚀 Subscription endpoint ready at ws://localhost:${PORT}/graphql`);
    })

}
startSever()

