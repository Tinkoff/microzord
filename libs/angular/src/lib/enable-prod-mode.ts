import {enableProdMode as angularEnableProdMode} from '@angular/core';

/**
 * Disable Angular's development mode safely
 */
export function enableProdMode() {
  try {
    angularEnableProdMode();
  } catch (e) {}
}
