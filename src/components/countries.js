import React from 'react'

const Countries = ({ countries, london }) => {

  return (<div id={'comparison'}>
    <h4>Compared to the number of planes above...</h4>
    <div id={'countries'}>
      {countries.map((country, i) => {
        const fraction = Math.round(london / country.count * 100)
        return (<div key={i} id={country.name} className={'country'}>
          <h2>{country.name}</h2>
          <p>{`${fraction}%`}</p>
        </div>)
      })}
    </div>
  </div>)

}

export default Countries