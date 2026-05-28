const fs = require('fs');
const path = require('path');

const UserDTO = require('../dtos/userDto');

// регистрируем DTO
const dtoMap = {
    User: UserDTO,
};

let output = `/* AUTO-GENERATED FILE */\n\n`;

for (const [name, DTO] of Object.entries(dtoMap)) {
    const schema = DTO.schema;

    output += `export interface ${name} {\n`;

    for (const [key, type] of Object.entries(schema)) {
        output += `  ${key}: ${type};\n`;
    }

    output += '}\n\n';
}

const outputPath = path.resolve(
    __dirname,
    '../../client/src/shared/api/types.ts'
);

fs.writeFileSync(outputPath, output);

console.log('Types generated');