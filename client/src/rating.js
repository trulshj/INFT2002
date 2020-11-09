// @flow

import * as React from 'react';
import { Component } from 'react-simplified';
import ReactStars from "react-rating-stars-component";

export class StarRating extends Component {

    render(){
      const ratingChanged = (newRating) => {
        console.log(newRating);
      };
      return (
          <ReactStars
            count={5}
            onChange={ratingChanged}
            size={24}
            isHalf={true}
            value={3.5}
            activeColor="#ffd700"
            edit={false}
          />)
    }
  
  }