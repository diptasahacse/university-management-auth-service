"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("./app"));
const index_1 = __importDefault(require("./config/index"));
// import { logger, errorLogger } from './shared/logger';
let server;
// Uncaught Exception Handler
/*
Synchronous Error
This handler handler error which made by developer mistake.

For Example,
let x = 5;
console.log(y)

*/
process.on('uncaughtException', error => {
    console.log(error);
    process.exit(1);
});
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect(index_1.default.database_uri);
        console.log('Database is Connected');
        server = app_1.default.listen(index_1.default.port, () => {
            console.log(`Server is listening on ${index_1.default.port} port.`);
        });
    }
    catch (error) {
        console.log('Error', error);
    }
    // Unhandled Rejection Handler
    // Async Error
    process.on('unhandledRejection', error => {
        if (server) {
            server.close(() => {
                console.log(error);
                process.exit(1);
            });
        }
        else {
            process.exit(1);
        }
    });
});
startServer();
// Signal Termination
/*
I can terminate the server by sending signal
*/
process.on('SIGTERM', () => {
    console.log('Sigterm is received');
    if (server) {
        server.close();
    }
});
