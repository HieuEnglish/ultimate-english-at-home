/* assets/js/contact-config.js
   Google Forms configuration for the /contact page.

   Your form (base URL):
   - https://docs.google.com/forms/d/e/1FAIpQLSdPI4D3ctNZTcGZHqGGWkjBOiEgpN5R8WWd6ON4fml-PifvMw/viewform

   Optional (recommended): enable auto-fill by adding entry IDs.
   How to get entry IDs:
   1) Open the form in edit mode
   2) ⋮ (More) → Get pre-filled link
   3) Fill sample answers → Get link
   4) Copy the "entry.123456" keys from the generated URL into the mapping below.

   Notes:
   - Entry IDs are not secrets; they just allow pre-filling fields.
   - Leaving entry IDs blank will still open the form normally.
*/

(function () {
  'use strict';

  window.UEAH_CONTACT_FORM = {
    // Keep this as the base ".../viewform" URL (no querystring).
    formUrl:
      'https://docs.google.com/forms/d/e/1FAIpQLSdPI4D3ctNZTcGZHqGGWkjBOiEgpN5R8WWd6ON4fml-PifvMw/viewform',

    // Optional: map your questions to Google Forms entry IDs.
    // Example: category: 'entry.123456789'
    entry: {
      category: '',
      name: '',
      subject: '',
      message: '',
      pageUrl: '',
      userAgent: '',
    },
  };
})();
