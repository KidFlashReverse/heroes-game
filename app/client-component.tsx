'use client';
import { Dispatch, SetStateAction, useState } from "react";
import { HeroOption } from "./page";

export function ClientComponent({
    heroesList,
}: {
    heroesList: Array<HeroOption>,
}){
    const [selectedHero, setSelectedHero] = useState<any>();

    return (
        <>
            <div>
                <input 
                    list="heroes-list" 
                />

                <datalist id="heroes-list">
                    {heroesList.map((option: HeroOption) => (
                        <option value={option.id}>{option.name}</option>
                    ))}
                </datalist>
            </div>
        </>
    );
}