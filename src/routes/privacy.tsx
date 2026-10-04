import { createFileRoute } from "@tanstack/react-router";
import { Page } from "@/components/shell";

export const Route = createFileRoute("/privacy")({ component: PrivacyPage });

function PrivacyPage() {
  return (
    <Page
      kicker="Plain English"
      title="Privacy"
      lede="This sanctuary does not have accounts, adverts, or a file on you. Here is the whole of it."
    >
      <p>
        The journal, the Sanity Feed, the name you type, and the chat with Arron
        are stored in this browser, on this device. Shane cannot open them. A new
        phone does not have them. Clearing the browser, or using Forget Me, removes
        them here.
      </p>
      <p>
        When you press Send, that message — and a short run of the chat so Arron
        can follow you — is sent to xAI so Grok can write a reply. The reply comes
        back to this page. This sanctuary does not save that exchange on a server
        of its own.
      </p>
      <p>
        Nothing here is sold. Nothing is used to build an advert. There is no
        tracker planted by this sanctuary for a profile of you.
      </p>
      <p>
        Calls and texts to Samaritans, SHOUT, or 999 do not pass through this
        site. Those are between you and that service.
      </p>
      <p>
        Forget Me is the delete. It is on its own page, and it really clears this
        device. Read “What we keep” if you want the list without the principle.
      </p>
    </Page>
  );
}
