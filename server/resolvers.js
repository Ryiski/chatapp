const bcrypt = require('bcrypt');
const moment = require('moment');
const { DataStore } = require('notarealdb');

const tables = new DataStore('./data');

const db = {
    users: tables.collection('users'),
    messages: tables.collection('messages')
}

const resolvers = {
    Subscription: {
        newMessage: {
            subscribe: (root, args, { pubSub }) => pubSub.asyncIterator(['NEW_MESSAGE']),
        }
    },
    Query: {
        getMessages: (_, __, ___) => db.messages.list(),
    },
    Mutation: {
        userRegister: async (root, { newUserInput }, { genToken }) => {
            let { userName, password } = newUserInput;

            const doesUserExist = db.users.list().filter((user) => user.userName === userName)[0];
           
            if (doesUserExist) {

                throw new Error('Username already in use')

            } else {

                if(userName === '') throw new Error('Please select a awesome username')
                if(password.length < 8) throw new Error('Password much contain 8 latters')

                newUserInput.password = await bcrypt.hashSync(password, 10);

                const { rfToken } = genToken({ userName, password });

                newUserInput.refreshToken = rfToken;

                const id = db.users.create({ ...newUserInput });

                const user = db.users.get(id);

                return user
                

            }
        },
        userLogin: async (root, { logInUserInput: { userName, password } }, { genToken }) => {


            const user = await db.users.list().filter((user) => user.userName === userName)[0];

            if (user) {

                const isPassMatch = await bcrypt.compare(password, user.password);

                if (isPassMatch) {

                    const { token } = genToken({ userName, password: user.password });

                    user.token = token;

                    return user

                } else {

                    throw new Error("Incorrect Password");

                }

            } else {

                throw new Error("Incorrect Username");

            }
        },
        newMessage: (_, { messageInput }, { pubSub }) => {
            messageInput.moment = `${moment().format('l')} ${moment().format('LT')}`
            db.messages.create({ ...messageInput });
            pubSub.publish('NEW_MESSAGE', { newMessage: { ...messageInput } });
            return true

        }
    }
}

module.exports = resolvers;