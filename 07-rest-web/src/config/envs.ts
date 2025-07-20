import 'dotenv/config';// Use la configuracion por defecto y cargue las variables de entorno de acuerdo al archivo .env
import { get } from 'env-var';

export const envs = {
    PORT: get('PORT').required().asPortNumber(),
    PUBLIC_PATH: get('PUBLIC_PATH').default('public').asString(),
}
