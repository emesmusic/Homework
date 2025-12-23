import React from 'react'
import { useState } from 'react';

export default function RecipeForm(props) {
    const [isFormActive, setIsFormActive] = useState(false);
    const showForm = () => {
        setIsFormActive(!isFormActive);
    }
    const [ingredientsList, setIngredientsList] = useState([0]);
    const [directionsList, setDirectionsList] = useState([0]);
    const addElement = (setList) => {
        setList(prevList => [...prevList, prevList.length]);
    }
    const formSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const formDataObj = {
            name: formData.get('name'),
            ingredients: formData.getAll('ingredients'),
            directions: formData.getAll('directions')
        }
        props.onClick(formDataObj);
        setIsFormActive(false);
        setIngredientsList([0]);
        setDirectionsList([0]);
        e.target.reset();
    }

    const formEntry = (
        <>
            <form onSubmit={formSubmit}>
                <input name="name" type="text" placeholder="Recipe Name" />
                Ingredients:
                {ingredientsList.map(i => <input key={i} name="ingredients" type="text" />)}
                <button type="button" onClick={() => addElement(setIngredientsList)}>+</button>
                Directions:
                {directionsList.map(i => <input key={i} name="directions" type="text" />)}
                <button type="button" onClick={() => addElement(setDirectionsList)}>+</button>
                <button type="submit">Add Recipe</button>
            </form>
        </>

    )

    return (
        <>
            <button onClick={showForm}>{isFormActive ? 'Hide' : 'Add Recipe'}</button>
            {isFormActive ? formEntry : null}
        </>
    )
}


// import React, { Component } from 'react'

// export default class recipeForm extends Component {
//     state = {
//         isFormActive: false,
//         ingredientsList: [0],
//         directionsList: [0]
//     };

//     showForm = () => {
//         this.setState({ isFormActive: !this.state.isFormActive })
//     }
//     addDirection = () => {
//         this.setState(prevState => ({ directionsList: [...prevState.directionsList, prevState.directionsList.length] }));
//     }
//     addIngredient = () => {
//         this.setState(prevState => ({ ingredientsList: [...prevState.ingredientsList, prevState.ingredientsList.length] }));
//     }
//     formSubmit = (e) => {
//         e.preventDefault();
//         const formData = new FormData(e.target);
//         const formDataObj = {
//             name: formData.get('name'),
//             ingredients: formData.getAll('ingredients'),
//             directions: formData.getAll('directions')
//         }
//         this.props.onClick(formDataObj);
//         this.setState({ isFormActive: false, ingredientsList: [0], directionsList: [0] });
//         e.target.reset();
//     }
//     renderFormEntry = () => {
//         return (


//             <>
//                 <form onSubmit={this.formSubmit}>
//                     <input name="name" type="text" placeholder="Recipe Name" />
//                     Ingredients:
//                     {this.state.ingredientsList.map(i => <input key={i} name="ingredients" type="text" />)}
//                     <button type="button" onClick={() => this.addIngredient()}>+</button>
//                     Directions:
//                     {this.state.directionsList.map(i => <input key={i} name="directions" type="text" />)}
//                     <button type="button" onClick={() => this.addDirection()}>+</button>
//                     <button type="submit">Add Recipe</button>
//                 </form>
//             </>
//         )

//     }
//     render() {
//         return (
//             <>
//                 <button onClick={this.showForm}>{this.state.isFormActive ? 'Hide' : 'Add Recipe'}</button>
//                 {this.state.isFormActive ? this.renderFormEntry() : null}
//             </>
//         )
//     }
// }

