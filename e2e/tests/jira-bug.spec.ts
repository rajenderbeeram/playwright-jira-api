import { test } from '@playwright/test';
import { createJiraBug, attachFileToIssue,addCommenttoJIRA } from '../jira/jira.helper';

test('Create Jira Bug and attach file', async () => {
  const issueKey = await createJiraBug(
    'Bug via Playwright test',
    'Steps:\n1. Do something\n2. It fails\nExpected: Pass\nActual: Crash'
  );

  if (!issueKey) {
    throw new Error('❌ Failed to create Jira Bug');
  }

  await attachFileToIssue(issueKey, './e2e/test-data/bus.png');
  await addCommenttoJIRA('CPG-50','Testcomment added');
});