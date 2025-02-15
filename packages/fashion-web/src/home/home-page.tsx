import {
  useFashionTheme,
  useNavigate,
  ZBox,
  ZButton,
  ZCard,
  ZIconFontAwesome,
  ZParagraph,
  ZStack,
} from "@zthun/fashion-boutique";
import { ZSizeFixed, ZSizeVaried } from "@zthun/fashion-tailor";
import { ZHorizontalAnchor } from "@zthun/helpful-fn";
import { ZFashionRouteBoutique, ZFashionRouteTheme } from "../routes.mjs";

export function ZHomePage() {
  const navigate = useNavigate();
  const { primary, secondary } = useFashionTheme();

  const renderGetStarted = (where: string) => (
    <ZButton
      label="Get Started"
      onClick={() => navigate(where)}
      fashion={secondary}
      name={`${where}-get-started`}
      width={ZSizeVaried.Full}
    />
  );

  return (
    <ZStack
      className="ZHomePage-root"
      align={{ items: "center" }}
      gap={ZSizeFixed.Medium}
    >
      <ZCard
        width={ZSizeFixed.ExtraLarge}
        TitleProps={{
          heading: ZFashionRouteTheme.name,
          subHeading: ZFashionRouteTheme.description,
        }}
        footer={renderGetStarted("theme")}
      >
        <ZBox
          justification={ZHorizontalAnchor.Center}
          margin={{ bottom: ZSizeFixed.Medium }}
        >
          <ZIconFontAwesome
            name={ZFashionRouteTheme.avatar}
            width={{ xl: ZSizeFixed.ExtraLarge, xs: ZSizeFixed.Large }}
            fashion={primary}
          />
        </ZBox>

        <ZParagraph>
          The Zthunworks fashion system is a set of helper libraries that make
          it easier to quickly build a small web application. Small web
          applications are easier to maintain and having a lot of small web
          applications that all look and feel similar creates a better user
          experience. One of the best examples of taking a Monolith application
          and converting it down to smaller pieces was iTunes by Apple. While
          iTunes was excellent for playing and managing music, the features to
          manage movies and photos was out of place and caused iTunes to become
          very bloated with features. Apple eventually split the Monolith into
          Music, Photos, Podcasts, Books and TV.
        </ZParagraph>

        <ZParagraph>
          Fashion is built around this philosophy; users are most productive
          when they are focused on a single task at a time.
        </ZParagraph>

        <ZParagraph>
          At the root of the entire system is the theme. The theme describes the
          color scheme of your page and simplifies the way you handle the visual
          aspect of your site.
        </ZParagraph>
      </ZCard>

      <ZCard
        width={ZSizeFixed.ExtraLarge}
        TitleProps={{
          heading: ZFashionRouteBoutique.name,
          subHeading: ZFashionRouteBoutique.description,
        }}
        footer={renderGetStarted("boutique")}
      >
        <ZBox
          justification={ZHorizontalAnchor.Center}
          margin={{ bottom: ZSizeFixed.Medium }}
        >
          <ZIconFontAwesome
            name={ZFashionRouteBoutique.avatar}
            width={{ xl: ZSizeFixed.ExtraLarge, xs: ZSizeFixed.Large }}
            fashion={primary}
          />
        </ZBox>

        <ZParagraph>
          You need materials, tools, and designs to put on a show. The fashion
          boutique contains react components needed to build a web page. The
          primary focus of the boutique is to help form a common look and feel
          across several single page applications, given a single theme.
        </ZParagraph>
      </ZCard>
    </ZStack>
  );
}
