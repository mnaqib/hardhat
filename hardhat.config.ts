import { HardhatUserConfig } from 'hardhat/config'
import '@nomicfoundation/hardhat-toolbox'
import '@nomiclabs/hardhat-etherscan'
import 'dotenv/config'
import './tasks/blockNumber'

const GOERLI_RPC_URL = process.env.GOERLI_RPC_URL as string
const PRIVATE_KEY = process.env.PRIVATE_KEY as string
const API_KEY = process.env.API_KEY as string

const config: HardhatUserConfig = {
    solidity: '0.8.17',
    defaultNetwork: 'hardhat',
    networks: {
        goerli: {
            url: GOERLI_RPC_URL,
            accounts: [PRIVATE_KEY],
            chainId: 5,
        },
        localhost: {
            url: 'http://127.0.0.1:8545/',
            chainId: 31337,
        },
    },
    etherscan: {
        // Your API key for Etherscan
        apiKey: API_KEY,
    },
}

export default config
