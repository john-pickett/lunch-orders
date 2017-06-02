import React, { Component } from 'react';
import './App.css';

var weekDays = [
  {
    "day": "Monday",
    "date": "6/5/2017",
    "restaurant": "Chick-fil-A",
    "menu": "http://www.chickfila.com/menu"
  },
  {
    "day": "Tuesday",
    "date": "6/6/2017",
    "restaurant": "Panera",
    "menu": "http://www.panera.com/menu"
  },
  {
    "day": "Wednesday",
    "date": "6/7/2017",
    "restaurant": "Wasabi Sushi",
    "menu": "http://www.wasabi.com/menu"
  },
  {
    "day": "Thursday",
    "date": "6/8/2017",
    "restaurant": "Smokey Bones",
    "menu": "http://www.smokeybones.com/menu"
  },
  {
    "day": "Friday",
    "date": "6/9/2017",
    "restaurant": "Pi Pizza",
    "menu": "http://www.pipizza.com/menu"
  }
];

var lunchOrders = [
    {
      "id":1,
      "employee": "John P",
      "day": "Monday",
      "item": "Grilled Chicken Sandwich",
      "price": 5
    },
    {
      "id":2,
      "employee": "Mike H",
      "day": "Monday",
      "item": "Grilled Chicken Sandwich",
      "price": 5
    },
    {
      "id":3,
      "employee": "Jim H",
      "day": "Tuesday",
      "item": "Italian Panini",
      "price": 10
    },
    {
      "id":4,
      "employee": "Mary F",
      "day": "Wednesday",
      "item": "Salmon Skin Roll",
      "price": 10
    },
    {
      "id":5,
      "employee": "Brian T",
      "day": "Thursday",
      "item": "BBQ Plate",
      "price": 5
    },
    {
      "id":6,
      "employee": "John P",
      "day": "Wednesday",
      "item": "California Roll",
      "price": 5
    },
    {
      "id":7,
      "employee": "Helen C",
      "day": "Tuesday",
      "item": "Chicken Panini",
      "price": 10
    },
    {
      "id":8,
      "employee": "Chris F",
      "day": "Thursday",
      "item": "Baby Back Ribs",
      "price": 15
    },
    {
      "id":9,
      "employee": "Jim B",
      "day": "Friday",
      "item": "Pepperoni Pizza",
      "price": 10
    },
    {
      "id":10,
      "employee": "Mike H",
      "day": "Friday",
      "item": "BBQ Chicken Pizza",
      "price": 10
    },
    {
      "id":11,
      "employee": "John P",
      "day": "Friday",
      "item": "Pineapple Pizza",
      "price": 12
    }
];

class TableRow extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var order = this.props.order;
    var price = "$" + order.price;
    var day = order.day;
    var name = order.employee;
    var item = order.item;

    return (
        <tr>
          <td>{day}</td>
          <td>{price}</td>
          <td>{name}</td>
          <td>{item}</td>
        </tr>
    );
  }
}

class OrderTable extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var row = [];
    var dayOption = this.props.dayOption;
    var employeeOption = this.props.employeeOption;
    var orders = this.props.orders;
    var totalPrice = 0;
    var displayPrice = null;

    if (dayOption === "All" && employeeOption === "All"){
      totalPrice = null;
      displayPrice = null;
      orders.forEach(function(order){
        row.push(<TableRow order={order} />);
      });
    } else if (dayOption !== "All"){
      orders.forEach(function(order){
        if (order.day === dayOption){
          totalPrice += order.price;
          row.push(<TableRow order={order} />);
        }
      });
      displayPrice = <tr><td>Total: </td><td>${totalPrice}</td></tr>;
    } else {
      orders.forEach(function(order){
        if (order.employee === employeeOption){
          totalPrice += order.price;
          row.push(<TableRow order={order} />);
        }
      });
      displayPrice = <tr><td>Total: </td><td>${totalPrice}</td></tr>;
    }


    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>Day</th>
              <th>Price</th>
              <th>Name</th>
              <th>Order</th>
            </tr>
          </thead>
          <tbody>
            {row}
            {displayPrice}
          </tbody>
        </table>
      </div>
    );
  }
}

class EmployeeSelector extends React.Component {
 	constructor(props) {
  super(props);

  this.handleFilterByName = this.handleFilterByName.bind(this);
  }

  handleFilterByName(e){
  	this.props.onFilterByName(e.target.value)
  }

  render() {

    var message = "Filter by employee: ";
    return (
 			<form>
      	<label>
        	{message}
        </label>
         <select value={this.props.employeeOption} onChange={this.handleFilterByName}>
           <option value="All">All</option>
           <option value="John P">John P</option>
           <option value="Mike H">Mike H</option>
           <option value="Mary F">Mary F</option>
           <option value="Jim B">Jim B</option>
           <option value="Chris F">Chris F</option>
         </select>
       </form>
    );
 	}
 }

class DaySelector extends React.Component {
 	constructor(props) {
  super(props);

  this.handleFilterByDay = this.handleFilterByDay.bind(this);
  }

  handleFilterByDay(e){
  	this.props.onFilterByDay(e.target.value)
  }

  render() {

    var message = "Filter by day: ";
    return (
 			<form>
      	<label>
        	{message}
        </label>
         <select value={this.props.dayOption} onChange={this.handleFilterByDay}>
           <option value="All">This Week</option>
           <option value="Monday">Monday</option>
           <option value="Tuesday">Tuesday</option>
           <option value="Wednesday">Wednesday</option>
           <option value="Thursday">Thursday</option>
           <option value="Friday">Friday</option>
         </select>
       </form>
    );
 	}
 }


class WeeklyOrders extends Component{
  constructor(props) {
    super(props);
    this.state = {
      dayOption: 'All',
      employeeOption: 'All',
      data: this.props.orders,
      };

    this.handleFilterByDay = this.handleFilterByDay.bind(this);
    this.handleFilterByName = this.handleFilterByName.bind(this);

  }

  handleFilterByDay(dayOption) {
    this.setState({
      dayOption: dayOption,
      employeeOption: "All"
      });
    }

  handleFilterByName(employeeOption) {
    this.setState({
      employeeOption: employeeOption,
      dayOption: "All"
      });
    }


  render(){


    return (
      <div>
        <DaySelector dayOption={this.state.dayOption}
          onFilterByDay={this.handleFilterByDay}/>
        <EmployeeSelector employeeOption={this.state.employeeOption}
          onFilterByName={this.handleFilterByName}/>
        <OrderTable dayOption={this.state.dayOption}
          employeeOption={this.state.employeeOption}
          orders={this.props.orders} />
      </div>
    );
  }
}

class MenuTable extends Component {
  constructor(props){
    super(props);
    this.state = {
      data: this.props.days
    };
  }

  render() {
    var row = [];
    this.props.days.forEach(function(day){
      row.push(<tr><td>{day.day}</td><td>{day.date}</td><td>{day.restaurant}</td><td><a href={day.menu}>{day.menu}</a></td></tr>);
    });

    return (
      <div id="menu-table">
        <table>
          <thead>
            <tr>
              <th>Day</th>
              <th>Date</th>
              <th>Restaurant</th>
              <th>Menu</th>
            </tr>
          </thead>
          <tbody>
            {row}
          </tbody>
        </table>
      </div>
    );
  }
}

class App extends Component {
  render() {
    return (
      <div>
        <h1>OneSpace Lunch Ordering</h1>
        <h2>This Week's Menus</h2>
          <MenuTable days={weekDays}/>
        <h2>This Week's Current Orders</h2>
        <WeeklyOrders orders={lunchOrders} />
      </div>
    );
  }
}

export default App;
