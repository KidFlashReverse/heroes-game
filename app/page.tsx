import { useEffect, useState } from "react";
import { getHero, getHeroesList, getRandomNumber } from "./utils";
import { ClientComponent } from "./client-component";
export interface HeroOption {
    id: number,
    name: string,
}

export default async function App(){
    const idHero = getRandomNumber();
    const heroToAcert = await getHero(idHero);
    const heroesList = await getHeroesList();

    async function getSelectedHero(id: number) {
        'use server';

        const data = await getHero(id);

        return data;
    }
    
    return (
        <div style={{
            width: '100vw',
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <ClientComponent 
                heroesList={heroesList}
                getSelectedHero={getSelectedHero}
                heroToAcert={heroToAcert}
            />
        </div>
    );
}