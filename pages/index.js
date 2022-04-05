import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [promptInput, setPromptInput] = useState("");
  const [result, setResult] = useState();

  async function onSubmit(event) {
    event.preventDefault();
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt: promptInput }),
    });
    const data = await response.json();
    setResult(data.result);
    setPromptInput("");
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
            type="text"
            name="prompt"
            placeholder="Enter company name here."
            value={promptInput}
            onChange={(e) => setPromptInput(e.target.value)}
          />
          <input type="submit" value="Generate names" />
        </form>
        <p>Enter an imaginary company/business/institution you want a fun name for.</p>
        <div className={styles.result}>{result}</div>
      </main>
    </div>
  );
}
