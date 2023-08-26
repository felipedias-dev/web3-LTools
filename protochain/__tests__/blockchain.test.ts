import { describe, expect, test, jest } from '@jest/globals';
import { Blockchain } from '../src/lib/blockchain';
import { Block } from '../src/lib/block';

jest.mock('../src/lib/block');

describe('Blockchain', () => {
  let blockchain: Blockchain;

  beforeAll(() => {
    blockchain = new Blockchain();
  });

  test('should create a blockchain', () => {
    expect(blockchain.blocks.length).toBe(1);
  });

  test('should have a valid genesis block', () => {
    expect(blockchain.isValid().success).toBe(true);
  });

  test('should not add an invalid block', () => {
    const block = new Block({
      index: -1,
      previousHash: blockchain.getLastBlock().hash,
      data: 'data',
    });

    const result = blockchain.addBlock(block);
    expect(result.success).toBe(false);
  });

  test('should add blocks', () => {
    const block1 = new Block({
      index: blockchain.nextIndex,
      previousHash: blockchain.getLastBlock().hash,
      data: 'data',
    });

    const result1 = blockchain.addBlock(block1);
    expect(result1.success).toBe(true);

    const block2 = new Block({
      index: blockchain.nextIndex,
      previousHash: blockchain.getLastBlock().hash,
      data: 'data',
    });

    const result2 = blockchain.addBlock(block2);
    expect(result2.success).toBe(true);
  });

  test('should be a valid blockchain', () => {
    expect(blockchain.isValid().success).toBe(true);
  });

  test('should not be a valid blockchain', () => {
    const index = 1;
    blockchain.blocks[index].hash = 'invalid previous hash';
    const result = blockchain.isValid();
    expect(result.success).toBe(false);
    expect(result.message)
      .toBe(`Invalid block #${index + 1}: Invalid mock block`);
  });
});
