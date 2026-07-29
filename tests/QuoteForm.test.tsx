import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { QuoteForm } from "@/components/QuoteForm";
import { site } from "@/lib/site";

const fetchMock = vi.fn();

beforeEach(() => {
  fetchMock.mockReset();
  vi.stubGlobal("fetch", fetchMock);
});

afterEach(() => vi.unstubAllGlobals());

const ok = () =>
  fetchMock.mockResolvedValue({
    ok: true,
    status: 200,
    json: async () => ({ ok: true }),
  });

async function fillMinimum(user: ReturnType<typeof userEvent.setup>) {
  await user.type(screen.getByLabelText(/^Name/), "Thomas");
  await user.type(screen.getByLabelText(/^Phone/), "4079274434");
}

describe("QuoteForm", () => {
  it("blocks submission and lists the problems when the form is empty", async () => {
    const user = userEvent.setup();
    render(<QuoteForm />);

    await user.click(screen.getByRole("button", { name: /request a walkthrough/i }));

    expect(fetchMock).not.toHaveBeenCalled();
    const alert = await screen.findByRole("alert");
    expect(alert).toHaveTextContent(/please check/i);
    expect(alert).toHaveTextContent(/tell us your name/i);
    expect(alert).toHaveTextContent(/phone number or an email/i);
  });

  it("moves focus to the error summary, so the failure is announced", async () => {
    const user = userEvent.setup();
    render(<QuoteForm />);

    await user.click(screen.getByRole("button", { name: /request a walkthrough/i }));

    // Without this, a keyboard or screen-reader user is left where they
    // were with no idea the submit did nothing.
    await waitFor(() => expect(screen.getByRole("alert")).toHaveFocus());
  });

  it("clears a field's error as soon as the visitor starts fixing it", async () => {
    const user = userEvent.setup();
    render(<QuoteForm />);

    await user.click(screen.getByRole("button", { name: /request a walkthrough/i }));
    expect(await screen.findByRole("alert")).toHaveTextContent(/tell us your name/i);

    await user.type(screen.getByLabelText(/^Name/), "T");
    await waitFor(() =>
      expect(screen.queryByText(/tell us your name/i)).not.toBeInTheDocument(),
    );
  });

  it("submits a valid request to the quote endpoint", async () => {
    ok();
    const user = userEvent.setup();
    render(<QuoteForm />);

    await fillMinimum(user);
    await user.click(screen.getByRole("button", { name: /request a walkthrough/i }));

    await waitFor(() => expect(fetchMock).toHaveBeenCalledOnce());
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe("/api/quote");
    expect(JSON.parse(init.body)).toMatchObject({
      name: "Thomas",
      phone: "4079274434",
    });
  });

  it("confirms receipt, and still offers the phone number", async () => {
    ok();
    const user = userEvent.setup();
    render(<QuoteForm />);

    await fillMinimum(user);
    await user.click(screen.getByRole("button", { name: /request a walkthrough/i }));

    const status = await screen.findByRole("status");
    expect(status).toHaveTextContent(/we've got it|we’ve got it/i);
    expect(screen.getByRole("link", { name: site.phoneDisplay })).toHaveAttribute(
      "href",
      site.phoneHref,
    );
  });

  it("surfaces server-side field errors", async () => {
    fetchMock.mockResolvedValue({
      ok: false,
      status: 422,
      json: async () => ({ errors: { name: "Server says no." } }),
    });
    const user = userEvent.setup();
    render(<QuoteForm />);

    await fillMinimum(user);
    await user.click(screen.getByRole("button", { name: /request a walkthrough/i }));

    expect(await screen.findByRole("alert")).toHaveTextContent("Server says no.");
  });

  /**
   * The worst outcome for a lead-generation form is telling the visitor it
   * worked when it did not — they stop chasing and nobody calls them back.
   */
  it("never claims success when delivery fails, and points at the phone", async () => {
    fetchMock.mockResolvedValue({
      ok: false,
      status: 503,
      json: async () => ({ error: "We couldn't send that just now." }),
    });
    const user = userEvent.setup();
    render(<QuoteForm />);

    await fillMinimum(user);
    await user.click(screen.getByRole("button", { name: /request a walkthrough/i }));

    expect(await screen.findByRole("alert")).toHaveTextContent(/couldn't send/i);
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
  });

  it("recovers from a network failure without losing the visitor", async () => {
    fetchMock.mockRejectedValue(new Error("offline"));
    const user = userEvent.setup();
    render(<QuoteForm />);

    await fillMinimum(user);
    await user.click(screen.getByRole("button", { name: /request a walkthrough/i }));

    expect(await screen.findByRole("alert")).toHaveTextContent(site.phoneDisplay);
  });

  it("accepts an email instead of a phone number", async () => {
    ok();
    const user = userEvent.setup();
    render(<QuoteForm />);

    await user.type(screen.getByLabelText(/^Name/), "Thomas");
    await user.type(screen.getByLabelText(/^Email/), "t@example.com");
    await user.click(screen.getByRole("button", { name: /request a walkthrough/i }));

    await waitFor(() => expect(fetchMock).toHaveBeenCalledOnce());
  });

  it("keeps scope chips as real inputs, so they are keyboard operable", async () => {
    const user = userEvent.setup();
    render(<QuoteForm />);

    const chip = screen.getByRole("checkbox", { name: "Cinema & media rooms" });
    expect(chip).not.toBeChecked();
    await user.click(chip);
    expect(chip).toBeChecked();
  });

  it("hides the honeypot from real users", () => {
    render(<QuoteForm />);
    const honeypot = screen.getByLabelText(/company \(leave blank\)/i, {
      selector: "input",
    });
    // Present in the DOM for bots, out of the tab order for everyone else.
    expect(honeypot).toHaveAttribute("tabindex", "-1");
    expect(honeypot.closest("[aria-hidden='true']")).not.toBeNull();
  });
});
