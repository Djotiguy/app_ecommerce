import { sql } from "../db.js";

// Function qui récupère toutes les commande validées
export async function getOrders(_, res) {
  try {
    const orders = await sql("SELECT * FROM commande");
    return res.status(200).json({ data: orders });
  } catch (error) {
    return res.status(400).send({ error: "Bad request" });
  }
}

// Function récupère une commande par son id
export async function getAnOrder(req, res) {
  try {
    const orderId = req.params.id;
    const order = await sql(`SELECT * FROM commande WHERE id = ${orderId}`);
    if (order.length === 0) {
      return res.status(400).json({ error: "Order not found" });
    }

    console.log("order loaded");
    return res.status(200).json(order[0]);
  } catch (error) {
    return res.status(500).json({ error: "Error Server" });
  }
}

// function qui ajoute une commande
export async function addOrder(req, res) {
  try {
    const price = req.body.price;
    const status = "validate"; 
    const userId = 1;

   const query = `INSERT INTO commande (user_id, status, total_price) VALUES ('${userId}','${status}', ${price}) RETURNING *`
        
    const order = await sql(query, [userId, status, price]);

    console.log('Order validated');
    return res.status(200).json(order);
  } catch (error) {
    console.log(error);
    return res.status(400).json("Bad request");
  }
}
