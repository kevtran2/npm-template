import { DependencyInstallation, InstallationPlan } from "../../types";

/**
 *
 * @param topLevelDependencies The list of dependencies as determined by package.json's `dependencies` object
 * @returns The installation plan
 */
export async function constructInstallationPlan(
  topLevelDependencies: Record<string, string>
): Promise<InstallationPlan> {
  // TODO -> Determine the full list of dependencies to download
  console.log(topLevelDependencies)
  // add all of the dependencies from topLevelDependencies to the returned InstallationPlan (DONE)
  // figure out the dependencies of those dependencies and add them to the InstallationPlan as well (how do I get their dependency list??)
  // avoid adding the same dependencies(exact same version)
  let ip: InstallationPlan = [
    {
      name: "is-thirteen",
      version: "2.0.0",
    },
  ];
  for (const depName in topLevelDependencies) {
    let dep: DependencyInstallation = {name: depName, version: topLevelDependencies[depName]}
    ip.push(dep)
  }
  console.log(ip)
  return ip;
}
