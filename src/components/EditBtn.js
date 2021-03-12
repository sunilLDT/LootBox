import React from 'react';
import {SvgXml} from 'react-native-svg';

export default ({x,text}) => {
    const xml = `
    <?xml version="1.0" encoding="UTF-8"?>
        <svg width="100px" height="24px" viewBox="0 0 100 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <title>verify copy 3</title>
            <defs>
                <linearGradient x1="104.414637%" y1="52.0353125%" x2="0%" y2="47.12%" id="linearGradient-1">
                    <stop stop-color="#865CF4" offset="0%"></stop>
                    <stop stop-color="#C01C8A" offset="100%"></stop>
                </linearGradient>
            </defs>
            <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <g id="bg1" transform="translate(-121.000000, -244.000000)">
                    <g id="verify-copy-3" transform="translate(121.000000, 244.000000)">
                        <path d="M92.6198837,0.5 C94.1386667,0.5 95.5136667,1.11560847 96.508971,2.1109127 C97.5042752,3.10621694 98.1198837,4.48121694 98.1198837,6 C98.1198837,6.37720433 98.0810795,6.75340806 98.0040838,7.12267053 L98.0040838,7.12267053 L95.5263664,19.0055213 C95.2607854,20.2792175 94.5670667,21.3727033 93.614471,22.1481878 C92.6618754,22.9236722 91.4504027,23.3811553 90.1493138,23.3828461 L90.1493138,23.3828461 L7.38150513,23.490407 C5.86272335,23.4923807 4.4869245,22.8785596 3.49032766,21.8845497 C2.49373082,20.8905397 1.87633599,19.5163409 1.87436226,17.9975591 C1.87387142,17.6198566 1.91228869,17.2431081 1.98900584,16.8732785 L1.98900584,16.8732785 L4.47628722,4.88286694 C4.74104636,3.60654529 5.43563773,2.51082856 6.38991261,1.73419223 C7.34418748,0.95755591 8.55814585,0.5 9.86163899,0.5 L9.86163899,0.5 Z" id="Rectangle" stroke="url(#linearGradient-1)" fill-opacity="0.175562719" fill="#AA33B2"></path>
                        <text id="Verify-Order" opacity="0.870000005"  font-size="10" font-style="italic" font-weight="bold" line-spacing="16" fill="#FFFFFF">
                            <tspan x=${x ? x : '18.005'} y="14">${text?text:"Edit Profile"}</tspan>
                        </text>
                    </g>
                </g>
            </g>
        </svg>
    `;
    return <SvgXml xml={xml} width="100%" />;
};