module.exports = {
    database: "rfa_tracker",
    username: "root",
    password: "R0OtH0ld3n",
    host: "127.0.0.1",
    port: 3306,
    dialect: "mysql",
    logging: false,
    pool: {
        max: 10,
        min: 1,
        acquire: 30000,
        idle: 10000
    }
}