import { breadcrumbs } from '../common.js';

export function getView(ctx) {
  return {
    title: 'Privacy and data use — UEAH',
    description: 'How UEAH stores progress, uses the microphone, and opens external services.',
    html: `
      <section class="page-top legal-page">
        ${breadcrumbs([{ label: 'Home', href: ctx.hrefFor('/') }, { label: 'Privacy' }])}
        <h1 class="page-title">Privacy and data use</h1>
        <p class="page-subtitle">UEAH is designed to work without an account and stores learning progress on this device.</p>
        <div class="detail-card">
          <div class="detail-section"><h2>Information stored on this device</h2><p>Your profile, favourites, settings, and saved scores use browser local storage. They are not automatically uploaded to UEAH. Clearing browser data removes them. Use Profile export to make a backup.</p></div>
          <div class="detail-section"><h2>Microphone and speech recognition</h2><p>Speaking activities ask for permission before using your microphone. Recognition is provided by your browser or operating system and may use its speech service. You can deny permission and use non-speaking activities instead.</p></div>
          <div class="detail-section"><h2>Contact and external resources</h2><p>The contact page opens Google Forms in a new tab. Resource links open third-party websites with their own privacy practices. A parent or guardian should supervise external sites used by younger learners.</p></div>
          <div class="detail-section"><h2>Children and email</h2><p>No sign-up is required. Adding an email to the local profile is optional and does not create an account. Children should only enter personal information with permission from a parent or guardian.</p></div>
          <div class="detail-section"><h2>Practice scores</h2><p>Scores and IELTS-style feedback are educational practice estimates, not official test results or professional assessments.</p></div>
        </div>
      </section>`,
  };
}
