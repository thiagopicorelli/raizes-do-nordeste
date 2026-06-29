'use client';

import { UserInfo, Pedido } from "./dbtypes"
import { Database } from "./db"

export class DB_Access {
  db;

  constructor() {
    this.db = new Database();
  }

  public getUser(session: string) {
    return this.db.getUser(session);
  }

  public createUser(email: string, info: UserInfo) {
    return this.db.createUser(email, info);
  }

  public addPedido(session: string, pedido: Pedido) {
    this.db.addPedido(session, pedido);
  }

  public getPedidos(session: string) {
    return this.db.getPedidos(session);
  }

  public getSession(email: string, password: string) {
    return this.db.getSession(email, password);
  }

  public getStars(session: string) {
    return this.db.getStars(session);
  }

  public setStars(session: string, stars: number) {
    this.db.setStars(session, stars);
  }
}