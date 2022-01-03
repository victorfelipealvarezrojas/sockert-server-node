
import { serverClass } from './models/server';
import { config } from 'dotenv';

config();//me permite travajar con variables de entorno
const server = new serverClass();

server.execute();