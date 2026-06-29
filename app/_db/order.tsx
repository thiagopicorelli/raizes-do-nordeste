export type OrderStatus = "entregue" | "em trânsito" | "processando" | "cancelado";

export interface OrderItem {
  name: string;
  qty: number;
  price: number;
}

export interface Order {
  id: string;
  date: string;
  status: OrderStatus;
  unidade: string;
  total: number;
  items: OrderItem[];
  estimatedDelivery?: string;
}