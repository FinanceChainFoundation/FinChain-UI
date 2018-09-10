import React, { Component } from "react";

export default class SliderItem2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bool: false
        };
        this.handleEnter = this.handleEnter.bind(this);
        this.handleOut = this.handleOut.bind(this);
    }

    handleEnter() {

        this.setState({
            bool: true
        });
    }
    handleOut() {
        this.setState({
            bool: false
        });
    }

    render() {
        let {item} = this.props;
        let style = {};
        let imgs = "";
        if (this.props.bool) {
            style = {
                transition: "all 1s"
            };
            imgs = item.src;
        }
        if (this.state.bool) {
          if(item.key ==1 || item.key ==2  || item.key ==3 ||item.key ==5 ||item.key ==6 ||item.key ==7 ){
              style = {
                  float: "left",
                  width: "300px",
                  height: "300px",
                  borderBottom: "#28395F 1px solid",
                  borderRight: "#28395F 1px solid",

              };

          }else if(item.key ==4 ||item.key ==8 ){
              style = {
                  float: "left",
                  width: "300px",
                  height: "300px",
                  borderBottom: "#28395F 1px solid",

              };
          }else if(item.key ==9 ||item.key ==10 ||item.key ==11){

              style = {
                  float: "left",
                  width: "300px",
                  height: "300px",
                  borderRight: "#28395F 1px solid",
              };
          }else{
              style = {
                  float: "left",
                  width: "300px",
                  height: "300px",
              };
          }


            imgs = item.src2;
        }else{

            if(item.key ==1 || item.key ==2 || item.key ==3 ||item.key ==5 ||item.key ==6 ||item.key ==7 ){
                style = {
                    float: "left",
                    width: "300px",
                    height: "300px",
                    borderBottom: "#28395F 1px solid",
                    borderRight: "#28395F 1px solid",

                };

            }else if(item.key ==4 ||item.key ==8 ){
                style = {
                    float: "left",
                    width: "300px",
                    height: "300px",
                    borderBottom: "#28395F 1px solid",

                };
            }
            else if(item.key ==9 ||item.key ==10 ||item.key ==11){
                style = {
                    float: "left",
                    width: "300px",
                    height: "300px",
                    borderRight: "#28395F 1px solid",
                };
            }else{
                style = {
                    float: "left",
                    width: "300px",
                    height: "300px",
                };
            }



            imgs = item.src;
        }

        return (
        <li
            style={style}
            onMouseEnter={this.handleEnter}
            onMouseLeave={this.handleOut}>
            <a href={item.herf} target="_blank">
          <em>
            <img src= {imgs} onMouseEnter={this.handleEnter}
                 onMouseLeave={this.handleOut} />
          </em>
            </a>
        </li>


    );
    }
}
