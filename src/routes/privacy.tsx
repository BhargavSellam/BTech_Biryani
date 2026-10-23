import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — B.TECH Biryani, Ambajipeta" },
      { name: "description", content: "How BTech Biryani handles enquiry details shared through its website." },
      { property: "og:title", content: "Privacy Policy — B.TECH Biryani" },
      { property: "og:description", content: "How BTech Biryani handles your enquiry details." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Privacy,
});

function Privacy() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-16">
      <h1 className="text-4xl font-bold">Privacy Policy</h1>
      <div className="mt-6 space-y-4 text-muted-foreground">
        <p>This website does not store the details you type into the enquiry form. Submitting it opens a text message on your own device, addressed to BTech Biryani, which you choose whether to send.</p>
        <p>Any details you send by phone or message are used only to respond to your enquiry or order.</p>
        <p>Questions? Call +91 73375 84872.</p>
      </div>
      <Link to="/" className="mt-8 inline-block font-semibold text-gold-deep underline">Back to home</Link>
    </main>
  );
}
