import { Request, Response } from 'express';
import { StreamBtcRealtimePrice } from '../../domain/use-cases/BtcRealtimePrice/stream-BtcRealtimePrice';

export class BtcRealtimePriceController {
  constructor(private readonly streamBtcRealtimePrice: StreamBtcRealtimePrice) {}

  async stream(req: Request, res: Response): Promise<void> {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    this.streamBtcRealtimePrice.execute((price) => {
      res.write(`data: ${JSON.stringify({ price: price.price, timestamp: price.timestamp })}\n\n`);
    });

    req.on('close', () => {
      res.end();
    });
  }

  async getLatestPrice(req: Request, res: Response): Promise<void> {
    const price = this.streamBtcRealtimePrice.getLatestPrice();
    res.json(price ? { price: price.price, timestamp: price.timestamp } : { price: null });
  }
}