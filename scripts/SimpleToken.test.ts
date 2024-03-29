import { ethers as hardHatEthers } from 'hardhat'

const SimpleTokenContractAddress = '0xEadcbd9115Eb06698ba6e1Cd7BB4C6381f9E6729'

const recipientAddress = '0x0a0844da5e01e391d12999ca859da8a897d5979a'

async function tokenTransfer() {
  // Sender setup
  const [sender] = await hardHatEthers.getSigners()
  console.log(`Initiating transaction to transfer token from: ${sender.address}`)

  const txCount = await sender.getTransactionCount()
  console.log('Transaction count of sender:', txCount.toString())

  // Simple token contract setup
  const simpleToken = await hardHatEthers.getContractFactory('SimpleToken')
  const simpleTokenContract = await simpleToken.attach(SimpleTokenContractAddress)
  console.log('Simple token contract address:', simpleTokenContract.address)

  // Transfer tokens
  const tx = await simpleTokenContract.transfer(recipientAddress, '1800')
  console.log('Transaction hash:', tx.hash)

  // Wait for the transaction to be mined
  await tx.wait()
  console.log('Transaction confirmed.')

  // Check balance of recipient
  const recipientBalance = await simpleTokenContract.balanceOf(recipientAddress)
  console.log('Recipient balance:', recipientBalance.toString())

  // Check balance of sender
  const senderBalance = await simpleTokenContract.balanceOf(sender.address)
  console.log('Sender balance:', senderBalance.toString())
}

async function checkTokenBalance(address: string) {
  // Simple token contract setup
  const simpleToken = await hardHatEthers.getContractFactory('SimpleToken')
  const simpleTokenContract = await simpleToken.attach(SimpleTokenContractAddress)
  console.log('Simple token contract address:', simpleTokenContract.address)

  // Check balance of recipient
  const recipientBalance = await simpleTokenContract.balanceOf(address)
  console.log('Recipient balance:', recipientBalance.toString())
}

async function main() {
  await tokenTransfer()
  await checkTokenBalance('0x32b6f2c027d4c9d99ca07d047d17987390a5eb39')
  await checkTokenBalance('0x0a0844da5e01e391d12999ca859da8a897d5979a')
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
