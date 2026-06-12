const fs = require('fs');
const path = require('path');

const typeDefs = {
    User: {
        id: 'string',
        name: 'string',
        avatar: 'string | null',
    },
    ChatMemberPreview: {
        id: 'string',
        name: 'string',
        avatar: 'string | null',
    },
    ChatFile: {
        file_path: 'string',
    },
    ChatMessage: {
        id: 'string',
        chat_id: 'string',
        sender_id: 'string | null',
        content: 'string | null',
        sent_at: 'string',
        is_read: 'boolean',
    },
    ChatMessageWithRelations: {
        id: 'string',
        chat_id: 'string',
        sender_id: 'string | null',
        content: 'string | null',
        sent_at: 'string',
        is_read: 'boolean',
        sender: 'User',
        attachedFiles: 'ChatFile[]',
    },
    Chat: {
        id: 'string',
        is_group: 'boolean',
        group_name: 'string | null',
        group_avatar: 'string | null',
        created_at: 'string',
        members: 'ChatMemberPreview[]',
        messages: 'ChatMessage[]',
    },
    MessagesPage: {
        messages: 'ChatMessageWithRelations[]',
        nextCursor: 'string | null',
    },
    CreateChatRequest: {
        userId: 'string',
    },
    SendMessageRequest: {
        content: 'string | null',
        files: 'FileList | null',
    },
    ReadMessageResponse: {
        updated: 'number',
    },
};

let output = `/* AUTO-GENERATED FILE */\n\n`;

for (const [name, schema] of Object.entries(typeDefs)) {

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