export type condition = (props: any) => boolean;

export interface ControlElement {
  component: React.ReactNode;
  name: string;
  className?: string | string[];
  options?: any[];
  label?: string;
  position?: number;
  condition?: condition;
  defaultValue?: string;
}

export default ControlElement;
