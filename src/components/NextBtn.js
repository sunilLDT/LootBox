import React from 'react';
import {Dimensions} from 'react-native';
import {SvgXml} from 'react-native-svg';

const {width, height} = Dimensions.get('window');

export default () => {
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
    <svg width="281px" height="90px" viewBox="0 0 281 90" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <title>verify copy 2</title>
        <defs>
            <linearGradient x1="104.414637%" y1="51.3787278%" x2="0%" y2="48.0490779%" id="linearGradient-1">
                <stop stop-color="#865CF4" offset="0%"></stop>
                <stop stop-color="#C01C8A" offset="100%"></stop>
            </linearGradient>
            <path d="M18.1313756,0 L230.68898,0 C236.211828,-3.57752449e-14 240.68898,4.4771525 240.68898,10 C240.68898,10.6887042 240.617834,11.3755661 240.476673,12.0496486 L234.663087,39.8112847 C233.693828,44.4397908 229.614895,47.756618 224.885993,47.7616305 L12.3113593,47.9869505 C6.78851488,47.9928045 2.3066193,43.5204001 2.30076532,37.9975557 C2.30003523,37.3087598 2.37047258,36.6217316 2.51095551,35.9474136 L8.34157136,7.96045746 C9.30765315,3.32326486 13.3946183,6.19919871e-15 18.1313756,0 Z" id="path-2"></path>
            <filter x="-8.9%" y="-54.2%" width="130.2%" height="262.5%" filterUnits="objectBoundingBox" id="filter-3">
                <feOffset dx="15" dy="13" in="SourceAlpha" result="shadowOffsetOuter1"></feOffset>
                <feGaussianBlur stdDeviation="10.5" in="shadowOffsetOuter1" result="shadowBlurOuter1"></feGaussianBlur>
                <feColorMatrix values="0 0 0 0 0.721568627   0 0 0 0 0.141176471   0 0 0 0 0.596078431  0 0 0 0.19025896 0" type="matrix" in="shadowBlurOuter1"></feColorMatrix>
            </filter>
        </defs>
        <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <g id="verify-copy-2" transform="translate(4.000000, 8.000000)">
                <g id="Rectangle">
                    <use fill="black" fill-opacity="1" filter="url(#filter-3)" xlink:href="#path-2"></use>
                    <use fill="url(#linearGradient-1)" fill-rule="evenodd" xlink:href="#path-2"></use>
                </g>
                <g id="Group-14-Copy" transform="translate(99.000000, 15.400000)" fill="#FFFFFF" font-family="Montserrat-Bold, Montserrat" font-size="16" font-weight="bold" line-spacing="16" opacity="0.870000005">
                    <g id="Group-2-Copy-2" transform="translate(0.135120, 0.000000)">
                        <text id="Next">
                            <tspan x="0" y="15">NEXT</tspan>
                        </text>
                    </g>
                </g>
            </g>
        </g>
    </svg>`;
    return <SvgXml xml={xml} width="100%" />;
};