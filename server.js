const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");
const cors = require("cors"); // Importer le middleware cors

const app = express();
const PORT = 3000;

// Utiliser le middleware cors
app.use(cors());

// Middleware pour parser le JSON
app.use(bodyParser.json());

// Charger les intents
const loadIntents = () => {
  const filePath = path.join(__dirname, "intents.json");
  try {
    const data = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Erreur de chargement des intentions:", error);
    return null;
  }
};

// Fonction pour obtenir une réponse basée sur les intents
const getResponse = (intents, userInput) => {
  for (const intent of intents.intents) {
    for (const pattern of intent.patterns) {
      const regex = new RegExp(pattern, "i"); 
      if (regex.test(userInput)) {
        const response = intent.responses[Math.floor(Math.random() * intent.responses.length)];
        return response;
      }
    }
  }
  return "Desolé, je ne comprends pas votre question. Pouvez-vous reformuler? Consultez notre FAQ pour plus d'informations.";
};

// Route pour gérer les requêtes de chat
app.post("/chat", (req, res) => {
  const userInput = req.body.message;
  const intents = loadIntents();
  const response = getResponse(intents, userInput);
  res.json({ response });
});

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
