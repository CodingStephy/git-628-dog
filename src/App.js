import React, {useState, useEffect} from "react";
import "./App.css";
import { Route, Link, Switch } from "react-router-dom";
import Display from "./Display";
import Form from "./Form";

function App() {

  const url = "https://dogs-api-628-sl.herokuapp.com";

  const [dogs, setDogs] = useState([])

  const emptyDog = {
    name: "",
    age: 0,
    img: ""
  }

  const [selectedDog, setSelectedDog] = useState(emptyDog)

  const getDogs = () => {
    fetch(url + "/dog")
    .then((response) => response.json())
    .then((data) => setDogs(data))
  }

  useEffect(() => {getDogs()}, [])

  const handleCreate = (newDog) => {
    fetch(url + "/dog", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newDog)
    })
    .then(() => {
      getDogs()
    })
  }

  const handleUpdate = (dog) => {
    fetch(url + "/dog/"+ dog._id, {
      method: "put",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(dog)
    })
    .then(() => {
      getDogs()
    })
  }

  const selectDog = (dog) => {
    setSelectedDog(dog)
  }

  const deleteDog = (dog) => {
    fetch(url + "/dog/"+ dog._id, {
      method: "delete",
    })
    .then(() => {
      getDogs()
    })
  }

  return (
    <div className="App">
      <h1>DOG LISTING SITE</h1>
      <hr />
      <Link to="/create">
        <button>Add Dog</button>
      </Link>
      <main>
        <Switch>
          <Route exact path="/" render={(rp) => <Display {...rp} dogs={dogs} selectDog={selectDog}
          deleteDog ={deleteDog}
          />} />
          <Route
            exact
            path="/create"
            render={(rp) => (
              <Form {...rp} label="create" dog={emptyDog} handleSubmit={handleCreate} />
            )}
          />
          <Route
            exact
            path="/edit"
            render={(rp) => (
              <Form {...rp} label="update" dog={selectedDog} handleSubmit={handleUpdate} />
            )}
          />
        </Switch>
      </main>
    </div>
  );
}

export default App;