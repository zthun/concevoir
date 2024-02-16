import {
  ZBooleanSwitch,
  ZBox,
  ZBubble,
  ZGrid,
  ZH4,
  ZIconFontAwesome,
  ZLineItem,
  ZList,
  ZListGroup,
  ZParagraph,
  ZStack,
  ZWizard,
  useFashionTheme,
  useNavigate
} from '@zthun/fashion-react';
import { ZSizeFixed } from '@zthun/fashion-tailor';
import { ZOrientation } from '@zthun/helpful-fn';
import React, { useState } from 'react';
import { ZFashionRouteBoutique, ZFashionRouteWizard } from '../../routes.mjs';

export function ZWizardPage() {
  const navigate = useNavigate();
  const [understood, setUnderstood] = useState(false);
  const { success, error, info } = useFashionTheme();

  const yes = (
    <ZBox padding={ZSizeFixed.ExtraSmall}>
      <ZIconFontAwesome name='circle-check' fashion={success} />
    </ZBox>
  );
  const no = (
    <ZBox padding={ZSizeFixed.ExtraSmall}>
      <ZIconFontAwesome name='circle-xmark' fashion={error} />
    </ZBox>
  );

  return (
    <ZWizard
      className='ZWizardPage-root'
      CardProps={{
        avatar: (
          <ZIconFontAwesome
            name={ZFashionRouteWizard.avatar}
            family={ZFashionRouteWizard.family}
            width={ZSizeFixed.Medium}
          />
        ),
        height: ZSizeFixed.ExtraLarge
      }}
      FinishButtonProps={{
        onClick: () => navigate(`/${ZFashionRouteBoutique.path}`)
      }}
    >
      <div data-name='Description' data-description='What is a wizard?'>
        <ZParagraph>
          A wizard is a great component that can take a user step by step through a complex process. Use a wizard when
          you have large set of actions that can be categorized and split into small steps.
        </ZParagraph>

        <ZParagraph>
          Wizards are made up of pages, so you can think of them as if they were chapters in a book. To see the next set
          of content, one must turn to the next page. These chapters go in both directions so the user can freely move
          between the next page and the previous page.
        </ZParagraph>

        <ZParagraph>The last page of a wizard should allow the user to complete it.</ZParagraph>

        <ZGrid columns='auto auto auto auto auto' alignItems='center' justifyContent='center' gap={ZSizeFixed.Medium}>
          <ZBubble width={ZSizeFixed.Large} fashion={info}>
            <ZH4 compact>First</ZH4>
          </ZBubble>
          <ZIconFontAwesome name='arrows-left-right'></ZIconFontAwesome>
          <ZBubble width={ZSizeFixed.Large} fashion={info}>
            <ZH4 compact>Page 2</ZH4>
          </ZBubble>
          <ZIconFontAwesome name='arrows-left-right'></ZIconFontAwesome>
          <ZBubble width={ZSizeFixed.Large} fashion={info}>
            <ZH4 compact>Last</ZH4>
          </ZBubble>
        </ZGrid>
      </div>
      <div data-name='Good Wizard Practices' data-description='Some general guidelines'>
        <ZList>
          <ZListGroup heading='Do' />
          <ZLineItem
            prefix={yes}
            body={<ZParagraph compact>Split up large forms of user input into small categorized chunks.</ZParagraph>}
          />
          <ZLineItem
            prefix={yes}
            body={<ZParagraph compact>Use images and videos that make the content easier to understand</ZParagraph>}
          />
          <ZLineItem
            prefix={yes}
            body={
              <ZParagraph compact>
                Have an intro and review page which helps describe what the user is going to do and what the user has
                done respectively.
              </ZParagraph>
            }
          />
          <ZListGroup heading="Don't" />
          <ZLineItem
            prefix={no}
            body={
              <ZParagraph compact>
                Have a single page wizard. That&apos;s not a wizard. That&apos;s just a page or card of content.
              </ZParagraph>
            }
          />
          <ZLineItem
            prefix={no}
            body={
              <ZParagraph compact>
                Avoid graph or mystery meat wizards. Disable things that are not relevant to the current selections
              </ZParagraph>
            }
          />
          <ZLineItem
            prefix={no}
            body={
              <ZParagraph compact>
                Prevent the user from moving backwards to correct mistakes or review previous selections.
              </ZParagraph>
            }
          />
        </ZList>
      </div>
      <div
        data-name='Confirmation'
        data-description='Do you understand what makes a good wizard?'
        data-next-disabled={!understood}
      >
        <ZStack orientation={ZOrientation.Vertical} justifyContent='center' alignItems='center'>
          <ZBooleanSwitch
            label="The do's and don'ts of wizards make sense."
            value={understood}
            onValueChange={setUnderstood}
            name='understand'
          />
        </ZStack>
      </div>
    </ZWizard>
  );
}
