
import "./App.css";
import axios from "axios";
import {Form, redirect, useFetcher, useLoaderData, useNavigation, useRevalidator} from "react-router-dom";
import {useEffect, useRef, useState} from "react";

function App() {

    const pokemons = useLoaderData()

    const revalidator = useRevalidator()

    const navigation = useNavigation()

    const fetcher = useFetcher()



    const [pokemonId, setPokemonId] = useState(undefined)
    const [selectedPokemon, setSelectedPokemon] = useState("")
    const [pokemonName, setPokemonName] = useState("")
    const [pokemonDescription, setPokemonDescription] = useState("")

    useEffect(() => {
        if(selectedPokemon !== "") {
            loadPokemonById()
        }
    }, [selectedPokemon])

    const loadPokemonById = async () => {
        try {
            const pokemon = await axios.get(`http://localhost:5000/pokemons/${selectedPokemon}`)

            setPokemonId(pokemon.data)
            setPokemonName(pokemon.data.nom)
            setPokemonDescription(pokemon.data.description)

        } catch(e) {
            console.log(e)
        }
    }

    const handleEdit = async (e) => {
        e.preventDefault()

        const nom = pokemonName
        const description = pokemonDescription

        try {
            const res = await axios.put(`http://localhost:5000/pokemons/${selectedPokemon}`, {nom, description})

            revalidator.revalidate()
        } catch(e) {
            console.log(e)
        }

    }

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/pokemons/${id}`)

            revalidator.revalidate()

        }catch(e) {
            console.log(e)
        }
    }


  return (
    <div className="App">
      Voila
        {fetcher.state === "submitting" ? <>Submitting...</> : fetcher.state === "loading" ? <>Loading...</> : ""}
        {pokemons.map((pokemon) => <div key={pokemon.id}>{pokemon.nom} {pokemon.description} <button onClick={() => handleDelete(pokemon.id)}>delete</button></div>)}


        <select onInput={(e) => setSelectedPokemon(e.target.value)}>
            <option value={""}>--</option>
            {pokemons.map((pokemon) => <option value={pokemon.id}>{pokemon.nom}</option>)}
        </select>
        <br/><br/>
        {pokemonId &&
            <>
                <fetcher.Form method={"put"}>
                    <input type={"hidden"} value={selectedPokemon} name={"id"}/>
                    <input type={"text"} placeholder={"nom"} name={"nom"} value={pokemonName} onInput={(e) => setPokemonName(e.target.value)}/>
                    <input type={"text"} placeholder={"description"} name={"description"} value={pokemonDescription} onInput={(e) => setPokemonDescription(e.target.value)}/>
                    <button type={"submit"}>valider</button>
                </fetcher.Form>

            </>
        }
        <br/><br/>


        <fetcher.Form method={"post"}>
            <input type={"text"} placeholder={"nom"} name={"nom"}/>
            <input type={"text"} placeholder={"description"} name={"description"}/>
            <button type={"submit"}>valider</button>
        </fetcher.Form>
    </div>
  );
}

export const pokemonLoader = async () => {
    try {
        const pokemons = await axios.get("http://localhost:5000/pokemons")

        return pokemons.data

    } catch(e) {
        console.log(e)
        return []
    }
}

export const pokemonAction = async ({request}) => {

    if(request.method === "POST") {

        try {

            const formData = await request.formData()
            const nom = formData.get("nom")
            const description = formData.get("description")

            return await axios.post("http://localhost:5000/pokemons", {nom, description})

        }catch(e) {
            console.log(e)
        }

    } else if(request.method === "PUT") {
        try {

            const formData = await request.formData()
            const nom = formData.get("nom")
            const description = formData.get("description")
            const id = formData.get("id")

            console.log(id, nom, description)
            return await axios.put(`http://localhost:5000/pokemons/${id}`, {nom, description})

        }catch(e) {
            console.log(e)
            return null
        }
    }


}

export default App;
