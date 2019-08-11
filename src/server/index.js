const { ServiceBroker } = require('moleculer');
const ApiService = require('moleculer-web');
const DbService = require('moleculer-db');
const MongoDBAdapter = require('moleculer-db-adapter-mongo');

const database = new ServiceBroker();
database.createService({
    name: 'contacts',
    mixins: [DbService],
    adapter: new MongoDBAdapter(process.env.MONGO_URL),
    collection: 'contacts',
});

const api = new ServiceBroker();
api.createService({
    mixins: [ApiService],

    settings: {
        port: process.env.PORT || 3001,
        cors: {
            origin: '*'
        },
        routes: [{
            aliases: {
                'GET /v1/contacts'(req, res) {
                    database.call('contacts.find')
                        .then(allContacts => {
                            const formattedContacts = allContacts.map(contact => {
                                const { _id: id, name, phone } = contact;

                                return { id, name, phone };    
                            })

                            res.end(JSON.stringify(formattedContacts));
                        });
                },
                'POST /v1/contact'(req, res) {
                    const { name, phone } = req.body;

                    database.call('contacts.create', { name, phone })
                        .then(() => res.end('OK'));
                }
            }
        }]
    }
});

Promise.all([database.start(), api.start()]);
