import React, { FunctionComponent } from "react";
import Head from "next/head";
type LayoutProp = {
  title?: string;
};
const Layout: FunctionComponent<LayoutProp> = ({ children, title }) => {
  return (
    <div>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{title}</title>
      </Head>
      {children}
    </div>
  );
};

export default Layout;
