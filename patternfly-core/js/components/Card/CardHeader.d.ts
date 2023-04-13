import * as React from 'react';
export interface CardHeaderActionsObject {
    /** Actions of the card header */
    actions: React.ReactNode;
    /** Flag indicating that the actions have no offset */
    hasNoOffset?: boolean;
    /** Additional classes added to the actions wrapper */
    className?: string;
}
export interface CardHeaderProps extends React.HTMLProps<HTMLDivElement> {
    /** Content rendered inside the card header */
    children?: React.ReactNode;
    /** Additional classes added to the card header */
    className?: string;
    /** Actions of the card header */
    actions?: CardHeaderActionsObject;
    /** ID of the card header. */
    id?: string;
    /** Callback expandable card */
    onExpand?: (event: React.MouseEvent, id: string) => void;
    /** Additional props for expandable toggle button */
    toggleButtonProps?: any;
    /** Whether to right-align expandable toggle button */
    isToggleRightAligned?: boolean;
}
export declare const CardHeader: React.FunctionComponent<CardHeaderProps>;
//# sourceMappingURL=CardHeader.d.ts.map