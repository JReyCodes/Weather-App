import { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";

const Search = ({onSearchChange}) => {

    const [search,setSearch] = useState(null);
    const loadOptions = async (inputValue) => {

        const url = `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?minPopulation=500000&namePrefix=${inputValue}`
         const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': 'c6474469e9mshc4265dc50b9c313p107d1bjsnbbcb57eb2b7e',
                'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
            }
        }
            const response = await fetch(url, options);
            const result = await response.json();
            console.log(result);
            const list =  {
                options: result.data.map((city) => {
                    return {
                        value: `${city.latitude } ${city.longitude}`,
                        label: `${city.name} ${city.countryCode}`
                    }
                })
            }
            return list
    }

    const handleOnChange = (searchData) => {
        setSearch(searchData)
        onSearchChange(searchData)

    }

    return (
        <AsyncPaginate
        placeholder='Please Enter A City'
        debounceTimeout={600}
        value={search}
        onChange={handleOnChange}
        loadOptions={loadOptions}
        id="searchbar"
        />
    )
}

export default Search;