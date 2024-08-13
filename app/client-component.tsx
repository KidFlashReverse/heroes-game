'use client';
import { useEffect, useState } from "react";
import { HeroOption } from "./page";
import { HeroData } from "@/typescript/interfaces";

export function ClientComponent({
    heroesList,
    heroToAcert,
    getSelectedHero
}: {
    heroesList: Array<HeroOption>,
    heroToAcert: HeroData,
    getSelectedHero: (id: number) => Promise<any>
}){
    const heroToAcertConnections = heroToAcert.connections["group-affiliation"].split(','); 
    const heroToAcertBases = heroToAcert.work.base.split(','); 

    const [selectedHeroes, setSelectedHeroes] = useState<Array<HeroData>>([]);

    const getHero = async(id: number) => {
        const data = await getSelectedHero(id);

        setSelectedHeroes([data, ...selectedHeroes]);
    };

    const compareToHeroToAcert = (heroSelected: HeroData) => {
        const heroSelectedConnections = heroSelected.connections["group-affiliation"].split(','); 
        const CompareConnections = heroToAcertConnections.filter(item => !heroSelectedConnections.includes(item)).length;

        const heroSelectedBases = heroSelected.work.base.split(','); 
        const CompareBases = heroToAcertBases.filter(item => !heroSelectedBases.includes(item)).length;
        console.log(CompareBases);
        const data = {
            publisher: heroSelected.biography.publisher === heroToAcert.biography.publisher,
            alignment: heroSelected.biography.alignment === heroToAcert.biography.alignment,
            gender: heroSelected.appearance.gender === heroToAcert.appearance.gender,
            race: heroSelected.appearance.race === heroToAcert.appearance.race,
            base: CompareBases == 0
                ? 'green'
                : CompareBases == heroToAcertBases.length 
                    ? 'red'
                    : 'orange',
            connections: CompareConnections == 0
                ? 'green'
                : CompareConnections == heroToAcertConnections.length 
                    ? 'red'
                    : 'orange',
        }

        return data;
    };

    return (
        <div style={{
            width: '60vw',
            height: '100vh',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <div style={{
                position: 'relative',
                height: '40%',
                display: 'flex',
                alignItems: 'center',
            }}>
                <input 
                    list="heroes-list" 
                    onChange={(e) => {
                        const idSelectedHero = heroesList.find(option => option.name === e.target.value)?.id;

                        if(idSelectedHero) getHero(idSelectedHero);
                    }}
                />

                <datalist id="heroes-list">
                    {heroesList.map((option: HeroOption) => {
                        return (
                            <option 
                                disabled={!!selectedHeroes.find(character => character.id == option.id)} 
                                key={option.id} 
                                value={option.name}
                            ></option>
                        )
                    })}
                </datalist>
            </div>

            <div style={{
                position: 'relative',
                height: '60%',
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignContent: 'flex-start',
                flexWrap: 'wrap'
            }}>
                {selectedHeroes.map((character: HeroData) => {
                    const comparation = compareToHeroToAcert(character);

                    return (
                        <>
                            <div style={{
                                width: '60vw',
                                height: '80px',
                                marginBottom: '20px',
                                display: 'flex',
                                alignItems: 'center',
                            }}>
                                <div style={{
                                    height: '70px',
                                    width: '70px',
                                    marginLeft: '10px',
                                    backgroundColor: 'grey',
                                    border: 'grey solid 1px'
                                }}>
                                    <img 
                                        src={character.image.url} 
                                        alt="hero image" 
                                        style={{
                                            height: '100%',
                                            width: '100%',
                                            objectFit: 'cover',
                                        }}
                                    />
                                </div>
                                
                                <div className='box-text' style={{
                                    backgroundColor: comparation.alignment ? 'green' : 'red',
                                }}>
                                    <p>{character.biography.publisher}</p>
                                </div>

                                <div className='box-text' style={{
                                    backgroundColor: comparation.alignment ? 'green' : 'red',
                                }}>
                                    <p>{character.biography.alignment}</p>
                                </div>

                                <div className='box-text' style={{
                                    backgroundColor: comparation.gender ? 'green' : 'red',
                                }}>
                                    <p>{character.appearance.gender}</p>
                                </div>

                                <div className='box-text' style={{
                                    backgroundColor: comparation.race ? 'green' : 'red',
                                }}>
                                    <p>{character.appearance.race}</p>
                                </div>

                                <div className='box-text' style={{
                                    width: '120px',
                                    backgroundColor: comparation.base,
                                    overflow: 'auto',
                                    textOverflow: 'ellipsis',
                                }}>
                                    <p>{character.work.base}</p>
                                </div>

                                <div className='box-text' style={{
                                    width: '240px',
                                    backgroundColor: comparation.connections,
                                    overflow: 'auto',
                                    textOverflow: 'ellipsis',
                                }}>
                                    <p>{character.connections["group-affiliation"]}</p>
                                </div>
                            </div>
                        </>
                    );
                })}
            </div>
        </div>
    );
}