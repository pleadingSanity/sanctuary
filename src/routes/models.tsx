import { createFileRoute } from "@tanstack/react-router";
import { Page } from "@/components/shell";

export const Route = createFileRoute("/models")({ component: ModelsPage });

function ModelsPage() {
  return (
    <Page
      kicker="No pretend chain"
      title="What powers Arron"
      lede="One real model. If it cannot answer, Arron says so. He does not invent a reply from nowhere."
    >
      <p>
        Arron’s words are written by Grok, made by xAI. The model used is grok-4.5.
        You ask. He replies. That is the whole machine on this page.
      </p>
      <p>
        Other companies are not connected here. There is no silent handover to a
        second model dressed up as the first. If that ever changes, this page
        changes with it, in plain words, before it is switched on.
      </p>
      <p>
        Arron is instructed to stay a companion: short, human, and honest about
        the limit. He is told the Gazette facts about Private A. L. Cooper and
        told not to add a war story that was never published. He is told to put
        Samaritans 116 123 and SHOUT 85258 first if you may be in danger.
      </p>
      <p>
        He is not a therapist. A model does not become one because the sentences
        sound kind.
      </p>
    </Page>
  );
}
