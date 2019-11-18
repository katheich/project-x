import React from 'react'
import anime from 'animejs'
 
class London extends React.Component {

  constructor() {
    super()
  }

  getLength(dataLondon) {
    return Array.from(dataLondon).length
  }
  
  getOrigins(dataLondon) {
    const dataArray = Array.from(dataLondon)
    
    return dataArray
      .reduce((sum, elem) => {
        const origin = elem[2].toString()
        const index = sum.map(e => e.country).indexOf(origin)
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
  }
  

  // componentDidMount() {
  //   anime({
  //     targets: '#totalCount',
  //     rotate: '1turn',
  //     duration: 5000,
  //     loop: true,
  //     easing: 'easeInOutExpo'
  //   })
  // }

  // return finished javascripts
  
  render() {
    return <div id={'london'}>
      <div id={'totalCount'}>
        <div id={'count-number'}>
          {this.getLength(this.props.london)}
        </div>
      </div>
      <div id={'origins'}>
        <h4>Coming from ...</h4>
        <div id={'origin-list'}>
          {this.getOrigins(this.props.london).map((origin, i) => {
            return <div key={i}>
              {`${i + 1}. ${origin.country}: ${origin.perc}%`}
            </div>
          })}
        </div>
      </div>
    </div>}
}

export default London