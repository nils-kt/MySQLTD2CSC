const config = require('./config.json');

///////////////////////////////

const mysql = require('mysql');
const async = require('async');
const commander = require('commander');

///////////////////////////////

const program = new commander.Command();

const fields = [];

///////////////////////////////


program
    .argument('table', 'Name of the table')
    .action((table) => {
        var connection = mysql.createConnection({
            host: config.host,
            user: config.username,
            password: config.password,
            database: config.database
        });

        connection.connect();

        connection.query(`DESCRIBE ${table};`, function (error, results, fields) {
            if (error) throw error;

            async.each(results, function (element, next) {

                let fieldType = element.Type.includes('int') ? 'int' : element.Type.includes('varchar') ? 'string' : element.Type.includes('double') ? 'double' : element.Type.includes('longtext') ? 'string' : element.Type;
                fields.push({ 'fieldName': element.Field, 'fieldType': fieldType })
                next();

            }, () => {
                console.log(`public class ${table} {`)
                fields.forEach(element => {
                    if (element.db === undefined) {
                        console.log(`\tpublic ${element.fieldType} ${element.fieldName} {get; set;}`);
                    }
                });
                console.log(`}`);
            });
        });

        connection.end();
    });

program.parse();