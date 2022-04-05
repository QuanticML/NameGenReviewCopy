import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  const completion = await openai.createCompletion("text-davinci-002", {
    prompt: generatePrompt(req.body.prompt),
    temperature: 0.6,
  });
  res.status(200).json({ result: completion.data.choices[0].text });
}

function generatePrompt(prompt) {
  const capitalizedPrompt =
    prompt[0].toUpperCase() + prompt.slice(1).toLowerCase();
  return `Suggest three names for the company, based on its description.

Description: A computer chip manufacturer
Names: Chips Ahoy, Semisweet Semiconductors, Sweet CPUs
Description: Gardening supply ecommerce store
Company names: D'Vines, Miraculous Marigolds, Hoes and Hoses
Description: A subscription-based video game rental service
Company names: Playcation, Weekend Metaverse, Joyful Joysticks
Description: ${capitalizedPrompt}
Company names:`;
}
