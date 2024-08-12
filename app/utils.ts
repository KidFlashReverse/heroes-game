import { axios } from "@/lib/axios";
import { cache } from "react";
import { promises as fs } from 'fs';

export const getHero = cache(async (id: number | string) => {
    const hero = await axios.get(`/${id}`);

    return hero.data;
})

export const getHeroesList = cache(async () => {
    const file = await fs.readFile(process.cwd() + '/heroes.json', 'utf8');
    const data = JSON.parse(file);

    return data.data;
})

export const getRandomNumber = cache(() => {
    return Math.floor(Math.random() * (731 - 1 + 1) + 1);
})