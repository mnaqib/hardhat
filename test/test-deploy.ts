import { ethers } from 'hardhat'
import { SimpleStorage__factory, SimpleStorage } from '../typechain-types'
import { expect, assert } from 'chai'

describe('SimpleStorage', () => {
    let simpleStorageFactory: SimpleStorage__factory
    let simpleStorage: SimpleStorage
    beforeEach(async () => {
        simpleStorageFactory = await ethers.getContractFactory('SimpleStorage')
        simpleStorage = await simpleStorageFactory.deploy()
    })

    it('Should start with a favorite number of 11', async () => {
        const currentValue = await simpleStorage.retrieve()
        assert.equal(currentValue.toString(), '11')
        // expect(currentValue.toString()).to.equal('11')
    })

    it('Should update when we call store', async () => {
        const expectedValue = '7'
        const transactionResponse = await simpleStorage.store(expectedValue)
        await transactionResponse.wait(1)

        const currentValue = await simpleStorage.retrieve()

        assert.equal(currentValue.toString(), expectedValue)
    })

    it('Should have no value', async () => {
        const person = await simpleStorage.people(0)
        console.log(person)
        assert.isNull(person)
    })
})
