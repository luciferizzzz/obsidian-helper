const OLLAMA_URL = "http://127.0.0.1:11434/api/generate";

async function generate(prompt, model = "qwen2.5-coder:7b") {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 300000);

    try {
        const res = await fetch(OLLAMA_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                model,
                prompt,
                stream: true,
            }),
            signal: controller.signal,
        });

        clearTimeout(timeout);

        if (!res.ok) {
            throw new Error(`Ollama error: ${res.status} ${res.statusText}`);
        }

        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let result = "";

        while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            const chunk = decoder.decode(value, { stream: true });
            const lines = chunk.split("\n").filter((l) => l.trim());

            for (const line of lines) {
                try {
                    const json = JSON.parse(line);
                    if (json.response) {
                        result += json.response;
                    }
                } catch {
                    // skip malformed lines
                }
            }
        }

        return result;
    } catch (err) {
        clearTimeout(timeout);
        if (err.name === "AbortError") {
            throw new Error("Ollama timeout - response terlalu lambat (5 menit)");
        }
        const cause = err.cause?.message || err.message;
        throw new Error(`Gagal connect ke Ollama: ${cause}`);
    }
}

module.exports = { generate };
