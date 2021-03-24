import React from "react";
import { ids } from "webpack";

import Filters from "./Filters";
import PetBrowser from "./PetBrowser";
let baseUrl = "/api/pets";
class App extends React.Component {
  constructor() {
    super();

    this.state = {
      pets: [],
      filters: {
        type: "all",
      },
    };
  }

  onChangeType = (event) => {
    console.log(event.target.value);
    this.setState = {
      filters: {
        type: event.target.value,
      },
    };
  };

  onFindPetsClick = () => {
    if (this.state.filters.type !== "all") {
      fetch(baseUrl + "?type=" + this.state.filters.type)
        .then((r) => r.json())
        .then((petData) =>
          this.setState({
            pets: petData,
          })
        );
    } else {
      fetch(baseUrl)
        .then((r) => r.json())
        .then((petData) =>
          this.setState({
            pets: petData,
          })
        );
    }
  };

  onAdoptPet = (id, updatePet) => {
    updatePet.isAdopted = true;
    this.setState({
      pets: [
        ...this.state.pets.map((pet) => (pet.id === id ? updatePet : pet)),
      ],
    });
  };

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters
                onChangeType={this.onChangeType}
                onFindPetsClick={this.onFindPetsClick}
              />
            </div>
            <div className="twelve wide column">
              <PetBrowser onAdoptPet={this.onAdoptPet} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
