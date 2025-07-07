import { BtcRealtimePrice } from '../types';

export const fetchInitialPrice = async (): Promise<BtcRealtimePrice | null> => {
  try {
    const res = await fetch('http://localhost:3001/api/realtime-price/price');
    if (!res.ok) {
      throw new Error(`Erro HTTP! Status: ${res.status}`);
    }
    const data = await res.json();
    console.log('Preço inicial recebido:', data); // Log para depuração
    if (!data || typeof data.price !== 'string' || typeof data.timestamp !== 'number') {
      throw new Error('Formato de preço inicial inválido');
    }
    return data;
  } catch (error) {
    console.error('Erro ao carregar preço inicial:', error);
    return null;
  }
};

export const subscribeToPrice = (callback: (price: BtcRealtimePrice) => void): () => void => {
  let eventSource: EventSource | null = null;
  let retryCount = 0;
  const maxRetries = 5;
  const baseDelay = 1000;

  const connect = () => {
    console.log('Iniciando conexão SSE'); // Log para depuração
    eventSource = new EventSource('http://localhost:3001/api/realtime-price/stream');

    eventSource.onopen = () => {
      console.log('Conexão SSE estabelecida'); // Log para depuração
      retryCount = 0; // Reseta tentativas ao conectar com sucesso
    };

    eventSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (!data || typeof data.price !== 'string' || typeof data.timestamp !== 'number') {
          throw new Error('Formato de dados SSE inválido');
        }
        callback(data);
      } catch (error) {
        console.error('Erro ao processar mensagem SSE:', error);
      }
    };

    eventSource.onerror = () => {
      console.error(`Erro no SSE. Tentativa ${retryCount + 1} de ${maxRetries}`);
      eventSource?.close();

      if (retryCount < maxRetries) {
        const delay = baseDelay * Math.pow(2, retryCount);
        retryCount++;
        console.log(`Tentando reconectar em ${delay}ms`); // Log para depuração
        setTimeout(connect, delay);
      } else {
        console.error('Máximo de tentativas de reconexão atingido.');
        callback({ price: '', timestamp: 0 });
      }
    };
  };

  connect();

  return () => {
    console.log('Fechando conexão SSE'); // Log para depuração
    eventSource?.close();
    eventSource = null;
  };
};