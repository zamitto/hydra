import psList from "ps-list";
import path from "node:path";
import childProcess from "node:child_process";
import { promisify } from "node:util";

const TEN_MEGABYTES = 1000 * 1000 * 10;
const execFile = promisify(childProcess.execFile);

export const getProcesses = async (isPackaged: boolean) => {
  if (isPackaged && process.platform == "win32") {
    const binary = "fastlist-0.3.0-x64.exe";
    let binaryPath;

    binaryPath = path.join(process.resourcesPath, "dist", binary);

    const { stdout } = await execFile(binaryPath, {
      maxBuffer: TEN_MEGABYTES,
      windowsHide: true,
    });

    return stdout
      .trim()
      .split("\r\n")
      .map((line) => line.split("\t"))
      .map(([pid, ppid, name]) => ({
        pid: Number.parseInt(pid, 10),
        ppid: Number.parseInt(ppid, 10),
        name,
      }));
  } else {
    return psList();
  }
};
