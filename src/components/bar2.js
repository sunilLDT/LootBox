import React from 'react';
import {SvgXml} from 'react-native-svg';

export default ({}) => {
    
  const xml = `
    <?xml version="1.0" encoding="UTF-8"?>
    <svg width="17px" height="8px" viewBox="0 0 17 8" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <title>bar2</title>
        <defs>
            <linearGradient x1="104.414637%" y1="57.8251153%" x2="0%" y2="38.9273356%" id="linearGradient-1">
                <stop stop-color="#865CF4" offset="0%"></stop>
                <stop stop-color="#C01C8A" offset="100%"></stop>
            </linearGradient>
        </defs>
        <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" fill-opacity="0">
            <rect id="bar2" stroke="url(#linearGradient-1)" fill="#DF2EDC" x="0.5" y="0.5" width="16" height="7" rx="2"></rect>
        </g>
    </svg>
  `;
  return <SvgXml xml={xml} width="100%" />;
};