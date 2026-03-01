import { getUncachableGitHubClient } from './github';
import fs from 'fs';
import path from 'path';

async function pushToRepo() {
  try {
    const octokit = await getUncachableGitHubClient();
    const { data: user } = await octokit.users.getAuthenticated();
    const owner = user.login;
    const repo = 'eden-bets-landing';

    console.log(`Pushing all current files to ${owner}/${repo}`);

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
          if (['node_modules', '.git', 'dist', '.replit', '.cache', '.upm'].includes(file)) {
            return;
          }
          getFiles(filePath, allFiles);
        } else {
          allFiles.push(filePath);
        }
      });
      return allFiles;
    }

    const allFiles = getFiles('.');
    const batchSize = 20;
    const treeEntries: any[] = [];
    
    for (let i = 0; i < allFiles.length; i += batchSize) {
      const batch = allFiles.slice(i, i + batchSize);
      const batchResults = await Promise.all(batch.map(async (filePath) => {
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
      
      treeEntries.push(...batchResults.filter(b => b !== null));
      if (i + batchSize < allFiles.length) {
        await new Promise(resolve => setTimeout(resolve, 300));
      }
    }

    const { data: tree } = await octokit.git.createTree({
      owner,
      repo,
      base_tree: baseTreeSha,
      tree: treeEntries
    });

    const { data: commit } = await octokit.git.createCommit({
      owner,
      repo,
      message: 'Fix Meta Pixel activation and Lead event firing',
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
    
    console.log('Successfully synced Meta Pixel fix to GitHub.');

  } catch (error: any) {
    console.error('Sync failed:', error.message);
  }
}

pushToRepo();
