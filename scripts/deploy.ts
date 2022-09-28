//imports
import { ethers, run, network } from 'hardhat'
import 'dotenv/config'

//async main function
async function main() {
    const simpleStorageFactory = await ethers.getContractFactory(
        'SimpleStorage'
    )

    console.log('Deploying contract...')
    const simpleStorage = await simpleStorageFactory.deploy()
    await simpleStorage.deployed()

    console.log('Deployed contract to', simpleStorage.address)

    // console.log(network.config)

    if (network.config.chainId !== 31337 && process.env.API_KEY) {
        await simpleStorage.deployTransaction.wait(6)
        await verify(simpleStorage.address, [])
    }

    const currentValue = await simpleStorage.retrieve()
    console.log('CUrrent value:', currentValue.toString())

    const transactionResponse = await simpleStorage.store(7)
    await transactionResponse.wait(1)
    const updatedValue = await simpleStorage.retrieve()
    console.log('Updated Value is:', updatedValue.toString())
}

async function verify(contractAddress: string, args: any) {
    console.log('Verifying contract...')

    try {
        await run('verify:verify', {
            address: contractAddress,
            constructorArgument: args,
        })
    } catch (e: any) {
        if (e.message.toLowerCase().includes('already verified')) {
            console.log('Already verified!')
        } else {
            console.error(e)
        }
    }
}

//main
main()
    .then(() => process.exit(0))
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
