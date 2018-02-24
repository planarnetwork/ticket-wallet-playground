import { Component } from 'react'
import Link from 'next/link'
import Web3Container from '../libs/Web3Container'
import Layout from '../components/Layout.jsx'

class Retailers extends Component {

  state = { 
    retailers: [],
    newAddress: null,
    newName: null,
    newTxFeeAmount: null,
    newPubKey: null
  }

  getRetailerById = async (retId) => {
    const { contract } = this.props

    return await Promise.all([
      contract.nameById(retId),
      contract.txFeeAmountById(retId),
      contract.pubKeyById(retId)
    ])
  }

  getRetailers = async () => {
    const { web3, account, contract } = this.props
    const contractsOf = await contract.tokensOf(account)

    const retailers = await Promise.all(
      contractsOf
        .map(v => v.toNumber())
        .map(retId => this.getRetailerById(retId))
    )
    
    this.setState({
      retailers: retailers.map((ret) => {
        return {
          address: account,
          name: web3.utils.toUtf8(ret[0]),
          txFeeAmount: ret[1].toString(10),
          pubKey: web3.utils.toUtf8(ret[2])
        }
      })
    })
  }

  addRetailer = async () => {
    const { account, contract } = this.props

    // const receipt = await contract.addRetailer(
    //   account,
    //   this.state.newName,
    //   this.state.newTxFeeAmount,
    //   this.state.newPubKey,
    //   { from: account }
    // )

    // TEMP
    const receipt = await contract.addRetailer(
      account,
      "Retailer Name",
      10,
      "abc",
      { from: account }
    )

    console.log(receipt)

    // this.setState({
    //   newName: null,
    //   newAddress: null,
    //   newTxFeeAmount: null,
    //   newPubKey: null
    // })

    await this.getRetailers()
  }

  updateRetailer = async () => {

  }

  handleInputChange = (event) => {
    const target = event.target

    this.setState({
      [target.name]: target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()

    // TODO: validation
    this.addRetailer()
  }

  componentDidMount = async () => {
    this.getRetailers()
  }

  render() {
    return (
      <Layout>
        <h1>Retailers</h1>
        <ul>
          {this.state.retailers.map(ret =>
            <li>
              Name: {ret.name}<br />
              Address: {ret.address}<br />
              Fee: {ret.txFeeAmount}<br />
              Pub Key: {ret.pubKey}
            </li>
          )}
        </ul>

        <button onClick={this.addRetailer}>Create random retailer</button>

        {/*
        <br />
        <form onSubmit={this.handleSubmit}>
          <label>
            Name:
            <input 
              type="text" 
              name="newName" 
              value={this.state.newName} 
              onChange={this.handleInputChange} />
          </label>
          <br />
          <label>
            Address:
            <input 
              type="text" 
              name="newAddress" 
              value={this.state.newAddress} 
              onChange={this.handleInputChange} />
          </label>
          <br />
          <label>
            Tx Fee:
            <input 
              type="number" 
              name="newTxFeeAmount" 
              value={this.state.newTxFeeAmount} 
              onChange={this.handleInputChange} />
          </label>
          <br />
          <label>
            Public Key:
            <input 
              type="text" 
              name="newPubKey" 
              value={this.state.newPubKey} 
              onChange={this.handleInputChange} />
          </label>
          <br />
          <input type="submit" value="Add" />
        </form>
      */}
      </Layout>
    )
  }
}

export default () => (
  <Web3Container
    renderLoading={() => <div>Loading Retailers...</div>}
    render={({ web3, account, retailers }) => (
      <Retailers web3={web3} account={account} contract={retailers} />
    )}
  />
)
