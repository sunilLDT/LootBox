import React from 'react';
import {Dimensions} from 'react-native';
import {SvgXml} from 'react-native-svg';

const {width, height} = Dimensions.get('window');

export default ({price, x,text,kd}) => {
    
  const xml = `
  <?xml version="1.0" encoding="UTF-8"?>
  <svg width="353px" height="90px" viewBox="0 0 353 90" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <title>signup copy 2</title>
      <defs>
          <linearGradient x1="104.414637%" y1="50.8204837%" x2="0%" y2="48.8390023%" id="linearGradient-1">
              <stop stop-color="#865CF4" offset="0%"></stop>
              <stop stop-color="#C01C8A" offset="100%"></stop>
          </linearGradient>
          <path d="M18.1313756,0 L302.68898,0 C308.211828,3.019347e-14 312.68898,4.4771525 312.68898,10 C312.68898,10.6887042 312.617834,11.3755661 312.476673,12.0496486 L306.663512,39.8092538 C305.694061,44.4386789 301.613758,47.7557719 296.883917,47.7596019 L12.3082153,47.9900336 C6.78536957,47.9945056 2.30459322,43.5209799 2.30012116,37.9981342 C2.29956409,37.3101745 2.37000133,36.6239936 2.51031369,35.9504943 L8.34157136,7.96045746 C9.30765315,3.32326486 13.3946183,6.19919871e-15 18.1313756,0 Z" id="path-2"></path>
          <filter x="-6.9%" y="-54.2%" width="123.3%" height="262.5%" filterUnits="objectBoundingBox" id="filter-3">
              <feOffset dx="15" dy="13" in="SourceAlpha" result="shadowOffsetOuter1"></feOffset>
              <feGaussianBlur stdDeviation="10.5" in="shadowOffsetOuter1" result="shadowBlurOuter1"></feGaussianBlur>
              <feColorMatrix values="0 0 0 0 0.721568627   0 0 0 0 0.141176471   0 0 0 0 0.596078431  0 0 0 0.19025896 0" type="matrix" in="shadowBlurOuter1"></feColorMatrix>
          </filter>
      </defs>
      <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
          <g id="signup-copy-2" transform="translate(4.000000, 8.000000)">
              <g id="Rectangle">
                  <use fill="black" fill-opacity="1" filter="url(#filter-3)" xlink:href="#path-2"></use>
                  <use fill="url(#linearGradient-1)" fill-rule="evenodd" xlink:href="#path-2"></use>
              </g>
              <g id="Group-14-Copy" transform="translate(32.000000, 14.400000)" fill="#FFFFFF" font-family="Montserrat-Bold, Montserrat" font-size="16" font-weight="bold" line-spacing="16" opacity="0.870000005">
                  <g id="Group-2-Copy-2" transform="translate(0.135120, 0.000000)">
                      <text id="Pay">
                          <tspan x="0.864880163" y="15.6">${text?text:"PAY"}</tspan>
                      </text>
                      <text id="KWD-30,400">
                          <tspan x=${x ? x : '145.86488'} y="15.6">${kd?kd:"KD"} ${price?price:"000"}</tspan>
                      </text>
                  </g>
              </g>
          </g>
      </g>
  </svg>
`;

  return <SvgXml xml={xml} width="100%" />;
};
