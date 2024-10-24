const config = require('./config.json');
const mysql = require('mysql');
const commander = require('commander');
const fs = require('fs');
const path = require('path');

const program = new commander.Command();

program
    .argument('<table>', 'Name of the table')
    .action((table) => {
        const connection = mysql.createConnection({
            host: config.host,
            user: config.username,
            password: config.password,
            database: config.database,
        });

        connection.connect();

        connection.query(`DESCRIBE ??;`, [table], (error, results) => {
            if (error) {
                console.error('Error describing the table:', error.message);
                connection.end();
                return;
            }

            const fields = results.map((element) => {
                let fieldType;
                let hasDefaultNull = element.Default === null;

                if (element.Type.includes('int')) {
                    fieldType = 'int';
                } else if (element.Type.includes('varchar') || element.Type.includes('text') || element.Type.includes('char') || element.Type.includes('longtext')) {
                    fieldType = 'string';
                } else if (element.Type.includes('double') || element.Type.includes('float') || element.Type.includes('decimal')) {
                    fieldType = 'double';
                } else if (element.Type.includes('date') || element.Type.includes('time')) {
                    fieldType = 'DateTime';
                } else if (element.Type.includes('bool') || element.Type.includes('tinyint(1)')) {
                    fieldType = 'bool';
                } else if (element.Type.includes('json')) {
                    fieldType = 'dynamic';
                } else if (element.Type.includes('blob')) {
                    fieldType = 'byte[]';
                } else {
                    fieldType = 'string';
                }

                // Wenn das Feld nullable ist (Null: 'YES') oder der Default-Wert null ist, den Typ als nullable markieren
                if (hasDefaultNull) {
                    fieldType += '?';
                }

                return { fieldName: element.Field, fieldType };
            });



            const className = table.charAt(0).toUpperCase() + table.slice(1).toLowerCase();
            const output = [`[Table("${table}")]
public class ${className} {`];
            fields.forEach((element) => {
                output.push(`    [Column("${element.fieldName}")]`);
                output.push(`    public ${element.fieldType} ${element.fieldName.charAt(0).toUpperCase() + element.fieldName.slice(1)} { get; set; }`);
            });
            output.push(`}`);

            const outputString = output.join('\n');
            console.log(outputString);

            const outputDir = path.join(__dirname, 'generated');
            if (!fs.existsSync(outputDir)) {
                fs.mkdirSync(outputDir, { recursive: true });
            }

            fs.writeFileSync(path.join(outputDir, `${className}.cs`), outputString, 'utf8');

            connection.end();
        });
    });

program.parse();
