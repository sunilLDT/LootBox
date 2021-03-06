import React from 'react';
import {Dimensions} from 'react-native';
import {SvgXml} from 'react-native-svg';

const {width, height} = Dimensions.get('window');

export default ({}) => {
    
  const xml = `
    <?xml version="1.0" encoding="UTF-8"?>
    <svg width="17px" height="8px" viewBox="0 0 17 8" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <title>bar3</title>
        <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" fill-opacity="0">
            <rect id="bar3" stroke="#4B4956" fill="#DF2EDC" x="0.5" y="0.5" width="16" height="7" rx="2"></rect>
        </g>
    </svg>
  `;
  return <SvgXml xml={xml} width="100%" />;
};