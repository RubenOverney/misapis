import { Express } from "express";
import cors from "cors";
import indexRouters from "../rutas/index.routes.js";

export default class server{

    constructor(){
        this.app = express();
        this.port = '3000';
        this.generalRoute = '/api/';

        //Middlewares
        this.middlewares();

        //tutaas de mi aplicacion
        this.routes();
    }
    middlewares(){
        //CORS
        this.app.use(cors());

        //Lectura y parseo del body
        this.app.use(express.json());

        //Directorio publico
        this.app.user(express.static('public'));
    }

    routes(){
        //localhost:000/api/ejemplo
        this.app.use(this.generalRoute, indexRouters)
    }

    listen(){
        this.app.listen(this.port, () =>{
            console.log('servidor corriendo en puerto', this.port);
        });
    }
}