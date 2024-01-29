export class Exaroton {
  #token: string;

  constructor(token: string) {
    this.#token = token;
  }

  async request<T>(path: string) {
    const resp = await fetch(`https://api.exaroton.com/v1/${path}`, {
      headers: {
        Authorization: `Bearer ${this.#token}`,
      },
    });

    return (await resp.json()) as T;
  }

  async getAccount() {
    return await this.request<APIResponse<Account>>("account/");
  }

  async listServers() {
    return await this.request<APIResponse<Server[]>>("servers/");
  }

  async listCreditPools() {
    return await this.request<APIResponse<CreditPool[]>>("billing/pools/");
  }
}

export interface APIResponse<Data> {
  success: boolean;
  error: string;
  data: Data;
}

export interface Account {
  name: string;
  email: string;
  verified: boolean;
  credits: number;
}

export interface Server {
  id: string;
  name: string;
  address: string;
  motd: string;
  status: number;
  host: null;
  port: null;
  players: Players;
  software: Software;
  shared: boolean;
}

export interface Players {
  max: number;
  count: number;
  list: unknown[];
}

export interface Software {
  id: string;
  name: string;
  version: string;
}

export interface CreditPool {
  id: string;
  name: string;
  credits: number;
  servers: number;
  owner: string;
  isOwner: boolean;
  members: number;
  ownShare: number;
  ownCredits: number;
}
