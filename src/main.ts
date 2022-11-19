import { getInput, setFailed, exportVariable } from '@actions/core';
import { findPackageJson, extract } from './util';

async function run(): Promise<void> {
    try {
        const followSymbolicLinks: boolean = getInput('follow-symlinks').toLowerCase() !== 'false';
        const path: string = getInput('path') ? process.env.GITHUB_WORKSPACE + '/' + getInput('path') : await findPackageJson(followSymbolicLinks);

        const packageVersion: string = await extract(path);

        exportVariable('PACKAGE_VERSION', packageVersion);
    } catch (error: any) {
        setFailed(error.message);
    }
}

run();
