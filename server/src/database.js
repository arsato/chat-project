const oracledb = require("oracledb");

oracledb.outFormat = oracledb.OBJECT;
oracledb.fetchAsString = [oracledb.CLOB];
oracledb.initOracleClient({
    libDir: "C:\\oracle\\instantclient_21_11",
    configDir: "C:\\oracle\\instantclient_21_11\\network\\admin",
});
oracledb.autoCommit = true;

const init = async () => {
    try {
        console.log("Creando pool de conexiones...");
        await oracledb.createPool({
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            connectString: process.env.CONNECT_STRING,
        });
        console.log("Pool de conexiones creado");
    } catch (e) {
        console.error("Error en conexion: ",e);
    }
};

init();