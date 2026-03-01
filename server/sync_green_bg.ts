import { getUncachableGitHubClient } from './github';
import fs from 'fs';
import path from 'path';

async function pushToRepo() {
  try {
    const octokit = await getUncachableGitHubClient();
    const { data: user } = await octokit.users.getAuthenticated();
    const owner = user.login;
    const repo = 'eden-bets-landing';

    console.log(`Pushing to ${owner}/${repo}`);

    let baseTreeSha: string | undefined;
    try {
      const { data: ref } = await octokit.git.getRef({ owner, repo, ref: 'heads/main' });
      baseTreeSha = ref.object.sha;
    } catch (e) {
      console.log('Main branch not found.');
    }

    function getFiles(dir: string, allFiles: string[] = []) {
      if (!fs.existsSync(dir)) return allFiles;
      const files = fs.readdirSync(dir);
      files.forEach(file => {
        const filePath = path.join(dir, file);
        if (fs.statSync(filePath).isDirectory()) {
          if (file !== 'node_modules' && file !== '.git' && file !== 'dist' && file !== '.replit' && file !== '.cache') {
            getFiles(filePath, allFiles);
          }
        } else {
          allFiles.push(filePath);
        }
      });
      return allFiles;
    }

    const allFiles = getFiles('.');
    const batchSize = 20;
    const blobs: any[] = [];
    
    for (let i = 0; i < allFiles.length; i += batchSize) {
      const batch = allFiles.slice(i, i + batchSize);
      const batchBlobs = await Promise.all(batch.map(async (filePath) => {
        try {
          const content = fs.readFileSync(filePath, 'utf-8');
          const { data: blob } = await octokit.git.createBlob({
            owner,
            repo,
            content,
            encoding: 'utf-8'
          });
          return {
            path: filePath.replace(/\\/g, '/'),
            mode: '100644' as const,
            type: 'blob' as const,
            sha: blob.sha
          };
        } catch (err: any) {
          return null;
        }
      }));
      blobs.push(...batchBlobs.filter(b => b !== null));
      if (i + batchSize < allFiles.length) {
        await new Promise(resolve => setTimeout(resolve, 500));
      }
    }

    const { data: tree } = await octokit.git.createTree({
      owner,
      repo,
      base_tree: baseTreeSha,
      tree: blobs
    });

    const { data: commit } = await octokit.git.createCommit({
      owner,
      repo,
      message: 'Update to vibrant green stadium background',
      tree: tree.sha,
      parents: baseTreeSha ? [baseTreeSha] : []
    });

    await octokit.git.updateRef({
      owner,
      repo,
      ref: 'heads/main',
      sha: commit.sha
    });
    console.log('Updated main branch successfully.');

  } catch (error: any) {
    console.error('Error in pushToRepo:', error.message);
  }
}

pushToRepo();
