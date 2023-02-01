import React, { Component } from "react";
import { ListGroup, ListGroupItem } from "reactstrap";

export default class CategoryList extends Component {
  state = {
    categories: []
  };
  //api'den gelen verileri almak için boş category array'i oluşturuldu

  componentDidMount(){
    this.getCategories();
  }


  getCategories = () => {
    fetch("https://saimthecan.github.io/shopping-json/categories.json")
    .then(response => response.json())
    .then(data => this.setState({categories:data}));
  
    
  }

  render() {
    return (
      <div>
        <h3>{this.props.info.title}</h3>
      
        <ListGroup>
          {this.state.categories.map((category) => ( 
            <ListGroupItem active={category.categoryName===this.props.currentCategory?true:false}
              onClick={() => this.props.changeCategory(category)}
         
              key={category.id}
         
            >
              {category.categoryName}
           
            </ListGroupItem>
          ))}
        </ListGroup>
  
      </div>
    );
  }
}
