import React from 'react';
import {Dimensions} from 'react-native';
import {SvgXml} from 'react-native-svg';

const {width, height} = Dimensions.get('window');

export default () => {
    
  const xml = `
  <?xml version="1.0" encoding="UTF-8"?>
<svg width="58px" height="28px" viewBox="0 0 58 28" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <title>button1</title>
    <defs>
        <linearGradient x1="104.414637%" y1="58.2350965%" x2="0%" y2="38.3472057%" id="linearGradient-1">
            <stop stop-color="#865CF4" offset="0%"></stop>
            <stop stop-color="#C01C8A" offset="100%"></stop>
        </linearGradient>
    </defs>
    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g id="button1" fill="url(#linearGradient-1)">
            <path d="M13.1333673,0 L49.8354083,0 C53.1491168,8.30924837e-19 55.8354083,2.6862915 55.8354083,6 C55.8354083,6.60774069 55.7430741,7.21195417 55.5615666,7.7919574 L50.595544,23.6607671 C49.8139688,26.1582727 47.5038576,27.8611341 44.8869252,27.8687841 L8.17702562,27.9760965 C4.86333128,27.9857832 2.16919858,25.3073559 2.15951181,21.9936616 C2.15772667,21.3829945 2.24917783,20.7756336 2.43070489,20.1925681 L7.40458599,4.21644597 C8.18538659,1.70851193 10.5066997,4.03522469e-15 13.1333673,0 Z" id="Rectangle"></path>
    </g>
</svg>
`;

  return <SvgXml xml={xml} width="100%" />;
};
