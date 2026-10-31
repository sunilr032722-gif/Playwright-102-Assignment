# Playwright 102 Assignment

Playwright JavaScript automation for the Selenium Playground scenarios.

## Scenarios covered

1. **Simple Form Demo** - enter a message and verify the displayed output.
2. **Drag and Drop Range Sliders** - set the default slider from 15 to 95 and verify the value.
3. **Input Form Submit** - check required-field validation, complete the form, select United States, submit, and verify the success message.

## Prerequisites

- Node.js 20 or later
- npm
- Git

## Run locally

```bash
npm ci
npx playwright install chromium
npm test
```

Useful commands:

```bash
npm run test:headed
npm run test:report
```

The HTML report is written to `playwright-report/`. JUnit output, screenshots, traces, and videos are written under `test-results/` (screenshots, traces, and videos are retained on failure).

## GitHub Actions

The workflow at `.github/workflows/playwright.yml` runs on pushes to `main`, pull requests, and manual dispatch. Test artifacts are uploaded even if the test step fails.

## HyperExecute

The starter configuration is `.hyperexecute.yaml`.

1. Connect this GitHub repository in your HyperExecute account.
2. Add `LT_USERNAME` and `LT_ACCESS_KEY` as encrypted secrets in HyperExecute. Never commit actual credentials.
3. Validate the YAML against the current HyperExecute configuration supported by your account.
4. Configure the required browser/OS matrix in the HyperExecute dashboard or the supported YAML matrix syntax for your account.
5. Run the job and record the actual HyperExecute job/session IDs and results for submission.

The supplied YAML is a starter configuration; it does not by itself prove that a cloud run or cross-browser/OS matrix has completed.

## Assignment submission notes

- Share this private repository with `admin@testmuaicertifications.com` if that is required by the assignment instructions.
- Include real GitHub Actions and HyperExecute run links/IDs in your submission after those executions have completed.
- Do not report tests as passed until the test run has actually succeeded.
