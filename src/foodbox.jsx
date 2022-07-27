import React, { Component } from 'react'

export default class FoodBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // Data
            fruits: [
                { name: "watermelon", calories: 85, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUU6f46KXc-MVID2hpG51sf2rWEKceJSV2AA&usqp=CAU" },
                { name: "banana", calories: 111, img: "https://cdn.mos.cms.futurecdn.net/42E9as7NaTaAi4A6JcuFwG-1200-80.jpg" },
                { name: "biscuit", calories: 103, img: "https://5.imimg.com/data5/UT/BT/MY-50891191/sweet-biscuits-500x500.jpg" },
                { name: "pizza", calories: 290, img: "https://tmbidigitalassetsazure.blob.core.windows.net/rms3-prod/attachments/37/1200x1200/Pizza-from-Scratch_EXPS_FT20_8621_F_0505_1_home.jpg" },
                { name: "grapes", calories: 114, img: "https://img.freepik.com/premium-vector/isolated-dark-grape-with-green-leaf_317810-1956.jpg?w=2000" },
                { name: "raspberries", calories: 61, img: "https://resources.commerceup.io/?key=https%3A%2F%2Fprod-admin-images.s3.ap-south-1.amazonaws.com%2FkihicVhRurfO8LkxFVJg%2Fproduct%2Ffresh_raspberry.png&width=800&resourceKey=kihicVhRurfO8LkxFVJg" },
                { name: "orange", calories: 65, img: "https://namkalam.in/wp-content/uploads/2020/12/orange.png" },
                { name: "chocolate milk", calories: 208, img: "https://www.thespruceeats.com/thmb/4q2qtsKAR8x8TMqkBh-UgDpYxvc=/3603x3603/smart/filters:no_upscale()/chocolate-milk-recipe-2355494-hero-01-d44b4548f5904a758ed12d5caa0466fd.jpg" },
                { name: "apple", calories: 95, img: "https://usapple.org/wp-content/uploads/2019/10/apple-pink-lady.png" },
                { name: "strawberries", calories: 49, img: "https://thumbs.dreamstime.com/b/three-strawberries-strawberry-leaf-white-background-114284301.jpg" }
            ],
            searchTxt: "", // Data to be searched
            calories_count: 0, // Total calories
            myFruits: []
        }
    }
    // method for searching the fruit
    searchFruit = (event) => {
        this.setState({
            searchTxt: event.target.value
        })
    }
    // Capitalize the first letter of the fruit
    capatalize = (name) => {
        return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
    }
    // Add fruits to calories section
    addFruit = (event) => {
        let count = document.getElementById(event.target.value).value;
        let cal = this.state.fruits.filter((fruit) => {
            return fruit.name === event.target.value;
        })
        let fruitObj = {
            id: event.target.value,
            text: `${count} ${event.target.value} = ${(cal[0].calories) * count}`,
            btn_id: `${event.target.value}R`,
            calo: cal[0].calories * count
        }
        this.setState({
            myFruits: this.state.myFruits.concat(fruitObj),
            calories_count: this.state.calories_count + (cal[0].calories * count)
        })
        console.log(this.state.myFruits);
    }
    // Remove fruits from calories
    removeFruit = (event) => {
        document.getElementById(event.target.value).remove();
        let calorie = this.state.myFruits.filter((fruit) => {
            return `${fruit.id}R` === event.target.value
        })
        this.setState({
            calories_count: this.state.calories_count - calorie[0].calo
        })
    }

    // Main Render method
    render() {
        return (
            <div className="container">
                <div className="food-container">
                    <div className="box">
                        <div className="search">
                            <br></br>
                            
                            <input type="text" placeholder="Find a food 🔍" onChange={this.searchFruit} id="search" />
                        </div>
                        {this.state.fruits.filter((fruit) => {
                            return fruit.name.includes(this.state.searchTxt);
                        })
                            .map((fruit) => {
                                return <div key={fruit.name} className="fruit">
                                    <img src={fruit.img} alt="" className='image-is-64x64'/>
                                    <div className="detail">
                                        <h1>{this.capatalize(fruit.name)}</h1>
                                        <h4>{fruit.calories}</h4>
                                    </div>
                                    <div className="count">
                                        <input type="number" defaultValue="1" id={fruit.name} min="0" />
                                        <button onClick={this.addFruit} value={fruit.name}>+</button>
                                    </div>
                                </div>
                            })}
                    </div>
                    <div className="disp">
                        <h1>Today's Food {this.state.calories_count} Calories</h1>
                        {
                            this.state.myFruits.filter((fruit) => {
                                return fruit.text !== "";
                            })
                                .map((fruit) => {
                                    return <div key={fruit.id} className="item" id={fruit.btn_id}>
                                        <span>{fruit.text}</span>
                                        <button onClick={this.removeFruit} value={fruit.btn_id}>X</button>
                                    </div>
                                })
                        }
                    </div>
                </div>
            </div>
        )
    }
}