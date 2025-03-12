import express from 'express';
import database from './database';
import router from './routes';

const app = express();
const PORT = 5000;

app.use(express.json());

async function testDatabaseConnection() {
    try {
        await database.authenticate();
        console.log(`Sucesso ao conectar ao banco de dados.`);
    } catch (error) {
        console.error(`Erro ao conectar ao banco de dados:`, error);
    }
}

testDatabaseConnection();

app.use(router);


app.listen(PORT, () => {
    console.log(`Servidor: http://localhost:${PORT}/`);
});