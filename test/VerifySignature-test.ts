import { SnapshotRestorer, takeSnapshot } from '@nomicfoundation/hardhat-network-helpers'
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers'
import { expect } from 'chai'
import { Wallet } from 'ethers'
import { keccak256, solidityPack } from 'ethers/lib/utils'
import { ethers, network,deployments, getNamedAccounts } from 'hardhat'
import MerkleTree from 'merkletreejs'
import { VerifySignature } from '../typechain'

import { randomHex } from './utils/encoding'
import { fixtureIMP } from './utils/fixtures/VerifySignature'
import { faucet } from './utils/impersonate'

describe('Test VerifySignature', async function () {
  let owner: SignerWithAddress
  // const { provider } = ethers
  let verifySignature: VerifySignature
  //let tokenSnapshot: SnapshotRestorer
  before('', async function () {
    // let RPC_URL = 'https://data-seed-prebsc-1-s1.binance.org:8545/'
    // let netWorkId = 97
    // let provider = new ethers.providers.StaticJsonRpcProvider(RPC_URL, netWorkId)
    //拿到yarn test --network 相应网络的account 在hardhat.config.ts设置的privateKey 的相应账户
    owner = (await ethers.getSigners())[0]
    console.log('owner address = ', owner.address)
  })
  describe('testVerifySignature', function () {
    before('', async function () {
    await deployments.fixture(["VerifySignature"]);
      verifySignature = await ethers.getContract('VerifySignature');
      console.log(verifySignature.address)
    //   tokenSnapshot = await takeSnapshot()
    })
    it('verifySignature', async function () {
      const message = {
        from: '0xE3a463d743F762D538031BAD3f1E748BB41f96ec',
        to: '0x39Ef50bd29Ae125FE10C6a909E42e1C6a94Dde29',
        value: 12345789,
      }

      const domain = {
        name: 'Demo',
        version: '1.0',
        chainId: 97,
        verifyingContract: verifySignature.address,
      }

      const types = {
        VerifyClaim: [
          { name: 'from', type: 'address' },
          { name: 'to', type: 'address' },
          { name: 'value', type: 'uint256' },
        ],
      }

      const signature = await owner._signTypedData(domain, types, message)
      console.log('signature====' + signature)

      const address = await verifySignature.recoverV4(
        '0xE3a463d743F762D538031BAD3f1E748BB41f96ec',
        '0x39Ef50bd29Ae125FE10C6a909E42e1C6a94Dde29',
        12345789,
        signature,
      )
      console.log('验证address===' + address)
    })
  })
})
