import Link from 'next/link';

const Nav = () => (
  <header style={{ backgroundColor: 'lightcoral' }}>
    <strong style={{ marginRight: '2rem' }}>Next.js Contentful Blog</strong>

    <Link href='/'>
      <button type='button'>Go Back Home</button>
    </Link>
  </header>
);

export default Nav;
