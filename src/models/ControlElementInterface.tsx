export type condition = (props: any) => boolean;

export interface ControlElement {
  component: React.FunctionComponent | React.ComponentClass;
  name: string;
  className?: string | string[];
  options?: any[];
  label?: string;
  position?: number;
  condition?: condition;
  defaultValue?: string;
}

export default ControlElement;
