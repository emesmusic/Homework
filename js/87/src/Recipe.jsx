import { Component } from "react";
import ListComponent from "./ListComponent";

export default class Recipe extends Component {
  state = {
    pictureShowing: true
  };

  constructor() {
    super();
  }

  togglePicture = () => {
    console.log('toggle picture called');
    this.setState({
      pictureShowing: !this.state.pictureShowing
    });
  }

  render() {
    const { pictureShowing } = this.state;
    const { name, picture, ingredients, directions } = this.props.recipe ?? {};

    return (
      <div>
        <h2>{name}</h2>
        {
          picture && (
            <div>
              {pictureShowing && <img src={picture} />}

              <button onClick={this.togglePicture}>{pictureShowing ? 'hide' : 'show'}</button>

            </div>

          )
        }
        { !picture && <p>No picture available</p>}

        <ListComponent name="ingredients" items={ingredients} />

        <ListComponent name="directions" items={directions} />

      </div>
    );
  }
}
