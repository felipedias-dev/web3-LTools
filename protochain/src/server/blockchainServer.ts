import express from 'express';
import morgan from 'morgan';
import { Blockchain } from '../lib/blockchain';
import { Block } from '../lib/block';

const PORT: number = 3000;

const app = express();

app.use(morgan('tiny'));
app.use(express.json());

const blockchain = new Blockchain();

app.get('/status', (req, res, next) => {
  res.json({
    numberOfBlocks: blockchain.blocks.length,
    isValid: blockchain.isValid(),
    lastBlock: blockchain.blocks[blockchain.blocks.length - 1],
  });
});

app.post('/addblock', (req, res, next) => {
  const data = req.body.data;
  const blockData = {
    index: blockchain.nextIndex,
    previousHash: blockchain.blocks[blockchain.blocks.length - 1].hash,
    data,
  }
  const block = new Block(blockData.index, blockData.previousHash, blockData.data);
  blockchain.addBlock(block);
  res.json({
    added: blockchain,
  });
});

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});