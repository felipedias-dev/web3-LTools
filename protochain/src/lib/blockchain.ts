import { Block } from './block';
import IBlockInfo from './blockInfo';
import { Validation } from './validation';

/**
 * Blockchain class
 * - Represents a blockchain.
 */
export class Blockchain {
  blocks: Block[];
  nextIndex: number = 0;
  static readonly DIFFICULTY_FACTOR: number = 5;
  static readonly MAX_DIFFICULTY: number = 62;

  /**
   * Creates a new blockchain
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

  getLastBlock(): Block {
    return this.blocks[this.blocks.length - 1];
  }

  getDifficulty(): number {
    return Math.ceil(this.blocks.length / Blockchain.DIFFICULTY_FACTOR);
  }

  addBlock(block: Block): Validation {
    const previousBlock = this.getLastBlock();
    const isValid = block.isValid(previousBlock.index, previousBlock.hash, this.getDifficulty());
    if (!isValid.success) return new Validation(false, isValid.message);
    this.blocks.push(block);
    this.nextIndex++;
    return new Validation();
  }

  isValid(): Validation {
    for (let i = this.blocks.length - 1; i > 0; i--) {
      const currentBlock = this.blocks[i];
      const previousBlock = this.blocks[i - 1];
      const validation = currentBlock.isValid(previousBlock.index, previousBlock.hash, this.getDifficulty());
      if (!validation.success)
        return new Validation(false, `Invalid block #${currentBlock.index}: ${validation.message}`);
    }
    return new Validation();
  }

  getFeePerTX(): number {
    return 1;
  }

  getNextBlock(): IBlockInfo {
    const data = new Date().toString();
    const difficulty = this.getDifficulty();
    const previousHash = this.getLastBlock().hash;
    const index = this.nextIndex;
    const feePerTx = this.getFeePerTX();
    const maxDifficulty = Blockchain.MAX_DIFFICULTY;

    return {
      data,
      difficulty,
      previousHash,
      index,
      feePerTx,
      maxDifficulty
    } as IBlockInfo;
  }
}
