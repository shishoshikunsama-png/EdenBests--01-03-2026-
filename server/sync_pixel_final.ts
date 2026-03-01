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
          if (file !== 'node_modules' && file !== '.git' && file !== 'dist' && file !== '.replit' && file !== '.cache' && file !== '.upm') {
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
          const stats = fs.statSync(filePath);
          const isBinary = !filePath.match(/\.(ts|tsx|js|jsx|json|html|css|md|txt|toml|yaml|yml)$/i);
          
          let content;
          let encoding: "utf-8" | "base64" = "utf-8";
          
          if (isBinary) {
            content = fs.readFileSync(filePath).toString('base64');
            encoding = "base64";
          } else {
            content = fs.readFileSync(filePath, 'utf-8');
          }

          const { data: blob } = await octokit.git.createBlob({
            owner,
            repo,
            content,
            encoding
          });
          
          return {
            path: filePath.replace(/\\/g, '/').replace(/^\.\//, ''),
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
        await new Promise(resolve => setTimeout(resolve, 300));
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
      message: 'Implement Meta Pixel and Lead Event - Corrected noscript placement',
      tree: tree.sha,
      parents: baseTreeSha ? [baseTreeSha] : []
    });

    await octokit.git.updateRef({
      owner,
      repo,
      ref: 'heads/main',
      sha: commit.sha,
      force: true
    });
    console.log('Updated main branch successfully.');

  } catch (error: any) {
    console.error('Error in pushToRepo:', error.message);
  }
}

pushToRepo();
