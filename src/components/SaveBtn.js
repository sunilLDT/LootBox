import React from 'react';
import {Dimensions} from 'react-native';
import {SvgXml} from 'react-native-svg';

const {width, height} = Dimensions.get('window');

export default ({text, x}) => {
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
    <svg width="${
        width * 0.8
      }px" height="52px" viewBox="0 0 315 48" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <title>gmail</title>
        <defs>
            <linearGradient x1="104.414637%" y1="50.8204837%" x2="0%" y2="48.8390023%" id="linearGradient-1">
                <stop stop-color="#865CF4" offset="0%"></stop>
                <stop stop-color="#C01C8A" offset="100%"></stop>
            </linearGradient>
        </defs>
        <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <g id="gmail">
                <path d="M302.68898,0.5 C305.312333,0.5 307.687333,1.56332372 309.406495,3.28248558 C311.125656,5.00164744 312.18898,7.37664744 312.18898,10 C312.18898,10.654269 312.121391,11.3067878 311.987289,11.9471662 L311.987289,11.9471662 L306.174128,39.7067713 C305.713638,41.9057483 304.514322,43.7930464 302.868459,45.131055 C301.222596,46.4690636 299.130186,47.2577828 296.883512,47.259602 L296.883512,47.259602 L12.3078104,47.4900337 C9.68445869,47.492158 7.30859845,46.4307577 5.58804509,44.7129885 C3.86749172,42.9952193 2.80224522,40.6210811 2.800121,37.9977294 C2.79959178,37.3441676 2.86650715,36.6922958 2.9998039,36.0524714 L2.9998039,36.0524714 L8.83106157,8.06243459 C9.28995042,5.8597681 10.4900491,3.96915945 12.1379154,2.62921743 C13.7857818,1.2892754 15.8814159,0.5 18.1313756,0.5 L18.1313756,0.5 Z" id="Rectangle" stroke="url(#linearGradient-1)" fill-opacity="0.175562719" fill="#AA33B2"></path>
                <text id="Continue-with-Gmail" opacity="0.870000005" font-family="Avenir-Black, Avenir" font-size="14" font-weight="700" line-spacing="16" fill="#FFFFFF">
                    <tspan x=${x ? x : '135.848624'} y="28">${
                        text?text : 'Save'}</tspan>
                </text>
                <g id="Group" transform="translate(70.000000, 12.000000)">
                    <g id="Rectangle">
                        <rect x="0" y="0" width="24" height="24"></rect>
                    </g>
                </g>
            </g>
        </g>
    </svg>`;
    return <SvgXml xml={xml} width="100%" />;
};