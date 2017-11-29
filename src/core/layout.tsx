import * as React from 'react';
import * as css from 'csstips'
import { style } from 'typestyle'

const defaultSpacing = 10;

export const FlexContainer = props =>
  <div className={style({ ...props.type })} style={props.style}>
    {props.children.map((child,i) => {
      const spacing = props.spacing || defaultSpacing
      const boxPadding = props.type == css.horizontal ? 
        css.padding(0, i == props.children.length -1 ? 0 : defaultSpacing, 0, 0) :
        css.padding(0, 0, i == props.children.length -1 ? 0 : defaultSpacing, 0);
      return <Flex key={i} style={{ ...boxPadding }}>{child}</Flex>
    })}
  </div>

export const Flex = props => {
  return <div key={props.key} style={{ ...props.style, ...css.flex }}>{props.children}</div>
}

export const Horizontal = props =>
  <FlexContainer {...props} type={css.horizontal} />

export const Vertical = props =>
  <FlexContainer {...props} type={css.vertical} />



export const MaxWidthIsland = props =>
  <div 
    className={style({
      flexBasis: 'auto',
      flexShrink: 0,
      margin: '0 auto',
      maxWidth: '960px',
      width: '100%',
    })} 
    style={props.style}
  >{props.children}</div>