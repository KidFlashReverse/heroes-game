import { useEffect, useState } from "react";
import { getHero, getHeroesList } from "./utils";

interface HeroeOption {
    id: number,
    name: string,
}

export default async function App(){
    const heroesList = await getHeroesList();

    return (
        <div style={{
            width: '100vw',
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <div>
                <input list="heroes-list" />

                <datalist id="heroes-list">
                    {heroesList.map((option: HeroeOption) => (
                        <option key={option.id} value={option.name}></option>
                    ))}
                </datalist>
            </div>
        </div>
    );
}