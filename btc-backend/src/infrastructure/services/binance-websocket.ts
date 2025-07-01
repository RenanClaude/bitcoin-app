import WebSocket from 'ws';
import { BtcRealtimePrice } from '../../domain/entities/BtcRealtimePrice';

interface BinanceTicker {
  c: string; // Último preço
  E: number; // Timestamp
}

export class BinanceWebSocketService {
  private ws: WebSocket;
  private url: string = 'wss://stream.binance.com:9443/ws/btcusdt@ticker';
  private latestPrice: BtcRealtimePrice | null = null;
  private subscribers: ((price: BtcRealtimePrice) => void)[] = [];

  constructor() {
    this.ws = new WebSocket(this.url);
    this.setupWebSocket();
  }

  private setupWebSocket(): void {
    this.ws.on('open', () => {
      console.log('Conexão WebSocket com Binance estabelecida');
    });

    this.ws.on('message', (data: WebSocket.Data) => {
      try {
        const ticker: BinanceTicker = JSON.parse(data.toString());
        const price = BtcRealtimePrice.fromBinanceTicker(ticker);
        this.latestPrice = price;
        this.notifySubscribers(price);
      } catch (error) {
        console.error('Erro ao processar mensagem:', error);
      }
    });

    this.ws.on('error', (error) => {
      console.error('Erro no WebSocket:', error);
    });

    this.ws.on('close', () => {
      console.log('Conexão fechada. Reconectando em 5s...');
      setTimeout(() => this.reconnect(), 5000);
    });
  }

  private reconnect(): void {
    this.ws = new WebSocket(this.url);
    this.setupWebSocket();
  }

  private notifySubscribers(price: BtcRealtimePrice): void {
    this.subscribers.forEach((callback) => callback(price));
  }

  public subscribe(callback: (price: BtcRealtimePrice) => void): void {
    this.subscribers.push(callback);
    if (this.latestPrice) {
      callback(this.latestPrice);
    }
  }

  public getLatestPrice(): BtcRealtimePrice | null {
    return this.latestPrice;
  }
}