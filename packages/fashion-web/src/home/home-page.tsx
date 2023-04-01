import {
  createStyleHook,
  useFashionTheme,
  useNavigate,
  ZButton,
  ZCard,
  ZImageSource,
  ZParagraph
} from '@zthun/fashion-boutique';
import { ZSizeFixed, ZSizeVaried } from '@zthun/fashion-tailor';
import React from 'react';
import { ZFashionRouteBoutique, ZFashionRouteTheme } from '../routes';

const useHomePageStyles = createStyleHook(({ tailor }) => ({
  section: {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: tailor.gap()
  },
  avatar: {
    padding: tailor.gap(),
    marginTop: tailor.gap(),
    marginBottom: tailor.gap(),
    textAlign: 'center'
  }
}));

/**
 * Renders the home page.
 *
 * @returns The jsx that renders the home page.
 */
export function ZHomePage() {
  const { classes } = useHomePageStyles();
  const navigate = useNavigate();
  const { primary } = useFashionTheme();

  const renderGetStarted = (where: string) => (
    <ZButton
      label='Get Started'
      onClick={() => navigate(where)}
      fashion={primary}
      name={`${name}-get-started`}
      outline
      width={ZSizeVaried.Full}
    />
  );

  return (
    <div className='ZHomePage-root'>
      <ZCard
        className={classes.section}
        width={ZSizeFixed.Large}
        heading={ZFashionRouteTheme.name}
        subHeading={ZFashionRouteTheme.description}
        footer={renderGetStarted('theme')}
      >
        <ZImageSource
          className={classes.avatar}
          src={ZFashionRouteTheme.avatar}
          height={ZSizeFixed.ExtraLarge}
          width={ZSizeVaried.Full}
        />

        <ZParagraph>
          The Zthunworks fashion system is a set of helper libraries that make it easier to quickly build a small web
          application. Small web applications are easier to maintain and having a lot of small web applications that all
          look and feel similar creates a better user experience. One of the best examples of taking a Monolith
          application and converting it down to smaller pieces was iTunes by Apple. While iTunes was excellent for
          playing and managing music, the features to manage movies and photos was out of place and caused iTunes to
          become very bloated with features. Apple eventually split the Monolith into Music, Photos, Podcasts, Books and
          TV.
        </ZParagraph>

        <ZParagraph>
          Fashion is built around this philosophy; users are most productive when they are focused on a single task at a
          time.
        </ZParagraph>

        <ZParagraph>
          At the root of the entire system is the theme. The theme describes the color scheme of your page and
          simplifies the way you handle the visual aspect of your site.
        </ZParagraph>
      </ZCard>

      <ZCard
        className={classes.section}
        width={ZSizeFixed.Large}
        heading={ZFashionRouteBoutique.name}
        subHeading={ZFashionRouteBoutique.description}
        footer={renderGetStarted('boutique')}
      >
        <ZImageSource
          className={classes.avatar}
          src={ZFashionRouteBoutique.avatar}
          height={ZSizeFixed.ExtraLarge}
          width={ZSizeVaried.Full}
        />

        <ZParagraph>
          You need materials, tools, and designs to put on a show. The fashion boutique contains react components needed
          to build a web page. The primary focus of the boutique is to help form a common look and feel across several
          single page applications, given a single theme.
        </ZParagraph>
      </ZCard>
    </div>
  );
}
