import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [promptInput, setPromptInput] = useState("");
  const [tempInput, setTempInput] = useState("6");
  const [result, setResult] = useState();
  const [tempResult, setTempResult] = useState("0.6");

  async function onSubmit(event) {
    event.preventDefault();
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ temp: tempInput, prompt: promptInput }),
    });
    const data = await response.json();
    setResult(data.result);
    setTempResult(data.tempResult);
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Quantic Namegen</title>
        <link rel="icon" href="/q.png" />
      </Head>

      <main className={styles.main}>
        <img src="/q.png" className />
        <h3>Name Generator</h3>
        <form onSubmit={onSubmit}>
          <input
            type="range"
            name="temp"
            id="temp"
            min="0"
            max="10"
            value={tempInput}
            onChange={(e) => setTempInput(e.target.value)}
          />
          <label for="temp">Temperature</label>
          <details style={{ marginBottom: "2rem" }}>
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

          <input
            type="text"
            name="prompt"
            placeholder="Enter description of a company here."
            value={promptInput}
            onChange={(e) => setPromptInput(e.target.value)}
          />
          <input type="submit" value="Generate names" />
        </form>
        <div className={styles.result} style={{ fontSize: "18pt" }}>
          {result}
        </div>
        <div style={{ textColor: "grey", marginTop: "1rem" }}>
          <em>Temperature: {tempResult}</em>
        </div>
      </main>
    </div>
  );
}
