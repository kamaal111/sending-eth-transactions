const { Wallet, Utils } = require("alchemy-sdk");

const alchemy = require("./SDK");

async function main() {
  const { PRIVATE_KEY } = process.env;
  const wallet = new Wallet(PRIVATE_KEY);

  const nonce = await alchemy.core.getTransactionCount(
    wallet.getAddress(),
    "latest"
  ); // nonce starts counting from 0

  const rawTransaction = await wallet.signTransaction({
    to: "0xD8Ea779b8FFC1096CA422D40588C4c0641709890", // faucet address to return eth
    value: Utils.parseEther("0.1"),
    gasLimit: Utils.parseUnits("30000", "wei"),
    gasPrice: Utils.parseUnits("30000", "wei"),
    nonce,
  });

  let response;
  try {
    response = await alchemy.transact.sendTransaction(rawTransaction);
  } catch (error) {
    console.log(
      "❗Something went wrong while submitting your transaction:",
      error
    );
    console.log("💥💥💥", JSON.parse(error.body).error);
    return;
  }

  console.log(
    `🎉 The hash of your transaction is: ${response.hash}\nCheck Alchemy's Mempool to view the status of your transaction!`
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
