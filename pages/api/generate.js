import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  const completion = await openai.createCompletion("text-davinci-002", {
    prompt: generatePrompt(req.body.prompt),
    temperature: req.body.temp / 10,
    max_tokens: 300
  });
  res.status(200).json({ result: completion.data.choices[0].text, tempResult: req.body.temp / 10});
}
function generatePrompt(prompt) {  return `Given a description of a company, write a name for it that includes a pun.


Description: tandem bicycle company
Name: Tandemonium, Two's Company Bicycles, TwoGather Bikes
Description: medieval-themed festival for older adults
Name: Middle Aged Faire, Ye Olde Folke Fest, Seniors Knight Out
Description: manufacturer of boomerangs for space
Name: SpaceBOOM, Return to Sender, Moon-a-rang
Description: small eastern european airline
Name: Flygoslavia, Taikoff Airlines, L'il Air
Description: app that allows private pool owners to rent their pools
Name: Splash and Dash, Aqua-Hire, AirBnBath
Description: pedestrian excursion company
Name: PedEx, Walkabout Adventures, Step in Time Tours
Description: robotic lawn mowing service
Name: MowBots, Robomow, LawnBots
Description: thrift store for dogs
Name: Wags to Riches, Secondhand Hounds, Ruff Stuff
Description: ${prompt}
Name:`;
}
