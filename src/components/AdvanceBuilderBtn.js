import React from 'react';
import {Dimensions} from 'react-native';
import {SvgXml} from 'react-native-svg';

const {width, height} = Dimensions.get('window');

export default ({text, x}) => {
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
    <svg width="147px" height="32px" viewBox="0 0 147 32" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <title>Group 9</title>
        <defs>
            <linearGradient x1="104.414637%" y1="51.6744566%" x2="0%" y2="47.6306169%" id="linearGradient-1">
                <stop stop-color="#865CF4" offset="0%"></stop>
                <stop stop-color="#C01C8A" offset="100%"></stop>
            </linearGradient>
        </defs>
        <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <g id="Group-9">
                <path d="M138.826258,0.5 C140.345041,0.5 141.720041,1.11560847 142.715345,2.1109127 C143.71065,3.10621694 144.326258,4.48121694 144.326258,6 C144.326258,6.55906642 144.241019,7.114865 144.073478,7.64823671 L144.073478,7.64823671 L137.84121,27.4888808 C137.481567,28.6338192 136.771461,29.5960379 135.851243,30.2723826 C134.931025,30.9487272 133.800694,31.3391979 132.6006,31.3406401 L132.6006,31.3406401 L8.17082291,31.4901799 C6.65204094,31.4920052 5.2763021,30.8780497 4.27980242,29.8839423 C3.28330275,28.8898349 2.66604225,27.5155758 2.66421698,25.9967938 C2.66354569,25.4382255 2.74796606,24.8828141 2.91457313,24.3496714 L2.91457313,24.3496714 L9.1615056,4.35948754 C9.52027335,3.21143075 10.231279,2.24655886 11.1532949,1.56870118 C12.0753107,0.890843489 13.2083368,0.5 14.4111455,0.5 L14.4111455,0.5 Z" id="Rectangle" stroke="url(#linearGradient-1)" fill-opacity="0.175562719" fill="#AA33B2"></path>
                <g id="Group-14-Copy" transform="translate(23.000000, 8.000000)" fill="#FFFFFF" font-family="Avenir-Heavy, Avenir" font-size="12" font-weight="600" line-spacing="16">
                    <g id="Group-2-Copy-2" transform="translate(0.935780, 0.000000)">
                        <text id="Advanced-Builder">
                            <tspan x=${x ? x : "0.770220183"} y="12">${text?text : 'Advanced Builder'}</tspan>
                        </text>
                    </g>
                </g>
            </g>
        </g>
    </svg>`;
    return <SvgXml xml={xml} width="100%" />;
};