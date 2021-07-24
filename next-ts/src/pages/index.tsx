import React from "react";
import { Layout, List, Typography } from "antd";
import { PlaceHolderApi } from "services/PlaceHolder";
import {
  GetServerSideProps,
  GetStaticProps,
  InferGetStaticPropsType,
} from "next";
import { Ipost } from "models/Post";
import Link from "next/link";
import { Row, Card, Col } from "antd";
const { Header, Content, Footer } = Layout;

function Index() {
  return <div>Formik</div>;
}

export default Index;
