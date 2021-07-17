import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import * as IMG from "./img";
import * as API from "./api/apiActions";

class Home extends Component {
  state = {
    name: "",
    isLoaded: false,
  };
 
  searchHandler = async () => {
    if (this.state.name) {
      const products = await API.findProductByCategoryAndName(this.state.name);
      this.props.dispatch({ type: "SEARCH_RESULT", payload: { products } });
      this.setState({
        isLoaded: true,
      });
    }
  };
  onChangeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  render() {
    if (this.state.isLoaded) {
      return <Redirect to="/market/search result" />;
    }
    return (
      <div className="home">
        <div
          className="hero-sec"
          style={{ backgroundImage: `url(${IMG.heroBackground})` }}
        >
          <div className="hero-box">
            <div className="hero-text">
              <h1>Welcome To Beetlehunt</h1>
            </div>
          <div className="main-add-user" style={{marginTop:"-100px",backgroundColor:"white"}}>
          <form className="add-user" style={{height:"300px"}}>
            <h2 className="text-center" style={{fontSize:"22px"}}>Please fill the form to get your result</h2>
            <span className="badge bg-dark mt-4">{this.state.text}</span>
            <div className="add-user-div" style={{textAlign:"center"}}>
              <label>Enter mobile number:</label><br/>
              <input type="text" name="username" onChange={this.onChange} />
            </div>
            <div className="add-user-div" style={{textAlign:"center"}}>
              <label>Enter pin number:</label><br/>
              <input
                type="pin"
                id="pin"
                name="pin"
                onChange={this.onChange}
              />
            </div><br/>
        
            <button
              onClick={this.register}
              type="button"
              className="add-user-button" style={{marginLeft:"42%",padding:"3px",width:"160px",backgroundColor:"#469A2D",color:"white"}}
            >
              Find
            </button>
        </form>
      </div>
           
          </div>
        </div>
     </div>
        
    );
  }
  announcementCard = (date, items, title, image, vendor, number) => {
    return (
      <div
        class="announcement-card"
        style={{ backgroundImage: `url(${image})` }}
      >
        <div className="card-heading d-flex justify-content-between">
          <span>{date}</span>
          <span>{items}</span>
        </div>
        <h1>{title}</h1>
        <div className="card-bottom">
          <p>{vendor}</p>
          <p>Phone: +91-{number}</p>
        </div>
      </div>
    );
  };
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(Home);
