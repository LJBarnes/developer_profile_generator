// requires file system module
const fs = require("fs");
// requires axios module
const axios = require("axios");
// requires inquirer module
const inquirer = require("inquirer");

// will prompt user/create object to pull from later
inquirer
    .prompt([{
        message: "Please enter GitHub username.",
        name: "username"
    },
        {
            message: "What is your favorite color?",
            name: "color"
        }])
    // after prompt runs, then it will run function to access github profile based on username supplied
    .then(function ({ username }) {
        // variable for query URL from github API
        const queryUrl = `https://api.github.com/users/ ${username}`;

        //   using axios to retrieve info from github API
        console.log("got here");

        //  ////////////////////////////////////////////
        // breaking here, I think...
        axios.get(queryUrl).then(function (res) {
            // mapping into a new array that contains only the data I'm looking for
            const githubData = res.data.map(function(res){
                return user.name;
            });
            //     // , user.avatar_url,user.html_url, user.location, user.bio, user.public_repos, user.followers, user.following ;                       
            console.log(user.name);
                        });
                    });
            // I want to write into a file, so i need to stringify. .join() means each item in array will be separated by the character I provide (new line in this case)
            // const githubDataStr = githubData.join("\n");

            // write file to pdf

            // *** I think i need to format this in HTML then save to a pdf....***
        //     fs.writeFile("profile.hmtl", githubDataStr, function (err) {
        //         if (err) {
        //             throw err;
        //         }
        //         console.log(`saved ${githubData.length} data`);
        //     });
        // });


  
    // figure out how to use user supplied favorite color for username display
    // Need to format in HTML and then write to PDF?


