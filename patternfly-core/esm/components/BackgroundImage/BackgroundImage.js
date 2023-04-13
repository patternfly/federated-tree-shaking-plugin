import { __rest } from "tslib";
import * as React from 'react';
// Commented imports that no longer exist. This component will be updated with issue #8452 resolution
// import cssVar from '@patternfly/react-tokens/dist/esm/c_background_image_BackgroundImage';
// import cssVarName2x from '@patternfly/react-tokens/dist/esm/c_background_image_BackgroundImage_2x';
// import cssVarNameSm from '@patternfly/react-tokens/dist/esm/c_background_image_BackgroundImage_sm';
// import cssVarNameSm2x from '@patternfly/react-tokens/dist/esm/c_background_image_BackgroundImage_sm_2x';
// import cssVarNameLg from '@patternfly/react-tokens/dist/esm/c_background_image_BackgroundImage_lg';
// import cssVarNameFilter from '@patternfly/react-tokens/dist/esm/c_background_image_Filter';
import { css } from '@patternfly/react-styles';
import styles from '@patternfly/react-styles/css/components/BackgroundImage/background-image';
// let filterCounter = 0;
export const BackgroundImage = (_a) => {
    var { className } = _a, 
    // src,
    // filter = defaultFilter,
    props = __rest(_a, ["className"]);
    // const getUrlValue = (size: keyof BackgroundImageSrcMap) => {
    //   if (typeof src === 'string') {
    //     return `url(${src})`;
    //   } else if (typeof src === 'object') {
    //     return `url(${src[size]})`;
    //   }
    //   return '';
    // };
    // const filterNum = React.useMemo(() => filterCounter++, []);
    // const filterId = `patternfly-background-image-filter-overlay${filterNum}`;
    // const style = {
    //   [cssVar.name]: getUrlValue('xs'),
    //   [cssVarName2x.name]: getUrlValue('xs2x'),
    //   [cssVarNameSm.name]: getUrlValue('sm'),
    //   [cssVarNameSm2x.name]: getUrlValue('sm2x'),
    //   [cssVarNameLg.name]: getUrlValue('lg'),
    // [cssVarNameFilter.name]: `url(#${filterId})`
    // } as React.CSSProperties;
    return (
    // TODO: removed inline style add it  back with issue #8452 resolution. Also commented out the "React.cloneElement(filter, { id: filterId })} "
    React.createElement("div", Object.assign({ className: css(styles.backgroundImage, className) }, props),
        React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", className: "pf-c-background-image__filter", width: "0", height: "0" })));
};
BackgroundImage.displayName = 'BackgroundImage';
//# sourceMappingURL=BackgroundImage.js.map