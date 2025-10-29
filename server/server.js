import { Express } from "express";
import cors from "cors";
import indexRouters from "../rutas/index.routes.js";
import * as db from '../db/cnn_mongodb.js';

export default class server{

    constructor(){
        this.app = express();
        this.port = process.env.PORT || 3000;
        this.generalRoute = '/api/';

        //Middlewares
        this.middlewares();

        //tutaas de mi aplicacion
        this.routes();
    }

    async conectarDBMongo(){
        if(!db.isConected){
            await db.conectarAMongoDB();
        }
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
        this.app.use('**' ,(req, res) => {
            res.status(404).json({
                msg: 'Ruta no encontrada'
            });
        })
    }

    listen(){
        this.app.listen(this.port, () =>{
            console.log('servidor corriendo en puerto', $(this.port).yellow); //Posible fallo en esta linea por $(this.port).yellow
        });
    }
}