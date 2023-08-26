import { Validation } from '../validation';

interface ICreateBlock {
  index: number;
  previousHash: string;
  data: string;
}

/**
 * Mocked Block class
 * - Represents a mocked block in the blockchain.
 */
export class Block {
  index: number;
  timestamp: number;
  hash: string;
  previousHash: string;
  data: string;

  /**
   * Creates a new mocked block
   * @param block The mock block data
   */
  constructor(block?: ICreateBlock) {
    this.index = block?.index || 0;
    this.timestamp = Date.now();
    this.previousHash = block?.previousHash || '';
    this.data = block?.data || '';
    this.hash = this.getHash();
  }

  getHash(): string {
    return this.hash || 'mocked hash';
  }

  /**
   * Checks if the mocked block is valid
   * @returns Returns if the mocked block is valid
   */
  isValid(previousIndex: number, previousHash: string): Validation {
    if (this.index !== previousIndex + 1 || this.previousHash !== previousHash)
      return new Validation(false, 'Invalid mock block');

    return new Validation();
  }
}
