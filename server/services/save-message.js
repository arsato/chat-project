const oracledb = require("oracledb");

const MESSAGES_COLLECTION = "messages";

const saveMessageToDB = async (message) => {
    let connection, newMessage, result;

    try {
        connection = await oracledb.getConnection();
        const soda = connection.getSodaDatabase();
        const messagesCollection = await soda.createCollection(
            MESSAGES_COLLECTION
        );
        console.log("enviando: ", message);
        newMessage = await messagesCollection.insertOneAndGet(message);
        console.log(newMessage);
        result = {
            id: newMessage.key,
            createdOn: newMessage.createdOn,
            lastModified: newMessage.lastModified,
        };
    } catch (err) {
        console.error(err);
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (err) {
                console.error(err);
            }
        }
    }
    return result;
};

module.exports = saveMessageToDB;
