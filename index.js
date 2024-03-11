const iost =require('iost');
const bs58 =require('bs58');

const {IOST, RPC, HTTPProvider, Tx, KeyPair} = iost;

async function main() {
  const rpc = new RPC(new HTTPProvider('http://149.102.158.188:30001/'));
  const instance = new IOST();
  instance.setRPC(rpc);

  const account = new iost.Account("0xkhun");
  const kp = new KeyPair(bs58.decode("4391oeNyFuST2qQBEmPypQ6v5FgCniGaeYu83hT5qujjkMQHi5eEU1FYRQQnFVGSyujiLzYF1Va6xHqzqgc78tBk"));
  account.addKeyPair(kp, "owner");
  account.addKeyPair(kp, "active");
  instance.setAccount(account);

  const mintCount = 1; // max is 10, otherwise will killed
  const tx = new Tx(1, 1 * 45000);
  tx.actions = Array.from({ length: mintCount }).map(() => ({
    contract: 'Contract6vU3ZWL57jQeFpbuqUxQfL5PGeFJekWrDG2WVGjWqrKx',
    actionName: 'mint',
    data: JSON.stringify(['IOSI', '1000'])
  }))
  tx.amount_limit = [{
    token: 'iost',
    value: 'unlimited'
  }];

  instance.signAndSend(tx).on('pending', console.log).on('success', console.log).on('failed', console.error);
}

main().catch(console.error);