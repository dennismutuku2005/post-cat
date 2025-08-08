import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useRequestStore = create(persist(
  (set, get) => ({
    url: '',
    method: 'GET',
    headers: '{\n  "Content-Type": "application/json"\n}',
    body: '',
    response: null,
    responseStatus: null,
    responseTime: null,
    responseHeaders: null,
    
    setUrl: (url) => set({ url }),
    setMethod: (method) => set({ method }),
    setHeaders: (headers) => set({ headers }),
    setBody: (body) => set({ body }),
    
    sendRequest: async () => {
      const { url, method, headers, body } = get();
      
      try {
        const startTime = performance.now();
        const response = await fetch(url, {
          method,
          headers: JSON.parse(headers),
          body: method === 'GET' || method === 'DELETE' ? undefined : body
        });
        
        const endTime = performance.now();
        const data = await response.json().catch(() => ({}));
        
        set({
          response: data,
          responseStatus: response.status,
          responseTime: Math.round(endTime - startTime),
          responseHeaders: Object.fromEntries(response.headers.entries())
        });
      } catch (error) {
        set({
          response: { error: error.message },
          responseStatus: 500,
          responseTime: null,
          responseHeaders: null
        });
      }
    }
  }),
  {
    name: 'post-cat-request',
    partialize: (state) => ({ 
      url: state.url,
      method: state.method,
      headers: state.headers,
      body: state.body
    })
  }
));