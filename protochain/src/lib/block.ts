import { createHash } from 'node:crypto';
import { Validation } from './validation';

interface ICreateBlock {
  index: number;
  previousHash: string;
  data: string;
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

  /**
   * Creates a new block
   * @param index The index of the block
   * @param previousHash The hash of the previous block
   * @param data The data of the block
   */
  constructor(block: ICreateBlock) {
    this.index = block.index;
    this.timestamp = Date.now();
    this.previousHash = block.previousHash;
    this.data = block.data;
    this.hash = this.getHash();
  }

  getHash(): string {
    return createHash("sha256")
    .update(`${this.index + this.data + this.timestamp + this.previousHash}`)
    .digest("hex");
  }

  /**
   * Checks if the block is valid
   * @returns Returns if the block is valid
   */
  isValid(previousIndex: number, previousHash: string): Validation {
    if (this.index !== previousIndex + 1) return new Validation(false, 'Invalid index');
    if (this.timestamp < 1) return new Validation(false, 'Invalid timestamp');
    if (this.hash !== this.getHash()) return new Validation(false, 'Invalid hash');
    if (!this.previousHash) return new Validation(false, 'Invalid previous hash');
    if (this.previousHash !== previousHash) return new Validation(false, 'Invalid previous hash');
    if (!this.data) return new Validation(false, 'Invalid data');
    return new Validation();
  }
}
