import { describe, expect, test } from '@jest/globals';
import { Block } from '../src/lib/block';

describe('Block', () => {
  let genesisBlock: Block;
  const difficulty = 1;
  const miner = 'felipe';

  beforeAll(() => {
    genesisBlock = new Block({
      index: 0,
      previousHash: '',
      data: 'genesis',
    });
  });

  test('should not create an invalid block (index)', () => {
    const block = new Block({
      index: -1,
      previousHash: genesisBlock.hash,
      data: 'data',
    });
    const invalidBlock = block.isValid(genesisBlock.index, genesisBlock.hash, difficulty);

    expect(invalidBlock.success).toBe(false);
    expect(invalidBlock.message).toBe('Invalid index');
  });

  test('should not create an invalid block (hash)', () => {
    const block = new Block({
      index: 1,
      previousHash: genesisBlock.hash,
      data: 'data',
    });

    block.hash = '';
    const invalidBlock = block.isValid(genesisBlock.index, genesisBlock.hash, difficulty);

    expect(invalidBlock.success).toBe(false);
    expect(invalidBlock.message).toBe('Invalid hash');
  });

  test('should not create an invalid block (timestamp)', () => {
    const block = new Block({
      index: 1,
      previousHash: genesisBlock.hash,
      data: 'data',
    });

    block.timestamp = 0;
    const invalidBlock = block.isValid(genesisBlock.index, genesisBlock.hash, difficulty);

    expect(invalidBlock.success).toBe(false);
    expect(invalidBlock.message).toBe('Invalid timestamp');
  });

  test('should not create an invalid block (previousIndex)', () => {
    const block = new Block({
      index: 2,
      previousHash: genesisBlock.hash,
      data: 'data',
    });

    const invalidBlock = block.isValid(genesisBlock.index, genesisBlock.hash, difficulty);

    expect(invalidBlock.success).toBe(false);
    expect(invalidBlock.message).toBe('Invalid index');
  });

  test('should not create an invalid block (previousHash)', () => {
    const block1 = new Block({
      index: 1,
      previousHash: '',
      data: 'data',
    });

    const invalidBlock1 = block1.isValid(genesisBlock.index, genesisBlock.hash, difficulty);

    expect(invalidBlock1.success).toBe(false);
    expect(invalidBlock1.message).toBe('Invalid previous hash');

    const block2 = new Block({
      index: 1,
      previousHash: 'invalid previous hash',
      data: 'data',
    });

    const invalidBlock2 = block2.isValid(genesisBlock.index, genesisBlock.hash, difficulty);

    expect(invalidBlock2.success).toBe(false);
    expect(invalidBlock2.message).toBe('Invalid previous hash');
  });

  test('should not create an invalid block (data)', () => {
    const block = new Block({
      index: 1,
      previousHash: genesisBlock.hash,
      data: '',
    });

    const invalidBlock = block.isValid(genesisBlock.index, genesisBlock.hash, difficulty);

    expect(invalidBlock.success).toBe(false);
    expect(invalidBlock.message).toBe('Invalid data');
  });

  test('should not create an invalid block (nonce)', () => {
    const block = new Block({
      index: 1,
      previousHash: genesisBlock.hash,
      data: 'data',
      nonce: 0,
    });

    const invalidBlock = block.isValid(genesisBlock.index, genesisBlock.hash, difficulty);

    expect(invalidBlock.success).toBe(false);
    expect(invalidBlock.message).toBe('Invalid mining');
  });

  test('should not create an invalid block (prefix)', () => {
    const block = new Block({
      index: 1,
      previousHash: genesisBlock.hash,
      data: 'data',
      miner,
    });

    const invalidBlock = block.isValid(genesisBlock.index, genesisBlock.hash, difficulty);

    expect(invalidBlock.success).toBe(false);
    expect(invalidBlock.message).toBe('Invalid prefix');
  });

  test('should create a valid block', () => {
    const block = new Block({
      index: 1,
      previousHash: genesisBlock.hash,
      data: 'data',
    });

    block.mine(difficulty, miner);

    const validBlock = block.isValid(genesisBlock.index, genesisBlock.hash, difficulty);

    console.log(validBlock);

    expect(validBlock.success).toBe(true);
  });
});
