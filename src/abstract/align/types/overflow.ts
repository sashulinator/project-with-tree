/**
 * Configuration options for handling positioning when the content overflows the container.
 */
export interface Overflow {
  /**
   * Flag to shift the child element into the viewport until it is entirely visible; defaults to false.
   */
  alwaysByViewport?: boolean

  /**
   * Flag to reposition the child element along the x axis to ensure it is visible; defaults to false.
   */
  adjustX?: boolean

  /**
   * Flag to reposition the child element along the y axis to ensure it is visible; defaults to false.
   */
  adjustY?: boolean
}
