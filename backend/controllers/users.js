import bcrypt from 'bcrypt';
import { getClient } from '../db.js';
import {faker} from '@faker-js/faker';


export async function loadFakeUser(req, res) {
    try {
        const saltRounds = 10;
        const { username, password } = req.body; 

        const hash = await bcrypt.hash(password, saltRounds);
        const avatar = faker.internet.avatar();
        const client = await getClient(); // Récupération du client de la base de données
        await client.connect();

        await client.query(
            'INSERT INTO public.users (username, password, avatar) VALUES ($1, $2, $3)',
            [username, hash, avatar]
        );

        await client.end(); // Fermeture de la connexion à la base de données

        res.status(200).json(`User ${username} added successfully!`);
    } catch (error) {
        res.status(500).json({ error: error.message || 'Internal Server Error' });
    }
}


export async function loginUser(req, res) {
    
}
