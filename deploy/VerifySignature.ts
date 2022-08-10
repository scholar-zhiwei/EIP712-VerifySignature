import { DeployFunction } from 'hardhat-deploy/types'
import { HardhatRuntimeEnvironment } from 'hardhat/types'
import { VerifySignature } from '../typechain/'

const deployFunction: DeployFunction = async function ({
  deployments,
  getNamedAccounts,
  ethers,
}: HardhatRuntimeEnvironment) {
  console.log('Running VerifySignature deploy script')
  const { deploy } = deployments

  const { deployer } = await getNamedAccounts()
  console.log('Deployer:', deployer)

  const { address } = await deploy('VerifySignature', {
    from: deployer,
    log: true,
    deterministicDeployment: false,
    skipIfAlreadyDeployed: false,
    // waitConfirmations: 3,
    args: ["Demo", "1.0"],
  })

  console.log('VerifySignature deployed at ', address)
}

export default deployFunction

deployFunction.dependencies = []

deployFunction.tags = ['VerifySignature']
