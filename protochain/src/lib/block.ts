import { createHash } from 'node:crypto';

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
  constructor(index: number, previousHash: string, data: string) {
    this.index = index;
    this.timestamp = Date.now();
    this.previousHash = previousHash;
    this.data = data;
    this.hash = this.getHash();
  }

  getHash(): string {
    return createHash("sha256")
    .update(`${this.index + this.data + this.timestamp + this.previousHash}`)
    .digest("hex");
  }

  /**
   * Checks if the block is valid
   * @returns True if the block is valid, false otherwise
   */
  isValid(previousIndex: number, previousHash: string): boolean {
    if (this.index < 0) return false;
    if (this.index !== previousIndex + 1) return false;
    if (this.timestamp < 1) return false;
    if (!this.hash) return false;
    if (!this.previousHash) return false;
    if (this.previousHash !== previousHash) return false;
    if (!this.data) return false;
    return true;
  }
}
