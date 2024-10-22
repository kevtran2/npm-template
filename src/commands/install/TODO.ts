import { Dependency, DependencyInstallation, InstallationPlan } from "../../types";
import { getPackageInfo } from "../../util/registry";

/**
 *
 * @param topLevelDependencies The list of dependencies as determined by package.json's `dependencies` object
 * @returns The installation plan
 */
export async function constructInstallationPlan(
  topLevelDependencies: Record<string, string>
): Promise<InstallationPlan> {
  // TODO -> Determine the full list of dependencies to download
  // add all of the dependencies from topLevelDependencies to the returned InstallationPlan (DONE)
  // figure out the dependencies of those dependencies and add them to the InstallationPlan as well (how do I get their dependency list??) (DONE)
  // get dependencies from the NPM api. add to list, if exists in list skip (In progress)
  // can use getPackageInfo from "./registry" to get json with info on package, including dependencies (DONE)
  // is it possible to get dependency version via NPM api? how does the version needed get acquired? ^3.4.2 means 3.*.* higher backwards compatible versions accepted
  // avoid adding the same dependencies(exact same version)
  // recursively continue until all dependencies are added
  // can modify parentDirectory property to have nested node_modules(extension, do later)

  // stack of dependencies to explore and add to installmentPlan
  let dependencyStack: DependencyInstallation[] = []

  console.log(topLevelDependencies);
  // add dependencies from add to stack
  for (const depName in topLevelDependencies) {
    console.log(depName);
    dependencyStack.push({name: depName, version: topLevelDependencies[depName]})
    console.log(dependencyStack);
  }
  
  // create installmentPlan for return
  let ip: InstallationPlan = [];

  // create set to prevent installing dependencies twice
  const seenDependencies: Set<DependencyInstallation> = new Set<DependencyInstallation>();

  // while dependencies exist in stack, pop and process
  while (dependencyStack.length > 0) {
    const dep = dependencyStack.pop();
    //console.log("Popped " + dep?.name);
    if (!dep) {
      throw TypeError("Undefined when expecting type DependencyInstallation.")
    }
    if (seenDependencies.has(dep)) {
      console.log("Seen" + dep.name);
      continue;
    } else {
      seenDependencies.add(dep);
      ip.push(dep);
    }
    // get dependencies of dep and then add to stack.
    console.log(`Getting dependencies of ${dep.name}@${dep.version}...`);
    const data = await getPackageInfo(dep);
    if (!data.dependencies) continue; // no child dependencies found
    for (const depName in data.dependencies) {
      let parentDirectoryStr: string = `${dep.parentDirectory || ""}${dep.name}/node_modules/`;
      //console.log(parentDirectoryStr);
      let childDep: DependencyInstallation = {name: depName, version: data.dependencies[depName], parentDirectory: parentDirectoryStr};
      //console.log(`Child dependency of ${dep.name} found called ${depName}`);
      if (!seenDependencies.has(childDep)) {
        dependencyStack.push(childDep);
      } else {
        console.log("Seen: " + childDep.name);
      }
    }
  }
  return ip;
}
