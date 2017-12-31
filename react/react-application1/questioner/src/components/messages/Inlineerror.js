import React from 'react';
import PropTypes from 'prop-types';

const Inlineerror = ({ text }) => <span style={{color:'#A2413F', fontWeight:'bold'}}>{ text }</span>


Inlineerror.protoTypes = {
    text:  PropTypes.string.isRequired
}

export default Inlineerror;