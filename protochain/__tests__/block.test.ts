import { describe, expect, test } from '@jest/globals';
import { Block } from '../src/lib/block';

describe('Block', () => {
  let genesisBlock: Block;

  beforeAll(() => {
    genesisBlock = new Block(0, '', 'genesis');
  });

  test('should create an invalid block (index)', () => {
    const block = new Block(-1, genesisBlock.hash, 'data');
    const invalidBlock = block.isValid(genesisBlock.index, genesisBlock.hash);

    expect(invalidBlock).toBe(false);
  });

  test('should create an invalid block (hash)', () => {
    const block = new Block(1, genesisBlock.hash, 'data');
    block.hash = '';
    const invalidBlock = block.isValid(genesisBlock.index, genesisBlock.hash);

    expect(invalidBlock).toBe(false);
  });

  test('should create an invalid block (timestamp)', () => {
    const block = new Block(1, genesisBlock.hash, 'data');
    block.timestamp = 0;
    const invalidBlock = block.isValid(genesisBlock.index, genesisBlock.hash);

    expect(invalidBlock).toBe(false);
  });

  test('should create an invalid block (previousIndex)', () => {
    const block = new Block(2, genesisBlock.hash, 'data');
    const invalidBlock = block.isValid(genesisBlock.index, genesisBlock.hash);

    expect(invalidBlock).toBe(false);
  });

  test('should create an invalid block (previousHash)', () => {
    const block = new Block(1, '', 'data');
    const invalidBlock = block.isValid(genesisBlock.index, genesisBlock.hash);

    expect(invalidBlock).toBe(false);
  });

  test('should create an invalid block (data)', () => {
    const block = new Block(1, genesisBlock.hash, '');
    const invalidBlock = block.isValid(genesisBlock.index, genesisBlock.hash);

    expect(invalidBlock).toBe(false);
  });

  test('should create a valid block', () => {
    const block = new Block(1, genesisBlock.hash, 'data');
    const validBlock = block.isValid(genesisBlock.index, genesisBlock.hash);

    expect(validBlock).toBe(true);
  });
});
