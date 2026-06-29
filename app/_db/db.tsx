import crypto from "crypto";
import { UserInfo, Pedido } from "./dbtypes"

// Prototipo do database, usando LocalStorage

export class Database {

  private db = {
    identifier: "4887705",
    users: new Map<string, UserInfo> ([]),
  };

  saveDB() {
    const serializable = {
      identifier: this.db.identifier,
      users: Array.from(this.db.users.entries()), 
    };
    localStorage.setItem("db", JSON.stringify(serializable));
  }

  loadDB() {
    const raw = localStorage.getItem("db");
    if (!raw) return -1;

    const parsed = JSON.parse(raw) as {
      identifier: string;
      users: [string, UserInfo][];
    };

    if (parsed.identifier != "4887705") { // Identifica se realmente é uma DB criada por esse website
      return -1;
    }
    
    if (Object.keys(parsed.users).length === 0) {
      return -1;
    }

    this.db = {
      identifier: parsed.identifier,
      users: new Map<string, UserInfo>(parsed.users), 
    };

    return 0;
  }

  // Carrega database se ela ja tiver sido salva
  constructor() {
    let value = this.loadDB();

    if (value == -1)
    {
      this.saveDB();
      return;
    }
  }

  public getUser(session: string) {
    return this.db.users.get(session);
  }

  public getSession(email: string, password: string) {
    if (this.db.users.has(email)) {
      if (this.db.users.get(email).password == password) {
        return email;
      }
    } 
    return -1;
  }

  public createUser(email: string, info: UserInfo) {
    this.db.users.set(email, info);

    this.saveDB();

    return 0;
  }

  public addPedido(session: string, pedido: Pedido) {
    this.db.users.get(session).pedidos[pedido.id] = pedido;

    this.saveDB();
  }

  public getPedidos(session: string) {
    return this.db.users.get(session).pedidos;
  }

  public setStars(session: string, stars: number) {
    if (stars > 500)
      stars = 500;

    this.db.users.get(session).stars = stars;
    this.saveDB();
  }

  public getStars(session: string) {
    var stars = this.db.users.get(session).stars;

    if (stars == null) {
      stars = 0;
    }

    return stars;
  }
}
