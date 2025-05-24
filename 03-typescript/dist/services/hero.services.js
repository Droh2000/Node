"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findHeroById = void 0;
const heroes_1 = require("../data/heroes");
// Tipado en Typescript
const findHeroById = (id) => {
    return heroes_1.heroes.find((heroe) => heroe.id === id);
};
exports.findHeroById = findHeroById;
