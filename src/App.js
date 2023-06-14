import React, { useState, useEffect } from 'react'
import axios from 'axios'

// importing axios services
import countryServices from './services/countryServices'
import { type } from '@testing-library/user-event/dist/type'

// importing countryDataComponent
import CountryDataComponent from './components/countryData'
import countryData from './components/countryData'


const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
    console.log('this is event.target', event.target)
  }

  return {
    type,
    value,
    onChange
  }
}

const useCountry = (name) => {
  const [country, setCountry] = useState(null)
  const [dataOfCountry, setDataOfCountry] = useState('')
  
  useEffect(() => {

    setCountry(name)
  })

  useEffect(() => {
    // making api req
    countryServices
    .getSpecificCountry(country)
      .then(data => {
        console.log('data', data)
        setDataOfCountry(data)
      })
  }, [country])

  console.log('api succesful!')
  return dataOfCountry 
}

const Country = ({ country }) => {

  // calling custom hook! and getting api data
  const dataFromApi = useCountry(country)

  console.log('country.data from component', dataFromApi)
  if (!dataFromApi) {
    console.log('!country')
    return (
      <div>
        <p>Country not found...</p>
      </div>
    )
  }

  console.log('capital?', dataFromApi.capital)

  //converting shit to string
  const lang = toString(dataFromApi.languages)

  return (
    <div>
      <p>capital: {dataFromApi.capital}</p>
      <p>population: {dataFromApi.population}</p>
    </div>
  )
}

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')

  // using custom hook
  const country = useCountry(nameInput.value)

  
  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)

    console.log('putting the country name to name state!')

  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button type='submit'>find</button>
      </form>
      <Country country={name}/>
    </div>
  )
}

export default App