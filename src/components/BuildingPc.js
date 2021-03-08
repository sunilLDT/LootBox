import React from 'react';
import {SvgXml} from 'react-native-svg';

export default ({text,x,size}) => {
    
  const xml = `
  <?xml version="1.0" encoding="UTF-8"?>
    <svg width="167px" height="53px" viewBox="0 0 167 53" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <title>Group 9 Copy</title>
        <defs>
            <linearGradient x1="104.414637%" y1="53.5589953%" x2="0%" y2="44.9639643%" id="linearGradient-1">
                <stop stop-color="#865CF4" offset="0%"></stop>
                <stop stop-color="#C01C8A" offset="100%"></stop>
            </linearGradient>
        </defs>
        <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <g id="bg1" transform="translate(-80.000000, -558.000000)">
                <g id="Group-9-Copy" transform="translate(80.000000, 558.000000)">
                    <path d="M156.923968,0.5 C158.995035,0.5 160.870035,1.33946609 162.227268,2.69669914 C163.584501,4.05393219 164.423968,5.92893219 164.423968,8 C164.423968,8.57236876 164.358447,9.14285633 164.228686,9.70032199 L164.228686,9.70032199 L155.658676,46.5177614 C155.263788,48.2142304 154.310826,49.6630768 153.021131,50.6883418 C151.731436,51.7136068 150.105008,52.3152904 148.363187,52.3174337 L148.363187,52.3174337 L10.0799345,52.4875959 C8.00886824,52.4901444 6.13283667,51.6529862 4.77393453,50.2974243 C3.4150324,48.9418624 2.57325969,47.0678968 2.57071117,44.9968306 C2.5700055,44.4233655 2.63507395,43.8517116 2.76464097,43.2930748 L2.76464097,43.2930748 L11.3433338,6.30547316 C11.7375167,4.60592752 12.6917033,3.15455923 13.9835089,2.12807735 C15.2753145,1.10159547 16.9047392,0.5 18.6493984,0.5 L18.6493984,0.5 Z" id="Rectangle" stroke="url(#linearGradient-1)" fill-opacity="0.175562719" fill="#AA33B2"></path>
                    <text id="متجر-النهب" font-family="GeezaPro-Bold, Geeza Pro" font-size=${size ? size :"12"} font-weight="bold" line-spacing="16" fill="#FFFFFF">
                        <tspan x=${x ? x : "53.2287523"} y="26.6564331">${text?text:"Buildong Pc"}</tspan>
                    </text>
                </g>
            </g>
        </g>
    </svg>
  `;
  return <SvgXml xml={xml} width="100%" />;
};