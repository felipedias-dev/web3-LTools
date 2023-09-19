import dotenv from 'dotenv';
dotenv.config();

import axios from 'axios';
import IBlockInfo from '../lib/blockInfo';
import { Block } from '../lib/block';

const BLOCKCHAIN_SERVER = process.env.BLOCKCHAIN_SERVER || 'http://localhost:3000/';
const minerWallet = {
  privateKey: '123',
  publicKey: `${process.env.MINER_WALLET}`,
}
console.log('Logged as:', minerWallet);
let totalMined = 0;

async function mine() {
  console.log('Getting next block info...');

  const { data } = await axios.get(`${BLOCKCHAIN_SERVER}/blocks/next`);
  const blockInfo = data as IBlockInfo;
  const newBlock = Block.fromBlockInfo(blockInfo);

  // TODO: Add reward tx

  console.log(`Start mining block #${blockInfo.index}`);
  newBlock.mine(blockInfo.difficulty, minerWallet.publicKey);

  console.log('Mined block! Sending it to blockchain...');

  try {
    await axios.post(`${BLOCKCHAIN_SERVER}/addblock`, newBlock);
    console.log('Block added to blockchain!');
    totalMined++;
    console.log(`Total mined blocks: ${totalMined}`);
  } catch (error: any) {
    console.error(error.response ? error.response.data : error.message);
  }

  setTimeout(() => {
    mine();
  }, 1000);
}

mine();
