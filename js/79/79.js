'use strict';
(function () {

    class Element {
        #innerText;
        #children = [];



        constructor(innerText) {
            this.#innerText = innerText;
        }


        render() {
            console.log(this.#innerText);
            this.#children.forEach(child => child.render());
        }

        addChild(element) {
            this.#children.push(element);
        }

        removeChild(element) {
            const index = this.#children.indexOf(element);
            if (index !== -1) {
                this.#children.splice(index, 1);
            }
        }

        getChildren = () => this.#children;

        getInnerText = () => this.#innerText;

        setInnerText(innerText)  { 
            this.#innerText = innerText;
        }
    }


    class Div extends Element {

        render() {
            console.log("I'm a Div");
            super.render();
        }
    }

    class H1 extends Element {
        render() {
            console.log("I'm an H1");
            super.render();
        }
    }



const div = new Div('a');
const h11 = new H1('b');
const h12 = new H1('c');
div.addChild(h11);
div.addChild(h12);
div.render();

div.removeChild(h11);
div.setInnerText('New div inner text');
div.render();


})();