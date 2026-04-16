# Pro Fix Collision Landing Page

React landing page for collision repair and concierge services, inspired by the provided references.

## Local development

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start dev server:

   ```bash
   npm run dev
   ```

## Build

```bash
npm run build
```

The output is generated in `dist/`.

## Lead form backend

- `send.php` receives form submissions and sends an email lead notification.
- Update the `$to` address in `send.php` to your preferred inbox.
- Ensure your hosting server supports PHP `mail()` or replace with SMTP/API logic.

## Thank-you page and GTM trigger

- The form redirects to `thank-you.html` after successful submission.
- `thank-you.html` is rendered by React and pushes this event:
  - `event: "lead_form_submitted"`
  - `page_type: "thank_you"`
  - `form_name: "collision_concierge_lead_form"`

In Google Tag Manager, create a Custom Event trigger using `lead_form_submitted`.
