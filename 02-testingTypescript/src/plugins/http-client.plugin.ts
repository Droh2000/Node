import axios from 'axios';


export const httpClientPlugin = {

  get: async(url: string ) => {
    const { data } = await axios.get( url );
    return data;
    // const resp = await fetch( url );
    // return await resp.json();     
  },

  // Como recomendacion cuando dejamos codigo pendiente de implementar le agregemos asio
  // para que cuando hagamos test y nos sale este error sabemos porque paso
  post: async(url: string, body: any ) => {
    throw new Error('Not Implemented');
  },
  put: async(url: string, body: any) => {
    throw new Error('Not Implemented');
  },
  delete: async(url: string ) => {
    throw new Error('Not Implemented');
  },

};


