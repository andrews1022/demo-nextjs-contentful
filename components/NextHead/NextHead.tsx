import Head from 'next/head';

type NextHeadProps = {
  description: string;
  title?: string;
};

const NextHead = ({ description, title }: NextHeadProps) => (
  <Head>
    <title>{title ? `${title} | ` : null} Next.js Contentful Blog</title>
    <meta name='description' content={description} />
    <link rel='icon' href='/favicon.ico' />
  </Head>
);

export default NextHead;
