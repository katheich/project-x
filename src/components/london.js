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
  

  componentDidMount() {
    anime({
      targets: '#count-plane',
      rotate: '1turn',
      duration: 5000,
      loop: true,
      easing: 'linear'
    })
  }

  // return finished javascripts
  
  render() {
    return <div className="container" id="london">
      <div className="columns">
        <div className="column is-2"></div>
        <div className="column is-3">
          <div id="total-count">
            <div id="plane-wrapper">
              <div id="count-plane"></div>
            </div>
            <div className="is-size-2" id="count-number">
              {this.getLength(this.props.london)}
            </div>
          </div>
        </div>
        <div className="column is-1"></div>
        <div className="column is-3 has-text-left" id={'origins'}>
          <p className="is-size-5">Coming from ...</p>
          <div id="origin-list">
            {this.getOrigins(this.props.london).map((origin, i) => {
              return <p key={i} className="is-size-6">
                {`${i + 1}. ${origin.country}: ${origin.perc}%`}
              </p>
            })}
          </div>
        </div>
        <div className="column is-2"></div>
      </div>
    </div>}
}

export default London