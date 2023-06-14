import pg from "pg";
const { Pool } = pg;

const config = {
    host: "localhost",
    port: 5432,
    database: "m7_d1_ejercicios",
    user: "node",
    password: "123456",
    max: 5,
    idleTimeoutMillis: 3000,
};

const pool = new Pool(config);

const consulta = (query) => {
    return new Promise(async (resolve, reject) => {
        let client;
        try {
            client = await pool.connect();
            const result = await client.query(query);
            resolve(result.rows);
        } catch (error) {
            reject("error al consultar los productos a la BD.");
        } finally {
            try {
                if (client) {
                    client.release();
                    console.log("Client liberado");
                }
            } catch (error) {
                console.error("Error al liberar el cliente:", error);
            }
        }
    });
};

const getProductsById = (id) => {
    //let query = "SELECT id, nombre, descripcion, precio, stock FROM PRODUCTOS WHERE id =" + id;
    //PROHIBIDO...
    const query = {
        text: "SELECT id, nombre, descripcion, precio, stock FROM productos where id = $1",
        values: [id],
    };
    consulta(query)
        .then((resultado) => {
            console.log(resultado);
        })
        .catch((error) => {
            console.log(error);
        });
};

getProductsById("2");
getProductsById("1");

