import { describe, expect, test } from '@jest/globals';
import { Blockchain } from '../src/lib/blockchain';
import { Block } from '../src/lib/block';

describe('Blockchain', () => {
  let blockchain: Blockchain;

  beforeAll(() => {
    blockchain = new Blockchain();
  });

  test('should create a blockchain', () => {
    expect(blockchain.blocks.length).toBe(1);
  });

  test('should have a valid genesis block', () => {
    expect(blockchain.isValid()).toBe(true);
  });

  test('should not add an invalid block', () => {
    const block = new Block(-1, blockchain.blocks[blockchain.blocks.length - 1].hash, 'data');
    const result = blockchain.addBlock(block);

    expect(result).toBe(false);
  });

  test('should add blocks', () => {
    const block1 = new Block(blockchain.nextIndex, blockchain.blocks[blockchain.blocks.length - 1].hash, 'data');
    const result1 = blockchain.addBlock(block1);

    expect(result1).toBe(true);

    const block2 = new Block(blockchain.nextIndex, blockchain.blocks[blockchain.blocks.length - 1].hash, 'data');
    const result2 = blockchain.addBlock(block2);

    expect(result2).toBe(true);
  });

  test('should be a valid blockchain', () => {
    expect(blockchain.isValid()).toBe(true);
  });

  test('should not be a valid blockchain', () => {
    blockchain.blocks[1].hash = 'invalid hash';
    expect(blockchain.isValid()).toBe(false);
  });
});
