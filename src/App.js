import React from 'react';
import './App.css';
import Loading from './loading';

class App extends React.Component {
  constructor(){
    super()

    this.state = {
      people: [{
        name: '',
        email: '',
        dob: {},
        picture: ''
      }],
      loading: true
    }
  }

  fetchPeople() {
    const URL = "https://api.randomuser.me/" 
    fetch(URL)
    .then(response => response.json())
    .then(data => this.setState({people: data.results}))
  }

  componentDidMount() {
    this.fetchPeople()
  }

  shouldComponentUpdate(){
    console.log(this.state.people[0])
    return true
  }


  render() {
    //if (this.state.people[0]) console.log(this.state.people[0])
    const {name, email, dob, picture} = this.state.people[0]
    const fullName = `${name.title}. ${name.first} ${name.last}`
    const peopleAge = dob.age
    const peoplePhoto = picture.large
    
    return (
      <div className='father'>
        <header>
          <h1>Random People</h1>
        </header>
        <div className='info-people'>
         {this.state.people[0].name && <p className='name'><strong>{fullName}</strong></p>}
         {this.state.people[0].picture ? <img src={peoplePhoto} alt={fullName}></img> : <Loading />}
         {this.state.people[0].email && <p><strong>Email:</strong> {email}</p>}
         {this.state.people[0].dob.age && <p className='age'><strong>Idade:</strong> {peopleAge}</p>}
        </div>
        <button type='button' onClick={this.fetchPeople}>Random People</button>
      </div>
    )
  }
}
export default App;
