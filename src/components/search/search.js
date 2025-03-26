import { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { GEO_API_URL, geoApiOptions } from '../../api';

const Search = ({onSearchChange}) => {
    
    const [search, setSearch] = useState(null); //setseacrh is for updating the variable

    const loadOptions = (inputValue) => {
        return fetch(
            `${GEO_API_URL}/cities?minPopulation=10000&namePrefix=${inputValue}`, 
            geoApiOptions
        )
        .then((response) => response.json())
        .then((response) => {
            return {
                options: response.data.map((city)=>{
                    return {
                        value: `${city.latitude} ${city.longitude}`,
                        label: `${city.name}, ${city.countryCode}`,
                    }
                })
            }
        })
        .catch((err) => {
            console.error("API Fetch Error:", err);
            return { options: [] }; // Hata durumunda boş bir array döndür
        });
    
    }
    
    const handleOnChange = (searchData) => { //the data that we entered asyncpag
        setSearch(searchData);
        onSearchChange(searchData);
    }

    return (
        <AsyncPaginate 
            placeholder="search for city" 
            debounceTimeout={1500} //we want the requests in control
            value={search} 
            onChange ={handleOnChange}    
            loadOptions={loadOptions}  //bec we load the inputs through async
        />
    )
}

export default Search;

