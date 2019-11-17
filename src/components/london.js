import React from 'react'

const London = (dataLondon) => {

  // Turn into an array
  const dataArray = Array.from(dataLondon.london)

  // Get origin stats
  const summary = dataArray
    .reduce((sum, elem) => {
      const origin = elem[2].toString()

      const index = sum.map(e => e.country).indexOf(origin);
      if ( index > -1) {
        sum[index].count += 1
        return sum
      } else {
        sum.push({
          country: origin,
          count: 1
        })
        return sum
      }
    }, [])
    .map((country) => {
      const newCountry = country
      newCountry.perc = Math.round((country.count) / dataArray.length * 100)
      return newCountry
    })
    .sort(function(a, b) { return b.count - a.count } )

  // return finished javascripts
  return (<div id={'london'}>
    <div id={'totalCount'}>{dataArray.length}</div>
    <div id={'origins'}>
      <h4>Coming from ...</h4>
      <div id={'origin-list'}>
        {summary.map((origin, i) => {
          return <div key={i}>
            {`${i + 1}. ${origin.country}: ${origin.perc}%`}
          </div>
        })}
      </div>
    </div>
    
  </div>)
}

export default London