import express from 'express';
import { ApolloServer, gql } from 'apollo-server-express'; // gql, schemaları tanımlamamıza yardımcı olan bir fonksiyondur
import typeDefs from '../schema/schema.js'; // Dosya uzantısı eklendi
import resolvers from './resolvers.js'; // Dosya uzantısı eklendi
import { connectionDatabase } from '../db/connection.js'; // Dosya uzantısı eklendi
import dotenv from 'dotenv';
import http from 'http'; // HTTP sunucusunu kullanmak için
import cors from 'cors';


dotenv.config();

const app = express();

const corsOptions = {
    origin:'*',//tüm kaynaklara izin verir
    optionsSuccessStatus: 200
}

app.use(cors(corsOptions));//cors middleware sini etkinleştirmek için kullanılır

connectionDatabase().then(async() =>{
    const server = new ApolloServer({
        typeDefs,
        resolvers,
    });
    await server.start();//apollo-server başlatma
    server.applyMiddleware({app});//bu kodun amacı graphql yollarını ve diğer yolları aynı uygulama içinde yönetmemizi kolaylaştırır
    const httpServer = http.createServer(app);// gelen http isteklerini kbul eden sunucuyu tanımlar
    const port = process.env.PORT || 5000;
    httpServer.listen(port, () => {
    console.log(`Server and mongodb ready at http://localhost:${port}${server.graphqlPath}`);
});
}).catch((err: any) => console.log(err))
