import { Server } from "http"

import mongoose from "mongoose";
import app from "./app";
import { envVars } from "./app/config/env";
let server: Server;


const startServer = async () => {
    
    try {
        
        await mongoose.connect(envVars.DB_URL);
       
        console.log("connected to db!!");
        server = app.listen(envVars.PORT, () => {
            console.log(`Server is listing to port  ${envVars.PORT}`)
        })

    } catch (error) {
        console.log(error)
    }
}
startServer();

process.on("unhandledRejection", (err) => {
    console.log("Unhandled rejection detected.... server shutting down..",err)
    if (server) {
        server.close(() => {
            process.exit(1)
        });
    }
    process.exit(1)
})
// throw new Error("I forgot to handle this local error")

process.on("uncaughtException", (err) => {
    console.log("Unhandled exception detected.... server shutting down..",err)
    if (server) {
        server.close(() => {
            process.exit(1)
        });
    }
    process.exit(1)
})

process.on("SIGTERM", (err) => {
    console.log("sigterm signal received.... server shutting down..",err)
    if (server) {
        server.close(() => {
            process.exit(1)
        });
    }
    process.exit(1)
})

process.on("SIGINT", (err) => {
    console.log("sigterm signal received.... server shutting down..",err)
    if (server) {
        server.close(() => {
            process.exit(1)
        });
    }
    process.exit(1)
})

// sPromise.reject(new Error("I forgot to catch this promise"))
