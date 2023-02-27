import { ZSizeFixed, ZSizeVaried } from '@zthun/fashion-designer';
import { useFashionTheme, useNavigate, ZButton, ZCard, ZFullScreen, ZGrid, ZParagraph } from '@zthun/fashion-venue';
import { getHttpCodeDescription, getHttpCodeName, ZHttpCodeClient } from '@zthun/webigail-http';
import React from 'react';
import { ZSadFace } from './sad-face';

export interface IZNotFound {
  home?: string;
}

export function ZNotFound(props: IZNotFound) {
  const { home = '/' } = props;
  const theme = useFashionTheme();
  const description = getHttpCodeDescription(ZHttpCodeClient.NotFound);
  const name = getHttpCodeName(ZHttpCodeClient.NotFound);
  const title = `${name} (${ZHttpCodeClient.NotFound})`;
  const navigate = useNavigate();
  const { error } = theme.design();

  return (
    <ZFullScreen>
      <ZGrid className='ZNotFound-root' justifyContent='center' alignContent='center' height={ZSizeVaried.Full}>
        <ZCard
          avatar={<ZSadFace />}
          heading={title}
          width={ZSizeFixed.Small}
          footer={
            <ZButton
              className='ZNotFound-back'
              name='return-home'
              label='Return home'
              width={ZSizeVaried.Full}
              fashion={error}
              onClick={() => navigate(home)}
            />
          }
        >
          <ZParagraph className='ZNotFound-description'>{description}</ZParagraph>
        </ZCard>
      </ZGrid>
    </ZFullScreen>
  );
}
