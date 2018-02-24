import { Component } from 'react';
import getWeb3 from './getWeb3'
import getContract from './getContract'
import retailersDefinition from '../contracts/Retailers.json'
import walletDefinition from '../contracts/TicketWallet.json'

export default class Web3Container extends Component {
  state = { web3: null, account: null, retailers: null, wallet: null }

  async getAccounts (web3) {
    return web3.eth.getAccounts()
  }

  async componentDidMount () {
    try {
      const web3 = await getWeb3()
      const accounts = await this.getAccounts(web3)
      const retailers = await getContract(web3, retailersDefinition)
      const wallet = await getContract(web3, walletDefinition)

      const account = accounts[0]
      
      this.setState({ web3, account, retailers, wallet })
    } catch (error) {
      alert(`Failed to load web3 or accounts. Check console for details.`)
      console.log(error)
    }
  }

  render () {
    const { web3, account, retailers, wallet } = this.state
    return web3 && account && retailers && wallet
      ? this.props.render({ web3, account, retailers, wallet })
      : this.props.renderLoading()
  }
}
