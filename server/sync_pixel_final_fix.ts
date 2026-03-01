import { getUncachableGitHubClient } from './github';
import fs from 'fs';

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
    } catch (e) {}
    const allFiles: string[] = [];
    const walk = (dir: string) => {
      fs.readdirSync(dir).forEach(file => {
        const filePath = `${dir}/${file}`;
        if (fs.statSync(filePath).isDirectory()) {
          if (!['node_modules', '.git', 'dist', '.replit', '.cache', '.upm'].includes(file)) walk(filePath);
        } else allFiles.push(filePath);
      });
    };
    walk('.');
    const treeEntries: any[] = [];
    for (const filePath of allFiles) {
      const isBinary = !filePath.match(/\.(ts|tsx|js|jsx|json|html|css|md|txt|toml|yaml|yml)$/i);
      const content = isBinary ? fs.readFileSync(filePath).toString('base64') : fs.readFileSync(filePath, 'utf-8');
      const { data: blob } = await octokit.git.createBlob({
        owner, repo, content, encoding: isBinary ? "base64" : "utf-8"
      });
      treeEntries.push({
        path: filePath.replace(/^\.\//, ''),
        mode: '100644', type: 'blob', sha: blob.sha
      });
    }
    const { data: tree } = await octokit.git.createTree({ owner, repo, base_tree: baseTreeSha, tree: treeEntries });
    const { data: commit } = await octokit.git.createCommit({
      owner, repo, message: 'Final Reinstall: Exact Meta Pixel method fix',
      tree: tree.sha, parents: baseTreeSha ? [baseTreeSha] : []
    });
    await octokit.git.updateRef({ owner, repo, ref: 'heads/main', sha: commit.sha, force: true });
    console.log('Successfully pushed Meta Pixel fix.');
  } catch (error: any) { console.error('Sync failed:', error.message); }
}
pushToRepo();
