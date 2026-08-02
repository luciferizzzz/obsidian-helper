const { getConfig } = require("./config");

const TIMEOUT = 300000;
const DEFAULT_OLLAMA_URL = "http://127.0.0.1:11434";
const DEFAULT_OLLAMA_MODEL = "qwen2.5-coder:7b";
const DEFAULT_OPENAI_BASE = "https://api.openai.com/v1";
const DEFAULT_OPENAI_MODEL = "gpt-4o-mini";

function stripTrailingSlash(url) {
    return url.replace(/\/+$/, "");
}

function getProvider() {
    const cfg = getConfig();
    const ai = (cfg && cfg.ai) || {};
    return {
        provider: (ai.provider || "ollama").toLowerCase(),
        ollama: ai.ollama || {},
        openai: ai.openai || {},
    };
}

async function generateOllama(prompt, options) {
    const base = stripTrailingSlash(options.url || DEFAULT_OLLAMA_URL);
    const model = options.model || DEFAULT_OLLAMA_MODEL;

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), TIMEOUT);

    try {
        const res = await fetch(`${base}/api/generate`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                model,
                prompt,
                stream: true,
            }),
            signal: controller.signal,
        });

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
        if (err.name === "AbortError") {
            throw new Error("Ollama timeout - respons terlalu lambat (5 menit)");
        }
        if (err.message.startsWith("Ollama error")) {
            throw err;
        }
        const cause = err.cause?.message || err.message;
        throw new Error(`Gagal connect ke Ollama: ${cause}`);
    } finally {
        clearTimeout(timeout);
    }
}

async function generateOpenAI(prompt, options) {
    const base = stripTrailingSlash(options.baseUrl || DEFAULT_OPENAI_BASE);
    const model = options.model || DEFAULT_OPENAI_MODEL;
    const apiKey = options.apiKey || process.env.OPENAI_API_KEY;

    if (!apiKey) {
        throw new Error(
            "Belum ada API key. Jalankan `obs config ai` buat masukin token."
        );
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), TIMEOUT);

    try {
        const res = await fetch(`${base}/chat/completions`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                model,
                messages: [{ role: "user", content: prompt }],
                stream: true,
            }),
            signal: controller.signal,
        });

        if (!res.ok) {
            let detail = "";
            try {
                detail = (await res.text()).slice(0, 300);
            } catch {
                // ignore body read failure
            }
            throw new Error(
                `API error: ${res.status} ${res.statusText} ${detail}`.trim()
            );
        }

        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let result = "";
        let buffer = "";

        while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split("\n");
            buffer = lines.pop();

            for (const line of lines) {
                const trimmed = line.trim();
                if (!trimmed.startsWith("data:")) continue;

                const payload = trimmed.slice(5).trim();
                if (!payload || payload === "[DONE]") continue;

                try {
                    const json = JSON.parse(payload);
                    const delta = json.choices?.[0]?.delta?.content;
                    if (delta) {
                        result += delta;
                    }
                } catch {
                    // skip malformed events
                }
            }
        }

        return result;
    } catch (err) {
        if (err.name === "AbortError") {
            throw new Error("API timeout - respons terlalu lambat (5 menit)");
        }
        if (err.message.startsWith("API error")) {
            throw err;
        }
        const cause = err.cause?.message || err.message;
        throw new Error(`Gagal connect ke API: ${cause}`);
    } finally {
        clearTimeout(timeout);
    }
}

async function generate(prompt) {
    const { provider, ollama, openai } = getProvider();

    if (provider === "openai") {
        return generateOpenAI(prompt, openai);
    }
    if (provider === "ollama") {
        return generateOllama(prompt, ollama);
    }
    throw new Error(`Provider AI tidak dikenal: ${provider}`);
}

module.exports = { generate, getProvider };
