import Link from 'next/link';

const Nav = () => (
  <header style={{ backgroundColor: 'lightcoral' }}>
    <strong style={{ marginRight: '2rem' }}>Contentful Next.js Blog</strong>

    <Link href='/'>
      <button type='button'>Go Back Home</button>
    </Link>
  </header>
);

export default Nav;
