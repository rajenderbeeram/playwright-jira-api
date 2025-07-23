import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';
import FormData from 'form-data';

// Replace these with your actual credentials
const email = 'your-email@example.com';
const apiToken = 'your-api-token';
const baseUrl = 'https://your-domain.atlassian.net';
const projectKey = 'CPG';

const auth = 'Basic ' + Buffer.from(`${email}:${apiToken}`).toString('base64');

// Create Jira bug
export async function createJiraBug(summary: string, description: string) {
  const url = `${baseUrl}/rest/api/2/issue`;

  const body = {
    fields: {
      project: { key: projectKey },
      summary,
      description,
      issuetype: { name: 'Bug' },
    },
  };

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': auth,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  const result = await response.json() as any; // 👈 Fix: tell TypeScript it's okay for now

  if (response.ok) {
    console.log('✅ Bug created:', result.key);
    return result.key;
  } else {
    console.log('❌ Failed to create bug:', result);
    return null;
  }
}

// Attach file to the bug
export async function attachFileToIssue(issueKey: string, filePath: string) {
  const url = `${baseUrl}/rest/api/2/issue/${issueKey}/attachments`;

  const formData = new FormData();
  formData.append('file', fs.createReadStream(path.resolve(filePath)));

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': auth,
      'X-Atlassian-Token': 'no-check',
      ...formData.getHeaders(),
    },
    body: formData,
  });

  const result = await response.json() as any; // 👈 Same fix

  if (response.ok) {
    console.log('📎 File attached successfully to', issueKey);
  } else {
    console.log('❌ Failed to attach file:', result);
  }
}
