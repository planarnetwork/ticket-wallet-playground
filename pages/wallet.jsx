import { Component } from 'react'
import Link from 'next/link'
import Web3Container from '../lib/Web3Container'
import Layout from '../components/Layout.jsx'

class Tickets extends Component {
  state = {}

  render () {
    return (
      <Layout>
        <h1>Tickets</h1>
      </Layout>
    )
  }
}

export default () => (
  <Web3Container
    renderLoading={() => <div>Loading Tickets...</div>}
    render={({ account, contract }) => (
      <Tickets account={account} contract={contract} />
    )}
  />
)
