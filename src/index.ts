import { serverClass } from "./models/server";
import { config } from 'dotenv';

config();
const server = new serverClass();

server.execute();