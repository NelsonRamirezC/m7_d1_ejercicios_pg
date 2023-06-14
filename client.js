import pg from "pg";
//const { Client } = pkg;

const { Client } = pg;
const config = {
    host: "localhost",
    port: 5432,
    database: "m7_d1_ejercicios",
    user: "node",
    password: "123456",
};

const consulta = (query) => {
    return new Promise(async (resolve, reject) => {
        const client = new Client(config);
        try {
            await client.connect();
            const result = await client.query(query);
            resolve(result.rows);
        } catch (error) {
            console.log(error.message);
            reject("error al consultas los productos en la BD.");
        } finally {
            try {
                await client.end();
                //console.log("Se ha liberado al cliente.");
            } catch (error) {
                //console.log("Error al cerrar la conexión");
            }
        }
    });
};

//consultar todos los productos
//consulta("SELECT id, nombre, descripcion, precio, stock FROM PRODUCTOS");

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
