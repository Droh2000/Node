"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const hero_services_1 = require("./services/hero.services");
const heroe = (0, hero_services_1.findHeroById)(2);
// Esto nos da error en Typescript porque la propiedad puede ser nulo
//console.log(heroe.name);
// Si queremos obtener una propiedad en particular, obtendremos un undefined
// console.log(heroe.name);
console.log((_a = heroe === null || heroe === void 0 ? void 0 : heroe.name) !== null && _a !== void 0 ? _a : 'Hero not found');
