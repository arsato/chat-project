const oracledb = require("oracledb");

const MESSAGES_COLLECTION = "messages";

const getMessages = async (room) => {
    console.log("Obteniendo todos los mensajes...");
    let connection;
    let result = [];
    try {
        connection = await oracledb.getConnection();
        const soda = connection.getSodaDatabase();
        const messagesCollection = await soda.createCollection(
            MESSAGES_COLLECTION
        );
        let messages = await messagesCollection
            .find()
            .filter({ room: room })
            .getDocuments();
        messages.forEach((element) => {
            result.push({
                id: element.key,
                createdOn: element.createdOn,
                ...element.getContent(),
            });
        });
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

module.exports = getMessages;
