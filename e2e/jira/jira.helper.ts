import fs from 'fs';
import path from 'path';
import fetch from 'node-fetch';
import FormData from 'form-data';
import { jiraConfig } from './jira.config';

// Basic Auth header
const authHeader = 'Basic ' + Buffer.from(`${jiraConfig.email}:${jiraConfig.apiToken}`).toString('base64');

// 1. Create Jira bug
export async function createJiraBug(summary: string, description: string): Promise<string> {
  const response = await fetch(`${jiraConfig.baseUrl}/rest/api/2/issue`, {
    method: 'POST',
    headers: {
      'Authorization': authHeader,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      fields: {
        project: { key: jiraConfig.projectKey },
        summary,
        description,
        issuetype: { name: 'Bug' },
      },
    }),
  });

  const data = await response.json() as any;

  if (!response.ok) {
    throw new Error(`❌ Jira issue creation failed: ${JSON.stringify(data)}`);
  }

  console.log(`✅ Bug created with key: ${data.key}`);
  return data.key;
}

export async function addCommenttoJIRA(issueKey: string ,comment: string): Promise<void> {
const response = await fetch(`${jiraConfig.baseUrl}/rest/api/2/issue/${issueKey}/comment`,{
  method: 'POST',
  headers:{
    'Authorization': authHeader,
    'Content-Type': 'application/json',
  },
  body:JSON.stringify({
  body: comment,
  }),
});

const data = await response.json() as any;
if(!response.ok){
  throw new Error(`Failed to add comment: ${JSON.stringify(data)}`);
}

  console.log('Comment added successfully.');

  
}
// 2. Attach file to bug
export async function attachFileToIssue(issueKey: string, filePath: string): Promise<void> {
  const form = new FormData();
  form.append('file', fs.createReadStream(path.resolve(filePath)));

  const response = await fetch(`${jiraConfig.baseUrl}/rest/api/2/issue/${issueKey}/attachments`, {
    method: 'POST',
    headers: {
      'Authorization': authHeader,
      'X-Atlassian-Token': 'no-check',
      // Don't set Content-Type manually for form-data
    },
    body: form,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(`❌ File attachment failed: ${JSON.stringify(data)}`);
  }

  console.log('📎 File attached successfully.');
}
