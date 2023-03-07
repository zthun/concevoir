import { ZSizeFixed, ZSizeVaried } from '@zthun/fashion-tailor';
import {
  makeStyles,
  useFashionTheme,
  useNavigate,
  ZButton,
  ZCard,
  ZImageSource,
  ZParagraph
} from '@zthun/fashion-venue';
import React from 'react';
import { ZFashionRouteHome, ZFashionRouteVenue } from '../routes';

const useHomePageStyles = makeStyles()((theme) => ({
  section: {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: theme.gap()
  },
  avatar: {
    padding: theme.gap(),
    marginTop: theme.gap(),
    marginBottom: theme.gap(),
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
  const theme = useFashionTheme();
  const { primary } = theme.design();

  return (
    <div className='ZHomePage-root'>
      <ZCard
        className={classes.section}
        width={ZSizeFixed.Large}
        heading={ZFashionRouteHome.name}
        subHeading={ZFashionRouteHome.description}
      >
        <ZImageSource
          className={classes.avatar}
          src={ZFashionRouteHome.avatar}
          height={ZSizeFixed.ExtraLarge}
          width={ZSizeVaried.Full}
        />

        <ZParagraph>
          Zthunworks fashion system is a set of helper libraries that make it easier to quickly build a small web
          application. Small web applications are easier to maintain and having a lot of small web applications that all
          look and feel similar creates a better user experience. One of the best examples of taking a Monolith
          application and converting it down to smaller pieces was iTunes by Apple. While iTunes was excellent for
          playing and managing music, the features to manage movies and photos was out of place and caused iTunes to
          become very bloated with features. Apple eventually split the Monolith into Music, Photos, Podcasts, Books and
          TV.
        </ZParagraph>

        <ZParagraph>
          Fashion is built around this philosophy; users are most productive when they are focused on a single task at a
          time. The Fashion system is split into three layers, the <strong>designer</strong>, the <strong>venue</strong>
          , and the <strong>runway</strong>.
        </ZParagraph>
      </ZCard>

      <ZCard
        className={classes.section}
        width={ZSizeFixed.Large}
        heading={ZFashionRouteVenue.name}
        subHeading={ZFashionRouteVenue.description}
        footer={
          <ZButton
            label='Get Started'
            onClick={() => navigate('venue')}
            fashion={primary}
            name='venue-get-started'
            outline
            width={ZSizeVaried.Full}
          />
        }
      >
        <ZImageSource
          className={classes.avatar}
          src={ZFashionRouteVenue.avatar}
          height={ZSizeFixed.ExtraLarge}
          width={ZSizeVaried.Full}
        />

        <ZParagraph>
          You need materials, tools, and designs to put on a show. This is where the fashion venue comes into play. The
          fashion venue contains react components needed to build a web page. The primary focus of the venue is to help
          form a common look and feel across several single page applications.
        </ZParagraph>
      </ZCard>
    </div>
  );
}
