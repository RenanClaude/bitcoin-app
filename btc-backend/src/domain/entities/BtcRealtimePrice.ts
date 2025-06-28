export class BtcRealtimePrice {
  constructor(
    public readonly price: string,
    public readonly timestamp: number
  ) {}

  static fromBinanceTicker(data: { c: string; E: number }): BtcRealtimePrice {
    return new BtcRealtimePrice(data.c, data.E);
  }
}