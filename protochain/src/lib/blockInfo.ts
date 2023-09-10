/**
 * The BlockInfo interface
 */
export default interface IBlockInfo {
  index: number;
  previousHash: string;
  difficulty: number;
  maxDifficulty: number;
  feePerTx: number;
  data: string;
}
