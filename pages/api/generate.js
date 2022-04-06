import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  const completion = await openai.createCompletion("text-davinci-002", {
    prompt: generatePrompt(req.body.prompt),
    temperature: req.body.temp / 10,
  });
  res.status(200).json({ result: completion.data.choices[0].text, tempResult: req.body.temp / 10});
}
function generatePrompt(prompt) {  return `Given a description of a company, write a name for it that includes a pun. Names should be no more than 3 words long.

description: vehicle rental company
company name: RV There Yet
description: online store for dog toys
company name: Don’t Stop Retrievin’
description: music streaming company
company name: TrebleMaker
description: hyperspeed 3D printing company
company name: 3D Sprinter
description: pedestrian exploration company
company name: PedEx
description: small Eastern European airline
company name: Flygoslavia
description: app that allows private pool owners to rent their pools
company name: Splash and Dash
description: robot-powered lawn mower company
company name: Blade Runners
description: ${prompt}
company name:`;
}
