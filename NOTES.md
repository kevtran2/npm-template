For the first step of the project, I had to figure out how package managers work and where information regarding 
dependencies is stored(package.json). I discovered that their are devdependencies and normal dependencies. Devdependencies include
testing or other development related packages that are not relevant when using the package as a user instead of as a developer. 
An example of this is when importing a package using "npm install <packageName>". <packageName> is installed so that its exports
can be utilized in another module. If we wanted to modify <packageName>, then it may be relevant to have all of its development dependencies.

I was able to build the code fine after I fixed an issue I had with tsc. I was running into an issue with tsc, after I had deleted node_modules, dist, and output
to see if the code worked as I expected. Specfically, I think deleting node_modules gave me issues since that dir contains information about tsc. After
"npm reinstall" node_modules was rebuilt and I was able to use tsc. I was able to run add.js and install.js fine. Add.js would add the specified package
to the package.json file in output/node_modules. Initially, install.js would just return the is-thirteen package and not look at the dependencies specified in the package.json.

My job was to modify TODO.ts to accept a variable called topLevelDependencies of type Record<string, string>, which is an object with key, value pairs of 
the "packageName": "version", and convert those topLevelDependencies into an installmentPlan which includes all of those dependencies and the dependencies of dependencies. The first thing I did was print topLevelDependencies to confirm that the object is what I expected. From there, I created a for loop to add those 
dependencies to the installmentPlan(ip). 

The next step I need to do is get one dependency, and get a list of its dependencies. From there, I will figure out what to do next in terms of 
combining shared dependencies or building out nested dependencies. 

TODO: get dependency of 1 dependency. Start with dependencies of is_thirteen.