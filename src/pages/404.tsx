import { NextPage } from "next";
import { Result, Button } from "antd";
import NextLink from "next/link";

const custom404: NextPage = () => {
  return (
    <Result
      status={404}
      title="404"
      subTitle="Sorry this blog not exist"
      extra={
        <>
          <Button type="primary">
            <NextLink href="/" passHref>
              <a style={{ color: "white" }}>Inicio</a>
            </NextLink>
          </Button>
        </>
      }
    />
  );
};

export default custom404;
