import { __rest } from "tslib";
import * as React from 'react';
import styles from '@patternfly/react-styles/css/components/Toolbar/toolbar';
import { css } from '@patternfly/react-styles';
import { ToolbarContentContext, ToolbarContext } from './ToolbarUtils';
import { formatBreakpointMods } from '../../helpers/util';
import { ToolbarExpandableContent } from './ToolbarExpandableContent';
import { PageContext } from '../Page/PageContext';
export class ToolbarContent extends React.Component {
    constructor() {
        super(...arguments);
        this.expandableContentRef = React.createRef();
        this.chipContainerRef = React.createRef();
    }
    render() {
        const _a = this.props, { className, children, isExpanded, toolbarId, visibility, alignItems, clearAllFilters, showClearFiltersButton, clearFiltersButtonText } = _a, props = __rest(_a, ["className", "children", "isExpanded", "toolbarId", "visibility", "alignItems", "clearAllFilters", "showClearFiltersButton", "clearFiltersButtonText"]);
        return (React.createElement(PageContext.Consumer, null, ({ width, getBreakpoint }) => (React.createElement("div", Object.assign({ className: css(styles.toolbarContent, formatBreakpointMods(visibility, styles, '', getBreakpoint(width)), className) }, props),
            React.createElement(ToolbarContext.Consumer, null, ({ clearAllFilters: clearAllFiltersContext, clearFiltersButtonText: clearFiltersButtonContext, showClearFiltersButton: showClearFiltersButtonContext, toolbarId: toolbarIdContext }) => {
                const expandableContentId = `${toolbarId ||
                    toolbarIdContext}-expandable-content-${ToolbarContent.currentId++}`;
                return (React.createElement(ToolbarContentContext.Provider, { value: {
                        expandableContentRef: this.expandableContentRef,
                        expandableContentId,
                        chipContainerRef: this.chipContainerRef
                    } },
                    React.createElement("div", { className: css(styles.toolbarContentSection, alignItems === 'center' && styles.modifiers.alignItemsCenter) }, children),
                    React.createElement(ToolbarExpandableContent, { id: expandableContentId, isExpanded: isExpanded, expandableContentRef: this.expandableContentRef, chipContainerRef: this.chipContainerRef, clearAllFilters: clearAllFilters || clearAllFiltersContext, showClearFiltersButton: showClearFiltersButton || showClearFiltersButtonContext, clearFiltersButtonText: clearFiltersButtonText || clearFiltersButtonContext })));
            })))));
    }
}
ToolbarContent.displayName = 'ToolbarContent';
ToolbarContent.currentId = 0;
ToolbarContent.defaultProps = {
    isExpanded: false,
    showClearFiltersButton: false
};
//# sourceMappingURL=ToolbarContent.js.map