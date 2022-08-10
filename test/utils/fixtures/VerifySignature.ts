/* eslint-disable camelcase */
import { JsonRpcSigner } from '@ethersproject/providers'
import { VerifySignature } from '../../../typechain'
import { deployContract } from '../contracts'

export const fixtureIMP = async (signer: JsonRpcSigner) => {
  const testVerifySignature: VerifySignature = await deployContract('VerifySignature', signer, 'Demo', '1.0')

  return {
    testVerifySignature,
  }
}
