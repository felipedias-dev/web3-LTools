import { Block } from './block';
import { Validation } from '../validation';
import IBlockInfo from '../blockInfo';

/**
 * Blockchain mocked class
 * - Represents a blockchain.
 */
export class Blockchain {
  blocks: Block[];
  nextIndex: number = 0;

  /**
   * Creates a new mocked blockchain
   * @param blocks The blocks in the blockchain
   * @returns A new blockchain
   */
  constructor() {
    this.blocks = [
      new Block({
        index: this.nextIndex,
        previousHash: '',
        data: 'genesis'
      })
    ];

    this.nextIndex++;
  }

  getFeePerTX(): number {
    return 1;
  }

  getLastBlock(): Block {
    return this.blocks[this.blocks.length - 1];
  }

  getNextBlock(): IBlockInfo {
    const data = new Date().toString();
    const difficulty = 0;
    const previousHash = this.getLastBlock().hash;
    const index = 1;
    const feePerTx = this.getFeePerTX();
    const maxDifficulty = 62;

    return {
      data,
      difficulty,
      previousHash,
      index,
      feePerTx,
      maxDifficulty
    } as IBlockInfo;
  }

  addBlock(block: Block): Validation {
    if (block.index !== this.nextIndex) return new Validation(false, 'Invalid mocked block');

    this.blocks.push(block);
    this.nextIndex++;

    return new Validation();
  }

  isValid(): Validation {
    return new Validation();
  }
}
