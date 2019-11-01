import { ControlElement } from '../models';

export const MAX_POSITION = 99;

export const sortElements = (elements: ControlElement[]): void => {
  elements.sort(
    (a: ControlElement, b: ControlElement) =>
      (a.position || MAX_POSITION) - (b.position || MAX_POSITION),
  );
};

export default sortElements;
