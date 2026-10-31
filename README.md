# Playwright 102 Assignment

An independent JavaScript + Playwright implementation of the three Selenium Playground scenarios. The project uses Page Object Model (POM), separate spec files, and external test data to keep tests readable and maintainable.

## Assignment scenarios

| Scenario | Test coverage | Spec |
|---|---|---|
| Simple Form Demo | Enter a message and verify the echoed output | `tests/simple-form.spec.js` |
| Drag and Drop Range Slider | Change the slider from 15 to 95 and verify the displayed value | `tests/slider.spec.js` |
| Input Form Submit | Verify empty-form required validation, complete all fields, select United States, submit and verify success | `tests/input-form.spec.js` |

## Project structure

```text
.
├── pages/
│   ├── base.page.js
│   ├── simple-form.page.js
│   ├── sliders.page.js
│   └── input-form.page.js
├── test-data/
│   └── input-form.data.js
├── tests/
│   ├── simple-form.spec.js
│   ├── slider.spec.js
│   └── input-form.spec.js
├── .github/workflows/
├── playwright.config.js
├── hyperexecute.yaml
├── package.json
└── README.md
```

## Prerequisites

- Node.js 20+
- npm

## Install and run locally

```bash
npm install
npx playwright install chromium
npm test
```

Run an individual scenario:

```bash
npm run test:simple-form
npm run test:slider
npm run test:input-form
```

Run with a visible browser and open the HTML report:

```bash
npm run test:headed
npm run test:report
```

## Configuration

The default base URL is `https://www.lambdatest.com/selenium-playground`. Override it without changing test code:

```bash
BASE_URL=https://www.testmuai.com/selenium-playground/ npm test
```

On Windows PowerShell:

```powershell
$env:BASE_URL="https://www.lambdatest.com/selenium-playground"
npm test
```

## Reports and debugging artifacts

- HTML report: `playwright-report/`
- JUnit report: `test-results/junit.xml`
- Screenshots, videos and traces: retained on test failure under `test-results/`

## HyperExecute

The root-level `hyperexecute.yaml` is the configuration entry point. Add credentials only through HyperExecute Secrets; never commit real usernames or access keys. Validate the YAML with the HyperExecute CLI before starting a cloud job. The runner VM and the remote browser/OS under test are separate concepts: a Linux HyperExecute runner alone does not demonstrate Windows browser coverage.

## Design decisions

- Test cases describe business scenarios; page classes own locators and browser actions.
- Form values live in `test-data/input-form.data.js`, separate from the test.
- Assertions use Playwright's retrying locator assertions.
- The slider uses browser input/change events to set the range value and then verifies both the input value and displayed value.
- The test data is fictional and should not contain real personal information.

## Execution status

A GitHub commit confirms that files were saved to the repository. It does not mean that tests have passed. Record actual local, GitHub Actions, and HyperExecute results only after those runs complete.
