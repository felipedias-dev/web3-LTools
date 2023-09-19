import dotenv from 'dotenv';
dotenv.config();

import express, { NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import { Blockchain } from '../lib/blockchain';
import { Block } from '../lib/block';

/* c8 ignore next */
const PORT: number = parseInt(`${process.env.BLOCKCHAIN_PORT}`) || 3000;

const app = express();

/* c8 ignore start */
if (process.argv.includes('--run')) app.use(morgan('tiny'));
/* c8 ignore end */

app.use(express.json());

const blockchain = new Blockchain();

app.get('/status', (req: Request, res: Response, next: NextFunction) => {
  res.json({
    numberOfBlocks: blockchain.blocks.length,
    isValid: blockchain.isValid(),
    lastBlock: blockchain.blocks[blockchain.blocks.length - 1],
  });
});

app.get('/blocks/next', (req: Request, res: Response, next: NextFunction) => {
  res.json(blockchain.getNextBlock());
});

app.post('/addblock', (req: Request, res: Response, next: NextFunction) => {
  const blockData = req.body as Block;

  const block = new Block(blockData);
  blockchain.addBlock(block);
  res.status(201).json({ block });
});

/* c8 ignore start */
if (process.argv.includes('--run')) app.listen(PORT, () => console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`));
/* c8 ignore end */

export { app };
