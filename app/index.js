const express = require('express')
const app = express()
const port = 3000
const config = {
    host: 'mysql',
    user: 'root',
    password: 'root',
    database: 'fullcycle'
};

const mysql = require('mysql2')
const connection = mysql.createConnection(config)

const sqlCreate = `
    CREATE DATABASE IF NOT EXISTS fullcycle;
`;
connection.query(sqlCreate);

const sqlCreateTable = `
    CREATE TABLE IF NOT EXISTS \`fullcycle\`.\`people\` (
        \`id\` INT AUTO_INCREMENT PRIMARY KEY,
        \`name\` VARCHAR(255) NOT NULL  
    );
`;
connection.query(sqlCreateTable);

const sql = `
    INSERT INTO people(name) VALUES ('Vitor Pimenta');
`;
connection.query(sql);

app.get('/', (req, res) => {
    getPeople(res, connection)
})

app.listen(port, () => {
    console.log('STARTED AT ' + port);
});

function getPeople(res, connection) {
    const sql = `SELECT id, name FROM people`;

    connection.query(sql, (error, results, fields) => {
        if (error) {
            console.error("Erro na consulta ao banco de dados:", error);
            res.status(500).send("Erro ao consultar o banco de dados");
            return;
        }

        let tabela = '<table>';
        tabela += '<tr><th>Name</th></tr>';

        results.forEach(element => {
            tabela += `<tr><td>${element.id}</td><td>${element.name}</td></tr>`;
        });

        tabela += '</table>';
        res.send('<h1>Full Cycle Rocks!</h1>' + tabela);
    });
}