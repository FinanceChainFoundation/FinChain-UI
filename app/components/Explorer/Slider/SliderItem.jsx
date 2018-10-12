import React, { Component } from 'react';

export default class SliderItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { count, item } = this.props;
    let width = 100 / count + '%';
    return (
      <li className="slider-item" style={{width: width}}>
          <a href={item.href} target="_blank">
            <img src={item.src} alt={item.alt} />
          </a>
      </li>
    );
  }
}
