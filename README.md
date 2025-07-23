# Playwright JIRA API Automation

This project demonstrates API automation using **Playwright**, **TypeScript**, and **JIRA REST API**. It showcases how to automate the creation of a JIRA bug and attach a file using JIRA Cloud API with secure authentication.

---

## ✅ Features

- 🔐 Uses Atlassian JIRA REST API with API Token-based Auth
- 📎 Automates Bug Creation in JIRA
- 📁 Uploads & Attaches File to JIRA Ticket
- 🔧 Built using Playwright Test Runner (API testing only)
- 🌱 TypeScript + Environment Variables for security
- 📄 Easy-to-use modular structure

---

## 📁 Project Structure

```
e2e/
  └── jira/
      ├── jira.api.ts            # API functions (create issue, upload file)
      ├── jira.test.ts           # Test file triggering the flow
      └── jira.config.ts         # Environment-based configuration

.env                             # (Not committed) Holds the secure API token
```

---

## 🚀 How to Run

### 1. Clone the Repo

```bash
git clone https://github.com/rajenderbeeram/playwright-jira-api.git
cd playwright-jira-api
npm install
```

### 2. Set Your Env Variables

Create a `.env` file in the root:

```env
JIRA_BASE_URL=https://your-domain.atlassian.net
JIRA_USERNAME=your-email@example.com
JIRA_API_TOKEN=your-api-token
JIRA_PROJECT_KEY=TEST
```

> ⚠️ Never commit this file to GitHub.

### 3. Run the Test

```bash
npx playwright test
```

---

## 📸 Sample Output

- ✅ Issue created in JIRA
- 📎 File attached to the issue

---

## 🔐 Security

Secrets are handled using environment variables and excluded via `.gitignore`. GitHub Push Protection ensures no secrets are exposed.

---

## 📌 Author

**Rajender Beeram**

---

## 📢 Contributions & Feedback Welcome!

If this helped you, give it a ⭐ on GitHub and feel free to fork or contribute.
