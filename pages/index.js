import Head from "next/head";
import { useState } from "react";
import Layout from "../components/Layout";
export default function Home() {
  const [guidedPromptInput, setGuidedPromptInput] = useState("");
  const [rawPromptInput, setRawPromptInput] = useState("");
  const [tempInput, setTempInput] = useState("6");
  const [guidedResult, setGuidedResult] = useState();
  const [rawResult, setRawResult] = useState("");
  const [tempResult, setTempResult] = useState("0.6");
  const [promptType, setPromptType] = useState("company");
  const [isGuided, setIsGuided] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  async function onSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    let promptInput;
    isGuided
      ? (promptInput = guidedPromptInput)
      : (promptInput = rawPromptInput);
    console.log("prompt input is", promptInput);
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        temp: tempInput,
        isGuided: isGuided,
        prompt: promptInput,
        type: promptType,
      }),
    });
    const data = await response.json();
    setIsLoading(false);
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
                onClick={() => {
                  setPromptType("company");
                }}
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
                onClick={() => {
                  setPromptType("scenario");
                }}
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
            placeholder={
              promptType === "company"
                ? `Enter description of a company here.`
                : promptType === "scenario"
                ? "Enter subject matter (i.e. 'quantum physics', 'warehouse optimization', 'network multicasting') here."
                : ""
            }
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
          <label className="pt-2 self-center" for="temp">
            Temperature: {tempInput / 10}
          </label>
          <details className="my-4 max-w-2xl mx-auto self-center">
            <summary className="text-center cursor-pointer pb-4">
              What's this?
            </summary>
            <p>
              "Temperature is a value between 0 and 1 that essentially lets you
              control how confident the model should be when making these
              predictions." Read more at{" "}
              <a
                className="underline text-blue-700"
                href="https://beta.openai.com/docs/quickstart/adjust-your-settings"
              >
                OpenAI
              </a>
              .
            </p>
          </details>
          {/* submit button */}
          <button
            className="py-3 text-lg font-semibold text-center self-center mt-6 bg-green-500 w-[200px] mx-auto text-white active:bg-green-700 hover:bg-green-600 rounded-xl text-center cursor-pointer"
            type="submit"
            onClick={() => {
              setIsGuided(true);
            }}
          >
            <div class="text-center self-center">
              {isLoading
                ? ""
                : promptType === "company"
                ? `Generate names`
                : promptType === "scenario"
                ? "Generate scenario"
                : ""}
              {isLoading ? (
                <div class="text-center">
                  <svg
                    role="status"
                    class="inline mr-2 w-8 h-8 text-green-300 animate-spin fill-green-600"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                </div>
              ) : (
                ""
              )}
            </div>
          </button>
        </form>
        <div
          className={`max-w-2xl mx-auto mb-12 text-center ${
            promptType === "company"
              ? " text-2xl font-semibold "
              : promptType === "scenario"
              ? "leading-relaxed text-xl"
              : ""
          } mt-16`}
        >
          {guidedResult}
        </div>
        {/* control panel */}
        <div className="text-eggplant mt-4">
          <details className="flex flex-col max-w-2xl mx-auto text-center align-items">
            <summary className="self-center mb-8">
              Want to speak directly to GPT-3?
            </summary>
            <h3 className="text-2xl font-semibold pb-2">
              Write your own instructions
            </h3>

            <p className="py-4">
              The text below will be sent directly to GPT-3 as is. While the
              prompts above send a little extra message to GPT to make it easier
              to obtain good results, this gives you total control over the
              completion API. If you'd like to learn more about prompt
              engineering,{" "}
              <a
                className="underline text-blue-500"
                href="https://www.youtube.com/watch?v=2ltOaInDD-s"
              >
                these
              </a>{" "}
              <a
                className="underline text-blue-500"
                href="https://www.youtube.com/watch?v=ffKXEvnaAZM"
              >
                videos
              </a>{" "}
              are good places to start.
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
                onClick={() => {
                  setIsGuided(false);
                }}
              />
              <div className="text-2xl text-center font-semibold mt-16">
                {rawResult}
              </div>
            </form>
          </details>
        </div>
      </main>
    </Layout>
  );
}
