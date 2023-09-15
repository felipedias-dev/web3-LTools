import { createHash } from 'node:crypto';
import { Validation } from './validation';
import IBlockInfo from './blockInfo';

interface ICreateBlock {
  index: number;
  previousHash: string;
  data: string;
  hash?: string;
  nonce?: number;
  miner?: string;
  timestamp?: number;
}

/**
 * Block class
 * - Represents a block in the blockchain.
 */
export class Block {
  index: number;
  timestamp: number;
  hash: string;
  previousHash: string;
  data: string;
  nonce: number;
  miner: string;

  /**
   * Creates a new block
   * @param index The index of the block
   * @param previousHash The hash of the previous block
   * @param data The data of the block
   */
  constructor(block: ICreateBlock) {
    this.index = block.index;
    this.timestamp = block.timestamp || Date.now();
    this.previousHash = block.previousHash;
    this.data = block.data;
    this.nonce = block.nonce || 1;
    this.miner = block.miner || '';
    this.hash = block.hash || this.getHash();
  }

  getHash(): string {
    return createHash("sha256")
    .update(`${this.index + this.data + this.timestamp + this.previousHash + this.nonce + this.miner}`)
    .digest("hex");
  }

  /**
   * Generates a new new valid hash for the block by mining
   * @param difficulty The difficulty of the blockchain
   * @param miner The miner of the block
   */
  mine(difficulty: number, miner: string): void {
    this.miner = miner;

    const prefix = '0'.repeat(difficulty + 1);

    do {
      this.nonce++;
      this.hash = this.getHash();
    } while (!this.hash.startsWith(prefix));
  }

  /**
   * Checks if the block is valid
   * @param previousIndex The index of the previous block
   * @param previousHash The hash of the previous block
   * @param difficulty The difficulty of the blockchain
   * @returns Returns if the block is valid
   */
  isValid(previousIndex: number, previousHash: string, difficulty: number): Validation {
    if (this.index !== previousIndex + 1) return new Validation(false, 'Invalid index');
    if (this.timestamp < 1) return new Validation(false, 'Invalid timestamp');
    if (this.hash !== this.getHash()) return new Validation(false, 'Invalid hash');
    if (!this.previousHash) return new Validation(false, 'Invalid previous hash');
    if (this.previousHash !== previousHash) return new Validation(false, 'Invalid previous hash');
    if (!this.data) return new Validation(false, 'Invalid data');
    console.log(this.nonce, this.miner);
    if (!this.nonce || !this.miner) return new Validation(false, 'Invalid mining');

    const prefix = '0'.repeat(difficulty + 1);

    if (!this.hash.startsWith(prefix)) return new Validation(false, 'Invalid prefix');

    return new Validation();
  }

  static fromBlockInfo(blockInfo: IBlockInfo): Block {
    return new Block({
      index: blockInfo.index,
      previousHash: blockInfo.previousHash,
      data: blockInfo.data,
    });
  }
}
