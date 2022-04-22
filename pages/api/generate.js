import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  const completion = await openai.createCompletion("text-davinci-002", {
    prompt: generatePrompt(req.body.prompt, req.body.type, req.body.isGuided),
    temperature: req.body.temp / 10,
    max_tokens: 300
  });
  res.status(200).json({ result: completion.data.choices[0].text, tempResult: req.body.temp / 10});
}
function generatePrompt(prompt, type, isGuided) {
  let compiledPrompt = ""
isGuided ? type === "company" ?
  compiledPrompt = `Given a description of a company, write three funny names for it that includes a pun.


Description: tandem bicycle company
Name: Tandemonium, Two's Company Bicycles, TwoGather Bikes
Description: medieval-themed festival for older adults
Name: Middle Aged Faire, Ye Olde Folke Fest, Seniors Knight Out
Description: app that allows private pool owners to rent their pools
Name: Splash and Dash, Aqua-Hire, AirBnBath
Description: thrift store for dogs
Name: Wags to Riches, Secondhand Hounds, Ruff Stuff
Description: ${prompt}
Name:` : type === "scenario" ?   compiledPrompt = `Below are the zany scenarios of a series of educational lessons, paired with their subject matter. In each example, the subject matter is paired with a fun, wacky scenario that students find entertaining.

Subject matter: logistic regression
Scenario: You're Clayton, a mushroom forager and founder of a foraged mushroom delivery service. You're looking to develop a machine learning model that can predict whether or not a mushroom is poisonous.
Subject matter: mergers and acquisitions
Scenario: You're Tabletop Games, a Dungeons and Dragons style RPG company looking to acquire smaller tabletop designers, Orcs R Us. In the process of offering and buying this company, you'll learn the basics of mergers and acquisitions.
 Subject matter: ${prompt}
 Scenario:` : "" : ""

  return compiledPrompt
}
