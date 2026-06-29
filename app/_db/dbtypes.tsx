export type LoginInfo = {
  email: string;
  password: string;
};

export type ConsentRecord = {
  consentTerms: boolean,
  consentMarketing: boolean,
  policyVersion: "1.0",
  timestamp: string,
};

export type Compra = {
  id: string,  
  name: string,    
  qty: number;                   
  price: number, 
  unidade: string,
}

export type OrderStatus = "entregue" | "em trânsito" | "processando" | "cancelado";

export type Pedido = {
  id: string;
  date: string;
  estimatedDelivery: string;
  address: string;
  price: number;
  status: string;
  unidade: string;
  compras: Compra[];
}

export type UserInfo = {
  name: string;
  email: string;
  password: string;
  phone: string;
  stars: number;
  consent_record: ConsentRecord;
  accept_emails: boolean;
  pedidos: Record<string, Pedido>;
};