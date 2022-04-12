import Head from "next/head";
import { useState } from "react";
import Layout from "../components/Layout";
export default function Home() {
  const [guidedPromptInput, setGuidedPromptInput] = useState("");
  const [rawPromptInput, setRawPromptInput] = useState("")
  const [tempInput, setTempInput] = useState("6");
  const [guidedResult, setGuidedResult] = useState();
  const [rawResult,setRawResult] = useState("")
  const [tempResult, setTempResult] = useState("0.6");
  const [promptType,setPromptType] = useState("company")
  const [isGuided, setIsGuided] = useState(false)

  async function onSubmit(event) {
    event.preventDefault();
    let promptInput;
    isGuided ? promptInput = guidedPromptInput : promptInput = rawPromptInput
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ temp: tempInput, isGuided: isGuided, prompt: promptInput, type: promptType}),
    });
    const data = await response.json();
    isGuided ? setGuidedResult(data.result) : setRawResult(data.result);
    setTempResult(data.tempResult);
  }

  return (
    <Layout>
      <Head>
        <title>Quantic Namegen</title>
        <link rel="icon" href="/q.png" />
      </Head>

      <main className="bg-bonegray  mx-auto flex-col min-h-screen max-w-container">
        <h3 className="mt-8 text-4xl leading-relaxed font-bold pt-8 text-eggplant text-center">
          GPT-3 Idea Helper
        </h3>
        <h3 className="text-2xl text-eggplant text-center pt-8 mb-12">
          I want help coming up with a ...
        </h3>
        {/* start of form */}
        <form className="flex flex-col self-center " onSubmit={onSubmit}>
          {/* radio selection */}
          <div className="pb-12 flex self-center">
            <div className="flex pr-4 items-center">
              <input
                className="px-3"
                type="radio"
                id="companyName"
                name="promptType"
                value="Company Name"
                defaultChecked
                onClick={()=>{setPromptType('company')}}
              />
              <label className="pl-2 text-xl" for="companyName">
                company name
              </label>
            </div>
            <div className="items-center flex">
              <input
                type="radio"
                id="scenario"
                name="promptType"
                className=""
                value="Scenario"
                onClick={()=>{setPromptType("scenario")}}
              />
              <label className="pl-2 text-xl" for="companyName">
                scenario idea
              </label>
            </div>
          </div>

          {/* writing input */}
          <textarea
            id="message"
            name="prompt"
            rows="5"
            className=" block p-4 text-lg w-[500px] h-[200px] self-center text-eggplant rounded-lg border border-green-300 focus:ring-green-500 focus:border-green-500 active:border-green-300 focus:outline-none"
            placeholder="Enter description of a company here."
            value={guidedPromptInput}
            onChange={(e) => setGuidedPromptInput(e.target.value)}
          ></textarea>

          <input
            className="text-xl leading-relaxed mx-auto mt-12 text-eggplant self-center"
            type="range"
            name="temp"
            id="temp"
            min="0"
            max="10"
            value={tempInput}
            onChange={(e) => setTempInput(e.target.value)}
          />
          <label className="pt-2 self-center" for="temp">Temperature: {tempInput / 10}</label>
          <details className="my-4 self-center">
            <summary>What's this?</summary>
            <p>
              "Temperature is a value between 0 and 1 that essentially lets you
              control how confident the model should be when making these
              predictions." Read more at{" "}
              <a href="https://beta.openai.com/docs/quickstart/adjust-your-settings">
                OpenAI
              </a>
              .
            </p>
          </details>
          {/* submit button */}
          <input
            className="py-3 text-lg font-semibold mt-6 bg-green-500 w-[200px] mx-auto text-white active:bg-green-700 hover:bg-green-600 rounded-xl text-center cursor-pointer"
            type="submit"
            onClick={()=>{setIsGuided(true)}}
            value="Generate names"
          />

        </form>
        <div className="text-2xl text-center font-semibold mt-16">{guidedResult}</div>
        {/* control panel */}
        <div className="text-eggplant mt-4">
<details className="flex flex-col max-w-2xl mx-auto text-center align-items">
  <summary className="self-center mb-8">Want to speak directly to GPT-3?</summary>
  <h3 className="text-2xl font-semibold pb-2">Write your own instructions</h3>

  <p className="py-4">
    The text below will be sent directly to GPT-3 as is. While the prompts above send a little extra message to GPT to make it easier to obtain good results, this gives you total control over the completion API. If you'd like to learn more about prompt engineering, <a className="underline text-blue-500" href="https://www.youtube.com/watch?v=2ltOaInDD-s">these</a> <a className="underline text-blue-500"href="https://www.youtube.com/watch?v=ffKXEvnaAZM">videos</a> are good places to start.
  </p>
  <form onSubmit={onSubmit}>
          <textarea
            id="message"
            name="prompt"
            rows="10"
            className="self-center mx-auto block p-4 text-lg w-[600px] h-[200px] text-eggplant rounded-lg border border-green-300 focus:ring-green-500 focus:border-green-500 active:border-green-300 focus:outline-none"
            placeholder="This text will be sent directly to GPT-3."
            value={rawPromptInput} //make this the new input
            onChange={(e) => setRawPromptInput(e.target.value)}
          ></textarea>

          <input
            className="py-3 text-lg font-semibold mt-6 bg-green-400 w-[200px] mx-auto text-white active:bg-green-700 hover:bg-green-600 rounded-xl text-center cursor-pointer"
            type="submit"
            value="Prompt GPT"
            onClick={()=>{setIsGuided(false)}}
          />
        <div className="text-2xl text-center font-semibold mt-16">{rawResult}</div>
</form>
    </details>
        </div>
      </main>
    </Layout>
  );
}
