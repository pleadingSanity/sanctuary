import { createServerFn } from "@tanstack/react-start";

const SYSTEM = `You are Arron, the companion on Pleading Sanity, kept by Shane Cooper in Leicester, England.

You are not a therapist, doctor, counsellor, or crisis service. Say so if someone treats you as one. Speak like a steady person: short, plain, warm. No slogans, no hashtags, no emoji, no corporate tone. Do not pretend to be Shane.

Facts you may state, and must not expand:
- Private A. L. Cooper, Royal Army Ordnance Corps, was Mentioned in Despatches.
- Supplement to the London Gazette, 29 November 1945, issue 37368, page 5825.
- The printed line is: 257735 pte. A. L. Cooper.
- The notice, dated War Office, 29 November 1945, says the King approved that the listed names be mentioned for gallant and distinguished services in the field.
- The Royal Army Ordnance Corps list begins on page 5824 and his name is on page 5825, before the next corps.
- You do not know his battles, theatres, hometown, age, or daily work. If asked, say that is not in the record and you will not guess.

If the person may be in immediate danger, or speaks of suicide, self-harm, or harming someone else: put the crisis lines first. Samaritans 116 123. Text SHOUT to 85258. Call 999 if they are in immediate danger in the UK. Do not give methods. Do not analyse them clinically. Stay with them only after the lines are clear.

Keep replies under 120 words. If you do not know, say so.`;

type Turn = { role: "user" | "assistant"; content: string };

function parseTurns(input: unknown): Turn[] {
  if (!input || typeof input !== "object") throw new Error("Bad request");
  const messages = (input as { messages?: unknown }).messages;
  if (!Array.isArray(messages) || messages.length < 1 || messages.length > 16) {
    throw new Error("Send between 1 and 16 messages.");
  }
  return messages.map((message) => {
    if (!message || typeof message !== "object") throw new Error("Bad message");
    const role = (message as { role?: unknown }).role;
    const content = (message as { content?: unknown }).content;
    if (role !== "user" && role !== "assistant") throw new Error("Bad role");
    if (typeof content !== "string") throw new Error("Bad message");
    const trimmed = content.trim();
    if (!trimmed || trimmed.length > 2000) {
      throw new Error("Each message must be 1–2000 characters.");
    }
    return { role, content: trimmed };
  });
}

export const askArron = createServerFn({ method: "POST" })
  .validator((input: unknown) => ({ messages: parseTurns(input) }))
  .handler(async ({ data }) => {
    const apiKey = process.env.XAI_API_KEY;
    if (!apiKey) {
      return {
        ok: false as const,
        error: "Arron cannot reach Grok from here right now.",
      };
    }

    let response: Response;
    try {
      response = await fetch("https://api.x.ai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "grok-4.5",
          max_tokens: 220,
          temperature: 0.5,
          messages: [{ role: "system", content: SYSTEM }, ...data.messages],
        }),
      });
    } catch {
      return {
        ok: false as const,
        error: "The line to Grok failed before a reply came back.",
      };
    }

    if (!response.ok) {
      return {
        ok: false as const,
        error: `Grok did not answer (${response.status}).`,
      };
    }

    const body = (await response.json()) as {
      choices?: { message?: { content?: string } }[];
    };
    const text = body.choices?.[0]?.message?.content?.trim() ?? "";
    if (!text) {
      return { ok: false as const, error: "Grok returned an empty reply." };
    }
    return { ok: true as const, text };
  });
