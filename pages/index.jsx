import { Component } from 'react'
import Link from 'next/link'
import Web3Container from '../libs/Web3Container'
import Layout from '../components/Layout.jsx'

class Index extends Component {
  render() {
    return (
      <Layout>
        <h1>Ticket Wallet Playground</h1>
        <p>Welcome {this.props.account}</p>
      </Layout>
    )
  }
}

export default () => (
  <Web3Container
    renderLoading={() => <div>Loading...</div>}
    render={({ account }) => (
      <Index account={account} />
    )}
  />
)