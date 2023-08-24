import { Block } from './block';

/**
 * Blockchain class
 * - Represents a blockchain.
 */
export class Blockchain {
  blocks: Block[];
  nextIndex: number = 0;

  /**
   * Creates a new blockchain
   * @param blocks The blocks in the blockchain
   * @returns A new blockchain
   */
  constructor() {
    this.blocks = [new Block(this.nextIndex, '', 'genesis')];
    this.nextIndex++;
  }

  addBlock(block: Block): boolean {
    const previousBlock = this.blocks[this.blocks.length - 1];
    if (!block.isValid(previousBlock.index, previousBlock.hash)) return false;
    this.blocks.push(block);
    this.nextIndex++;
    return true;
  }

  isValid(): boolean {
    for (let i = this.blocks.length - 1; i > 0; i--) {
      const currentBlock = this.blocks[i];
      const previousBlock = this.blocks[i - 1];
      const isValid = currentBlock.isValid(previousBlock.index, previousBlock.hash);
      if (!isValid) return false;
    }
    return true;
  }
}
