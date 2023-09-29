import {defineNuxtConfig} from "nuxt/config";
import dotenv from "dotenv"
dotenv.config()

const schemaList = ['ntm', 'vsd'];
const schemaName = process?.env?.AUTH_SCHEMA ?? 'ntm' //other options is vsd

if (!schemaList.includes(schemaName)) {
    console.warn(`The selected schema is incorrect. There is no schema with the name: ${schemaName}`);
} else {
    console.info(`The selected schema is: ${schemaName}`);
}
export default defineNuxtConfig({
    extends: [
        `layers/${schemaName}`
    ]
})