import {
  useNavigate,
  ZBox,
  ZButton,
  ZCard,
  ZGrid,
  ZIconFontAwesome,
  ZIconMaterial,
  ZParagraph,
  ZStack
} from '@zthun/fashion-react';
import { ZGapSize, ZSizeFixed, ZSizeVaried, ZSizeVoid } from '@zthun/fashion-tailor';
import { ZFashionPriority } from '@zthun/fashion-theme';
import { ZOrientation, ZQuadrilateralBuilder } from '@zthun/helpful-fn';
import React from 'react';
import { ZFashionRouteBoutique, ZFashionRouteTheme } from '../routes.mjs';

/**
 * Renders the home page.
 *
 * @returns The jsx that renders the home page.
 */
export function ZHomePage() {
  const navigate = useNavigate();

  const renderGetStarted = (where: string) => (
    <ZButton
      label='Get Started'
      onClick={() => navigate(where)}
      fashion={ZFashionPriority.Secondary}
      name={`${where}-get-started`}
      width={ZSizeVaried.Full}
    />
  );

  return (
    <ZGrid className='ZHomePage-root' justify={{ content: 'center' }}>
      <ZBox margin={new ZQuadrilateralBuilder<ZGapSize>(ZSizeVoid.None).bottom(ZSizeFixed.Medium).build()}>
        <ZCard
          width={ZSizeFixed.ExtraLarge}
          heading={ZFashionRouteTheme.name}
          subHeading={ZFashionRouteTheme.description}
          footer={renderGetStarted('theme')}
        >
          <ZBox margin={{ bottom: ZSizeFixed.Medium }}>
            <ZStack orientation={ZOrientation.Horizontal} justifyContent='center'>
              <ZIconMaterial
                name={ZFashionRouteTheme.avatar}
                width={{ xl: ZSizeFixed.ExtraLarge, xs: ZSizeFixed.Large }}
                fashion={ZFashionPriority.Primary}
              />
            </ZStack>
          </ZBox>

          <ZParagraph>
            The Zthunworks fashion system is a set of helper libraries that make it easier to quickly build a small web
            application. Small web applications are easier to maintain and having a lot of small web applications that
            all look and feel similar creates a better user experience. One of the best examples of taking a Monolith
            application and converting it down to smaller pieces was iTunes by Apple. While iTunes was excellent for
            playing and managing music, the features to manage movies and photos was out of place and caused iTunes to
            become very bloated with features. Apple eventually split the Monolith into Music, Photos, Podcasts, Books
            and TV.
          </ZParagraph>

          <ZParagraph>
            Fashion is built around this philosophy; users are most productive when they are focused on a single task at
            a time.
          </ZParagraph>

          <ZParagraph>
            At the root of the entire system is the theme. The theme describes the color scheme of your page and
            simplifies the way you handle the visual aspect of your site.
          </ZParagraph>
        </ZCard>
      </ZBox>

      <ZBox margin={new ZQuadrilateralBuilder<ZGapSize>(ZSizeVoid.None).bottom(ZSizeFixed.Medium).build()}>
        <ZCard
          width={ZSizeFixed.ExtraLarge}
          heading={ZFashionRouteBoutique.name}
          subHeading={ZFashionRouteBoutique.description}
          footer={renderGetStarted('boutique')}
        >
          <ZBox margin={{ bottom: ZSizeFixed.Medium }}>
            <ZStack orientation={ZOrientation.Horizontal} justifyContent='center'>
              <ZIconFontAwesome
                name={ZFashionRouteBoutique.avatar}
                width={{ xl: ZSizeFixed.ExtraLarge, xs: ZSizeFixed.Large }}
                fashion={ZFashionPriority.Primary}
              />
            </ZStack>
          </ZBox>

          <ZParagraph>
            You need materials, tools, and designs to put on a show. The fashion boutique contains react components
            needed to build a web page. The primary focus of the boutique is to help form a common look and feel across
            several single page applications, given a single theme.
          </ZParagraph>
        </ZCard>
      </ZBox>
    </ZGrid>
  );
}
