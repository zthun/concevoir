import {
  ZBox,
  ZCard,
  ZH3,
  ZIconFontAwesome,
  ZNumberInput,
  ZPagination,
  ZParagraph,
  ZStack
} from '@zthun/fashion-react';
import { ZSizeFixed } from '@zthun/fashion-tailor';
import React, { useState } from 'react';
import { ZFashionRoutePagination } from '../../routes.mjs';
import { ZChoiceDropDownFashion } from '../common/choice-drop-down-fashion';
import { useFashionState } from '../common/use-fashion-state.mjs';

export function ZPaginationPage() {
  const [pages, setPages] = useState(1);
  const [page, setPage] = useState(1);
  const [, fashion, setFashion] = useFashionState();

  const _setPages = (val: number | null) => setPages(val || 1);

  return (
    <ZCard
      className='ZPaginationPage-root'
      heading={ZFashionRoutePagination.name}
      subHeading={ZFashionRoutePagination.description}
      avatar={<ZIconFontAwesome name={ZFashionRoutePagination.avatar} width={ZSizeFixed.Medium} />}
    >
      <ZBox margin={{ bottom: ZSizeFixed.Large }}>
        <ZH3>Description</ZH3>

        <ZParagraph>
          Users don't need to see 10,000 different items on the screen. That type of information is not useful, and will
          overwhelm a user. Most people who use Google will load the first page of results, and if they cannot find what
          they're looking for there, most will just update with a refined search.
        </ZParagraph>

        <ZParagraph>
          Pagination components allow you to give users the option to move between smaller chunks of content without
          overwhelming them with a large dataset.
        </ZParagraph>

        <ZPagination value={page} onValueChange={setPage} pages={pages} fashion={fashion} />

        <ZBox margin={{ top: ZSizeFixed.Small }}>
          <span>CurrentPage: </span>
          <span className='ZPaginationPage-current-page'>{page}</span>
        </ZBox>
      </ZBox>

      <ZH3>Options</ZH3>
      <ZStack gap={ZSizeFixed.Small}>
        <ZNumberInput value={pages} onValueChange={_setPages} min={1} label='Pages' name='pages' />
        <ZChoiceDropDownFashion value={fashion} onValueChange={setFashion} name='fashion' />
      </ZStack>
    </ZCard>
  );
}
