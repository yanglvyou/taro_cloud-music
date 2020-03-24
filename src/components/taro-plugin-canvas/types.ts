
// export interface IConfig {
//   width: number;
//   height: number;
//   backgroundColor?: string;
//   debug?: boolean;
//   pixelRatio?: number;
//   preload?: boolean;
//   'hide-loading'?: boolean;
//   blocks?: IBlock[];
//   texts?: IText[];
//   images?: IIMage[];
//   lines?: ILine[];
// }

export const IConfig={
  width:0,
  heght:0,
  backgroundColor:"",
  debug: false,
  pixelRatio:1,
  preload: false,
  'hide-loading': false,
  blocks: [],
  texts: [],
  images: [],
  lines: [],
}


// export interface IBlock {
//   x: number;
//   y: number;
//   width?: number;
//   height: number;
//   paddingLeft?: number;
//   paddingRight?: number;
//   borderWidth?: number;
//   borderColor?: string;
//   backgroundColor?: string;
//   borderRadius?: number;
//   text?: IText;
//   opacity?: number;
//   zIndex?: number;
// }

export const IBlock={
  x:0,
  y:0,
  width:0,
  heght:0,
  paddingLeft: 0,
  paddingRight: 0,
  borderWidth: 0,
  borderColor:"",
  backgroundColor:"",
  borderRadius:"",
  text:{},
  opacity:"",
  zIndex:0,
}

// export interface IText {
//   x: number;
//   y: number;
//   text: string | {
//     text: string;
//     marginLeft: number;
//     marginRight: number;
//   };
//   fontSize: number;
//   color?: string;
//   opacity?: 1 | 0;
//   lineHeight?: number;
//   lineNum?: number;
//   width?: number;
//   marginLeft?: number;
//   marginRight?: number;
//   textDecoration?: 'line-through' | 'none';
//   baseLine?: 'top' | 'middle' | 'bottom';
//   textAlign?: 'left' | 'center' | 'right';
//   fontFamily?: string;
//   fontWeight?: string;
//   fontStyle?: string;
//   zIndex?: number;
// }



export interface IIMage {
  x: number;
  y: number;
  url: string;
  width: number;
  height: number;
  borderRadius?: number;
  borderWidth?: number;
  borderColor?: string;
  zIndex?: number;
}

export interface ILine {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  width: number;
  color?: string;
  zIndex?: number;
}

export type IDrawType = 'text' | 'image' | 'block' | 'line';

export type IDrawArrayItem = {
  type?: IDrawType;
} & (ILine | IIMage | IBlock | IText);
