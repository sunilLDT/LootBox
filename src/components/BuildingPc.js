import React from 'react';
import {SvgXml} from 'react-native-svg';

export default ({text,x}) => {
    
  const xml = `
  <?xml version="1.0" encoding="UTF-8"?>
    <svg width="170px" height="37px" viewBox="0 0 170 37" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <title>Group 9</title>
        <defs>
            <linearGradient x1="104.414637%" y1="51.6738411%" x2="0%" y2="47.6314879%" id="linearGradient-1">
                <stop stop-color="#865CF4" offset="0%"></stop>
                <stop stop-color="#C01C8A" offset="100%"></stop>
            </linearGradient>
        </defs>
        <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <g id="bg1" transform="translate(-86.000000, -387.000000)">
                <g id="Group-9" transform="translate(86.000000, 387.000000)">
                    <path d="M161.825808,0.5 C163.344591,0.5 164.719591,1.11560847 165.714895,2.1109127 C166.710199,3.10621694 167.325808,4.48121694 167.325808,6 C167.325808,6.55916335 167.240539,7.11505716 167.072941,7.64851253 L167.072941,7.64851253 L159.276741,32.4634293 C158.917053,33.6082982 158.206942,34.5704481 157.286743,35.2467412 C156.366544,35.9230344 155.236257,36.3134709 154.036216,36.3149128 L154.036216,36.3149128 L8.17126943,36.4901812 C6.65248746,36.4920061 5.27674875,35.8780503 4.2802493,34.8839427 C3.28374985,33.8898351 2.66648965,32.5155758 2.66466471,30.9967939 C2.66399343,30.4381295 2.74844309,29.8826236 2.91510674,29.3493979 L2.91510674,29.3493979 L10.7259754,4.35921276 C11.0847874,3.21122547 11.7957982,2.24642228 12.7177948,1.56861591 C13.6397914,0.890809546 14.7727739,0.5 15.9755294,0.5 L15.9755294,0.5 Z" id="Rectangle" stroke="url(#linearGradient-1)" fill-opacity="0.175562719" fill="#AA33B2"></path>
                    <g id="Group-14-Copy" transform="translate(40.000000, 11.000000)" fill="#FFFFFF" font-family="Avenir-Heavy, Avenir" font-size="14" font-weight="600" line-spacing="16">
                        <g id="Group-2-Copy-2" transform="translate(0.054511, 0.000000)">
                            <text id="Build-Your-PC">
                                <tspan x=${x ? x : '0.655905963'} y="14">${text?text:"Building Pc"}</tspan>
                            </text>
                        </g>
                    </g>
                </g>
            </g>
        </g>
    </svg>
  `;
  return <SvgXml xml={xml} width="100%" />;
};