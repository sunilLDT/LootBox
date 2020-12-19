import React from 'react';
import {Dimensions} from 'react-native';
import {SvgXml} from 'react-native-svg';

const {width, height} = Dimensions.get('window');

export default () => {
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
    <svg width="97px" height="24px" viewBox="0 0 97 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <title>edit</title>
        <defs>
            <linearGradient x1="104.414637%" y1="52.163155%" x2="0%" y2="46.9391009%" id="linearGradient-1">
                <stop stop-color="#865CF4" offset="0%"></stop>
                <stop stop-color="#C01C8A" offset="100%"></stop>
            </linearGradient>
        </defs>
        <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <g id="edit">
                <path d="M88.8318112,0.5 C90.3505943,0.5 91.7255943,1.11560847 92.7208985,2.1109127 C93.7162028,3.10621694 94.3318112,4.48121694 94.3318112,6 C94.3318112,6.55787071 94.2469359,7.11249458 94.0800987,7.64483383 L94.0800987,7.64483383 L90.356048,19.5274255 C89.9970039,20.6730528 89.2871146,21.636015 88.3668433,22.3129843 C87.4465721,22.9899537 86.315919,23.3809303 85.1153475,23.3825864 L85.1153475,23.3825864 L8.16672498,23.4887339 C6.64794337,23.490829 5.27209547,22.8771178 4.2754192,21.8831875 C3.27874293,20.8892572 2.6612383,19.5151077 2.6591432,17.9963261 C2.65837387,17.438621 2.74243401,16.8840428 2.9084399,16.3516167 L2.9084399,16.3516167 L6.64642544,4.36287759 C7.00464696,3.21396347 7.71558934,2.24824408 8.6378424,1.56975321 C9.56009547,0.89126234 10.6936592,0.5 11.8971235,0.5 L11.8971235,0.5 Z" id="Rectangle" stroke="url(#linearGradient-1)" fill-opacity="0.175562719" fill="#AA33B2"></path>
                <text id="Edit-Profile" font-family="Montserrat" font-size="10" font-style="italic" font-weight="bold" line-spacing="12" fill="#ECDBFA">
                    <tspan x="19" y="16">Edit Profile</tspan>
                </text>
            </g>
        </g>
    </svg>`;
    return <SvgXml xml={xml} width="100%" />;
};