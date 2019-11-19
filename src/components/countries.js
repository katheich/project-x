import React from 'react'

const Countries = ({ countries, london }) => {

  return (<div className="container" id={'comparison'}>
    <div className="columns">
      <div className="column is-2 desktop-only"></div>
      <div className="column is-8">
        <p className="is-size-5 has-text-left">Compared to all the planes above ...</p>
        <div className="columns is-mobile is-multiline" id={'countries'}>
          {countries.map((country, i) => {
            const fraction = Math.round(london / country.count * 100)
            return (<div key={i} id={country.name} className="country column is-one-third-desktop is-one-third-tablet is-half-mobile">
              <p className="is-size-6">{country.name}</p>
              <p className="is-size-7">{`${fraction}%`}</p>
            </div>)
          })}
        </div>
      </div>
      <div className="column is-2 desktop-only"></div>
    </div>
  </div>)

}

export default Countries