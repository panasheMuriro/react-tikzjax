// src/global.d.ts
declare module 'react-tikzjax' {
  import { FC } from 'react';
  import { TikzJaxProps } from 'react-tikzjax/dist/index.d';
  const TikzJax: FC<TikzJaxProps>;
  export default TikzJax;
}
