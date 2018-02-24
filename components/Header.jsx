import Link from 'next/link'

const linkStyle = {
    marginRight: 15
}

const Header = () => (
    <div>
      <Link href="/">
        <a style={linkStyle}>Home</a>
      </Link>
      <Link href="/wallet">
        <a style={linkStyle}>Wallet</a>
      </Link>
      <Link href="/retailers">
        <a style={linkStyle}>Retailers</a>
      </Link>
    </div>
)

export default Header