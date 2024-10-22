For the first step of the project, I had to figure out how package managers work and where information regarding 
dependencies are stored(package.json). I discovered that there are devdependencies and normal dependencies. Devdependencies include
testing and other development related packages that are not relevant when using the package as a user. 
An example of this is when importing a package using "npm install <packageName>". <packageName> is installed so that its exports
can be utilized in another module. If we wanted to modify <packageName>, then it may be relevant to have all of its development dependencies.

I was able to build the code fine after I fixed an issue I had with tsc. I was running into an issue with tsc, after I had deleted node_modules, dist, and output
to see if the code worked as I expected. Specfically, I think deleting node_modules gave me issues since that dir contains information about tsc. After
"npm reinstall" node_modules was rebuilt and I was able to use tsc. I was able to run add.js and install.js fine. Add.js would add the specified package
to the package.json file in output/node_modules. As starter code, install.js just returns the is-thirteen package and does not look at the dependencies specified in the package.json.

My job was to modify TODO.ts to accept a variable called topLevelDependencies of type Record<string, string>, which is an object with key, value pairs of 
the "packageName": "version", and convert those topLevelDependencies into an installmentPlan which includes all of those dependencies and its child dependencies (dependencies of dependencies). The first thing I did was print topLevelDependencies to confirm that the object is what I expected. From there, I created a for loop to add those dependencies to the installmentPlan(ip). 

The next step I need to do is get one dependency, and get a list of its dependencies. From there, I will figure out what to do next in terms of 
combining shared dependencies or building out nested dependencies. 

TODO: get dependency of 1 dependency. Start with dependencies of is_thirteen.

The next thing I did was I added all of the topLevelDependencies into a stack(note: I realized that topLevelDepdencies will only have the most
recently added version of a package, since keys are unique in js objects). I then popped the stack, adding the current module to the installmentPlan, and then I
used the getPackageInfo function in registry.ts to get the package.json data for each dependency. From there, I was able to get its child dependencies and add
them to the stack to process. I created a set to ensure that dependencies were not explored or added multiple times to the installmentPlan. 

I am currently getting an error for some packages when trying to install is-hundred. 

TODO: figure out what the error means and how to remove the error(ENOTEMPTY). 

I believe the issue is to multiple versions of the dependency being needed since
a directory of the dependency already exists, the package manager is not ready to resolve this conflict when the same dependency but a different version is needed
to be downloaded. It is part of the extensions to resolve this issue.

Extensions: 
    -Nested Dependencies**
    -Minimizing Downloads
    -Reproducible installs
    -Caching

I will choose to do Nested Dependencies. My first question is how do I figure out if multiple versions of a dependency is required?
If I have a DS that keeps track if a different version of the dependency is downloaded, how do I go back and update the parent directory of past dependencies versions?
Do I need to do that? I think I do not need to do that unless I decide to implement the Minimizing Downloads extension, which would focus on reducing Nested Dependencies by finding the highest compatible version of the dependency to store.

TODO: for every dependency, when exploring for its child dependencies, update the parent directory property to reflect its parent(giving Node_modules a nested structure).

I implemented the Nested Dependency feature. Now, every depedency is nested under its parent. Obviously, this can cause a lot of redundancy when 
multiple dependencies may require the same version. Since the Minimizing Downloads extension hasn't been implemented yet, this is expected. 
I ran into an issue when trying to download lru-cache@~2.5.0 for a while, but I realized it was due to the "~". The code before only removed the
"^", so I was getting issues when attempting to download this dependency. I also noticed that the set I used to track dependencies is not
necessary since I am downloaded dependencies into nested folders. The only issue would be if I tried to download the exact same dependency into the same nested
folder, but that doesn't really happen. The topLevelDependencies also does not introduce duplicates of dependencies since the latest version overwrites any previous.