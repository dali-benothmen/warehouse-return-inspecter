export enum ItemStatus {
    PENDING = 'pending',
    INSPECTED = 'inspected',
    ARRIVED = 'arrived',
}

export const UI_CONSTANTS = {
    MIN_TOUCH_TARGET: 44, // pixels
    BUTTON_HEIGHT: 48, // pixels
    TOAST_DURATION: 3000, // milliseconds
    VIBRATION_DURATION: 200, // milliseconds
} as const;

export const MESSAGES = {
    NO_RETURN_FOUND: 'No return found for this order number',
    UPDATE_FAILED: 'Failed to update item. Please try again.',
    ALL_ITEMS_INSPECTED: 'All items have been inspected!',
    READY_FOR_NEXT_SCAN: 'Ready for next scan',
    LOADING: 'Loading...',
    SEARCHING: 'Searching...',
    CONFIRMING: 'Confirming...',
} as const;
