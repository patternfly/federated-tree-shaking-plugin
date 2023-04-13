"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Popper = exports.getOpacityTransition = void 0;
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
const ReactDOM = tslib_1.__importStar(require("react-dom"));
const usePopper_1 = require("./thirdparty/react-popper/usePopper");
const react_styles_1 = require("@patternfly/react-styles");
require("@patternfly/react-styles/css/components/Popper/Popper.css");
const hash = {
    left: 'right',
    right: 'left',
    bottom: 'top',
    top: 'bottom',
    'top-start': 'bottom-end',
    'top-end': 'bottom-start',
    'bottom-start': 'top-end',
    'bottom-end': 'top-start',
    'left-start': 'right-end',
    'left-end': 'right-start',
    'right-start': 'left-end',
    'right-end': 'left-start'
};
const getOppositePlacement = (placement) => placement.replace(/left|right|bottom|top|top-start|top-end|bottom-start|bottom-end|right-start|right-end|left-start|left-end/g, (matched) => hash[matched]);
const getOpacityTransition = (animationDuration) => `opacity ${animationDuration}ms cubic-bezier(.54, 1.5, .38, 1.11)`;
exports.getOpacityTransition = getOpacityTransition;
const Popper = ({ trigger, popper, direction = 'down', position = 'left', placement, width, minWidth = 'trigger', maxWidth, appendTo = 'inline', zIndex = 9999, isVisible = true, positionModifiers, distance = 0, onMouseEnter, onMouseLeave, onFocus, onBlur, onDocumentClick, onTriggerClick, onTriggerEnter, onPopperClick, onPopperMouseEnter, onPopperMouseLeave, onDocumentKeyDown, enableFlip = true, flipBehavior = 'flip', triggerRef, popperRef }) => {
    const [triggerElement, setTriggerElement] = React.useState(null);
    const [refElement, setRefElement] = React.useState(null);
    const [popperElement, setPopperElement] = React.useState(null);
    const [ready, setReady] = React.useState(false);
    const refOrTrigger = refElement || triggerElement;
    const onDocumentClickCallback = React.useCallback((event) => onDocumentClick(event, refOrTrigger, popperElement), [isVisible, triggerElement, refElement, popperElement, onDocumentClick]);
    React.useEffect(() => {
        setReady(true);
    }, []);
    React.useEffect(() => {
        if (triggerRef) {
            if (triggerRef.current) {
                setRefElement(triggerRef.current);
            }
            else if (typeof triggerRef === 'function') {
                setRefElement(triggerRef());
            }
        }
    }, [triggerRef]);
    React.useEffect(() => {
        // When the popperRef is defined or the popper visibility changes, ensure the popper element is up to date
        if (popperRef) {
            if (popperRef.current) {
                setPopperElement(popperRef.current);
            }
            else if (typeof popperRef === 'function') {
                setPopperElement(popperRef());
            }
        }
    }, [isVisible, popperRef]);
    const addEventListener = (listener, element, event, capture = false) => {
        if (listener && element) {
            element.addEventListener(event, listener, { capture });
        }
    };
    const removeEventListener = (listener, element, event, capture = false) => {
        if (listener && element) {
            element.removeEventListener(event, listener, { capture });
        }
    };
    React.useEffect(() => {
        addEventListener(onMouseEnter, refOrTrigger, 'mouseenter');
        addEventListener(onMouseLeave, refOrTrigger, 'mouseleave');
        addEventListener(onFocus, refOrTrigger, 'focus');
        addEventListener(onBlur, refOrTrigger, 'blur');
        addEventListener(onTriggerClick, refOrTrigger, 'click');
        addEventListener(onTriggerEnter, refOrTrigger, 'keydown');
        addEventListener(onPopperClick, popperElement, 'click');
        addEventListener(onPopperMouseEnter, popperElement, 'mouseenter');
        addEventListener(onPopperMouseLeave, popperElement, 'mouseleave');
        onDocumentClick && addEventListener(onDocumentClickCallback, document, 'click', true);
        addEventListener(onDocumentKeyDown, document, 'keydown', true);
        // Trigger a Popper update when content changes.
        const observer = new MutationObserver(() => {
            update && update();
        });
        popperElement && observer.observe(popperElement, { attributes: true, childList: true, subtree: true });
        return () => {
            removeEventListener(onMouseEnter, refOrTrigger, 'mouseenter');
            removeEventListener(onMouseLeave, refOrTrigger, 'mouseleave');
            removeEventListener(onFocus, refOrTrigger, 'focus');
            removeEventListener(onBlur, refOrTrigger, 'blur');
            removeEventListener(onTriggerClick, refOrTrigger, 'click');
            removeEventListener(onTriggerEnter, refOrTrigger, 'keydown');
            removeEventListener(onPopperClick, popperElement, 'click');
            removeEventListener(onPopperMouseEnter, popperElement, 'mouseenter');
            removeEventListener(onPopperMouseLeave, popperElement, 'mouseleave');
            onDocumentClick && removeEventListener(onDocumentClickCallback, document, 'click', true);
            removeEventListener(onDocumentKeyDown, document, 'keydown', true);
            observer.disconnect();
        };
    }, [
        triggerElement,
        popperElement,
        onMouseEnter,
        onMouseLeave,
        onFocus,
        onBlur,
        onTriggerClick,
        onTriggerEnter,
        onPopperClick,
        onPopperMouseEnter,
        onPopperMouseLeave,
        onDocumentClick,
        onDocumentKeyDown,
        refElement
    ]);
    const getPlacement = () => {
        if (placement) {
            return placement;
        }
        let convertedPlacement = direction === 'up' ? 'top' : 'bottom';
        if (position !== 'center') {
            convertedPlacement = `${convertedPlacement}-${position === 'right' ? 'end' : 'start'}`;
        }
        return convertedPlacement;
    };
    const getPlacementMemo = React.useMemo(getPlacement, [direction, position, placement]);
    const getOppositePlacementMemo = React.useMemo(() => getOppositePlacement(getPlacement()), [direction, position, placement]);
    const widthMods = React.useMemo(() => ({
        name: 'widthMods',
        enabled: width !== undefined || minWidth !== undefined || maxWidth !== undefined,
        phase: 'beforeWrite',
        requires: ['computeStyles'],
        fn: ({ state }) => {
            const triggerWidth = state.rects.reference.width;
            if (width) {
                state.styles.popper.width = width === 'trigger' ? `${triggerWidth}px` : width;
            }
            if (minWidth) {
                state.styles.popper.minWidth = minWidth === 'trigger' ? `${triggerWidth}px` : minWidth;
            }
            if (maxWidth) {
                state.styles.popper.maxWidth = maxWidth === 'trigger' ? `${triggerWidth}px` : maxWidth;
            }
        },
        effect: ({ state }) => {
            const triggerWidth = state.elements.reference.offsetWidth;
            if (width) {
                state.elements.popper.style.width = width === 'trigger' ? `${triggerWidth}px` : width;
            }
            if (minWidth) {
                state.elements.popper.style.minWidth = minWidth === 'trigger' ? `${triggerWidth}px` : minWidth;
            }
            if (maxWidth) {
                state.elements.popper.style.maxWidth = maxWidth === 'trigger' ? `${triggerWidth}px` : maxWidth;
            }
            return () => { };
        }
    }), [width, minWidth, maxWidth]);
    const { styles: popperStyles, attributes, update, forceUpdate } = (0, usePopper_1.usePopper)(refOrTrigger, popperElement, {
        placement: getPlacementMemo,
        modifiers: [
            {
                name: 'offset',
                options: {
                    offset: [0, distance]
                }
            },
            {
                name: 'preventOverflow',
                enabled: false
            },
            {
                // adds attribute [data-popper-reference-hidden] to the popper element which can be used to hide it using CSS
                name: 'hide',
                enabled: true
            },
            {
                name: 'flip',
                enabled: getPlacementMemo.startsWith('auto') || enableFlip,
                options: {
                    fallbackPlacements: flipBehavior === 'flip' ? [getOppositePlacementMemo] : flipBehavior
                }
            },
            widthMods
        ]
    });
    React.useEffect(() => {
        forceUpdate && forceUpdate();
    }, [popper]);
    // Returns the CSS modifier class in order to place the Popper's arrow properly
    // Depends on the position of the Popper relative to the reference element
    const modifierFromPopperPosition = () => {
        if (attributes && attributes.popper && attributes.popper['data-popper-placement']) {
            const popperPlacement = attributes.popper['data-popper-placement'];
            return positionModifiers[popperPlacement];
        }
        return positionModifiers.top;
    };
    const options = Object.assign({ className: (0, react_styles_1.css)(popper.props && popper.props.className, positionModifiers && modifierFromPopperPosition()), style: Object.assign(Object.assign(Object.assign({}, ((popper.props && popper.props.style) || {})), popperStyles.popper), { zIndex }) }, attributes.popper);
    const getMenuWithPopper = () => {
        const localPopper = React.cloneElement(popper, options);
        return popperRef ? (localPopper) : (React.createElement("div", { style: { display: 'contents' }, ref: (node) => setPopperElement(node === null || node === void 0 ? void 0 : node.firstElementChild) }, localPopper));
    };
    const getPopper = () => {
        if (appendTo === 'inline') {
            return getMenuWithPopper();
        }
        else {
            const target = typeof appendTo === 'function' ? appendTo() : appendTo;
            return ReactDOM.createPortal(getMenuWithPopper(), target);
        }
    };
    return (React.createElement(React.Fragment, null,
        !triggerRef && trigger && React.isValidElement(trigger) && (React.createElement("div", { style: { display: 'contents' }, ref: (node) => setTriggerElement(node === null || node === void 0 ? void 0 : node.firstElementChild) }, trigger)),
        triggerRef && trigger && React.isValidElement(trigger) && trigger,
        ready && isVisible && getPopper()));
};
exports.Popper = Popper;
exports.Popper.displayName = 'Popper';
//# sourceMappingURL=Popper.js.map