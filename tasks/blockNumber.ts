import '@nomicfoundation/hardhat-toolbox'
import { task } from 'hardhat/config'

task('blockNumber', 'Prints the current block number').setAction(
    async (taskArgs, hre) => {
        const blockNumber = await hre.ethers.provider.getBlockNumber()
        console.log('Current bloack number:', blockNumber)
    }
)
