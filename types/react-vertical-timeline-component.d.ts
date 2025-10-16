declare module 'react-vertical-timeline-component' {
  import { ReactNode } from 'react';
  
  export interface VerticalTimelineProps {
    layout?: string;
    className?: string;
    lineColor?: string;
    children?: ReactNode;
  }
  
  export interface VerticalTimelineElementProps {
    className?: string;
    id?: string;
    date?: ReactNode;
    dateClassName?: string;
    icon?: ReactNode;
    iconClassName?: string;
    iconStyle?: React.CSSProperties;
    contentStyle?: React.CSSProperties;
    contentArrowStyle?: React.CSSProperties;
    children?: ReactNode;
    position?: string;
    textClassName?: string;
  }
  
  export const VerticalTimeline: React.FC<VerticalTimelineProps>;
  export const VerticalTimelineElement: React.FC<VerticalTimelineElementProps>;
}