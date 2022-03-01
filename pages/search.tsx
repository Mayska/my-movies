import { useState, useEffect, useCallback } from "react";

function Search(props: any) {
    let myURL: any = new URL(props.url);
    myURL.searchParams.set('api_key', props.api_key)
    myURL.searchParams.set('language', props.language)
    const [search, setSearch] = useState("code");
    const [moviesData, setMoviesData] = useState<any>([]);

    const fetchMyAPI = useCallback(async (myURL) => {
        let data = await fetch(myURL)
            .then(response => response.json())
        setMoviesData(data)
    }, [])

    useEffect(() => {
        myURL.searchParams.set('query', search)
        fetchMyAPI(myURL)
    }, [search]);

    return (<>
        <h2>Search</h2>
        <input type="text"
            placeholder="Entrez le titre d'un film"
            id="search-input"
            onChange={(e) => setSearch(e.target.value)}></input>
        <div>
            <h3>Resultat</h3>
            {moviesData.results === undefined ? <p>Vide</p> : moviesData.results.map((e: any) => {
                return (<>
                    <p>{e.title}</p>
                </>)
            })}
        </div>
    </>)
}

export async function getStaticProps() {
    const URL: string | undefined = process.env.URL + "search/movie";
    const API_KEY: string | undefined = process.env.API_KEY;
    return {
        props: {
            url: URL,
            api_key: API_KEY,
            language: "fr-FR"
        },
    }
}

export default Search