import React from 'react'
import ReactDOM from 'react-dom'
import London from './components/london'
import Countries from './components/countries'

import './style.scss'

const london = [-0.510375,51.28676,0.334015,51.691874]

const boundingBoxes = {
  'United Kingdom': [-14.02,49.67,2.09,61.06],
  'Switzerland': [5.9559,45.818,10.4923,47.8085],
  'Germany': [5.87,47.27,15.04,55.1],
  'Italy': [6.63,35.29,18.78,47.09],
  'India': [68.11,6.55,97.4,35.67],
  'Australia': [112.63,-43.65,153.75,-10.55]
}

class App extends React.Component {

  constructor() {
    super()
    this.state = {
      countries: []
    }
  }


  // London
  fetchLondonData() {
    fetch(`https://opensky-network.org/api/states/all?lamin=${london[1]}&lomin=${london[0]}&lamax=${london[3]}&lomax=${london[2]}`)
      .then(resp => resp.json())
      .then(resp => {
        this.setState({ dataLondon: resp.states })
      })
  }

  // Countries
  fetchCountryData(country) {
    fetch(`https://opensky-network.org/api/states/all?lamin=${boundingBoxes[country][1]}&lomin=${boundingBoxes[country][0]}&lamax=${boundingBoxes[country][3]}&lomax=${boundingBoxes[country][2]}`)
      .then(resp => resp.json())
      .then(resp => {
        let countries = [...this.state.countries]
        countries
          .push({
            name: country,
            count: resp.states.length
          })

        countries = countries.sort(function(a, b) { return b.count - a.count } )
        this.setState({ countries }, () => console.log(this.state))
      })
  }

  componentDidMount() {
    this.fetchLondonData()

    Object.keys(boundingBoxes).forEach(country => {
      this.fetchCountryData(country)
    })
  }


  render() {
    if (!(this.state.dataLondon && this.state.countries)) {
      return <h2>Loading...</h2>
    }
    return (<div>
      <h1>Skystalker</h1>
      <h3>Explore the number of airplanes currently in the crowded London sky</h3>
      <London london={this.state.dataLondon} />
      <Countries countries={this.state.countries} london={this.state.dataLondon.length} />
    </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)