import React, { useState, useMemo } from "react";

import { useQuery } from "@apollo/client";
import { GET_COUNTRIES } from "../graphql/get-countries";

import { CountriesContainer } from "./CountriesContainer";

export function LanguageSearch() {
    const { data, loading, error } = useQuery(GET_COUNTRIES);
    const [searchLanguage, setSearchLanguage] = useState("");

    const filteredCountries = useMemo( () => {
        const lowerCaseSearch = searchLanguage.toLocaleLowerCase();
        if ( ! data ) return [];
        if ( ! searchLanguage ) return data.countries;
        return data.countries.filter( country => 
            country.languages.reduce( (p,language) => p || language.name.toLocaleLowerCase().match(lowerCaseSearch), false)
        )
        }
    , [ data, searchLanguage ] )


    if ( loading || error ) {
        return <p>{error ? error.message : "Loading..."}</p>;
    }

    if ( ! data ) return 'no data...'

    const handleSearch = async (e) => {
        e.preventDefault();
    };

    return (
    <div className="search__container">
        <div className="bg__image"></div>
        <div className="search__left"></div>
        <div className="triangle"></div>
        <form className="search__form" onSubmit={handleSearch}>
            <input
                className="search__input"
                type="text"
                value={searchLanguage}
                    onChange={e => setSearchLanguage(e.target.value)}
                    placeholder="Sprache"
            ></input>
        </form>
        <div className="languages__list">
            <CountriesContainer countries={filteredCountries}/>
        </div>
    </div>
  );
}