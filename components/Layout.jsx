import Header from './Header'

const layoutStyle = {
    margin: 20,
    padding: 20,
    border: '1px solid #DDD'
}

const Layout = (props) => (
    <div>
      <div style={layoutStyle}>
          <Header />
          {props.children}
      </div>

      <style jsx>{`
        h1, a {
          font-family: "Arial";
        }

        ul {
          padding: 0;
        }

        li {
          list-style: none;
          margin: 5px 0;
        }

        a {
          text-decoration: none;
          color: blue;
        }

        a:hover {
          opacity: 0.6;
        }
      `}</style>
    </div>
)

export default Layout