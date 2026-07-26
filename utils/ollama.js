const OLLAMA_URL = "http://localhost:11434/api/generate";

async function generate(prompt, model = "qwen2.5-coder:7b") {
    const res = await fetch(OLLAMA_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            model,
            prompt,
            stream: false,
        }),
    });

    if (!res.ok) {
        throw new Error(`Ollama error: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();
    return data.response;
}

module.exports = { generate };
