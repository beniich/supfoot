db.createUser({
    user: 'footballhub',
    pwd: process.env.MONGO_APP_PASSWORD,
    roles: [
        {
            role: 'readWrite',
            db: 'footballhub',
        },
    ],
});

db.createCollection('users');
db.createCollection('members');
db.createCollection('tickets');

// Create indexes
db.users.createIndex({ email: 1 }, { unique: true });
db.members.createIndex({ email: 1 }, { unique: true });
db.tickets.createIndex({ ticketNumber: 1 }, { unique: true });
db.tickets.createIndex({ event: 1, member: 1 });
