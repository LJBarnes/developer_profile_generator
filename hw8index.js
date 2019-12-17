// requires file system module
const fs = require("fs");
// requires axios module
const axios = require("axios");
// requires inquirer module
const inquirer = require("inquirer");


const markdown = require("markdown");

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
        const queryUrl = `https://api.github.com/users/${username}`;


        console.log("got here");
        //   using axios to retrieve info from github API
        axios.get(queryUrl).then(function (res) {
            const githubData = res.data;
            // , user.avatar_url,user.html_url, user.location, user.bio, user.public_repos, user.followers, user.following ;                       
            // return githubData.data;
            
            
            // console.log(githubData);
            console.log(`name: ${githubData.name}`);
            console.log(`location: ${githubData.location}`);
            console.log(`avatar URL: ${githubData.avatar_url}`);
            console.log(`Bio: ${githubData.bio}`);
            console.log(`# of Repos: ${githubData.public_repos}`);
            console.log(`# of Followers: ${githubData.followers}`);
            console.log(`Following: ${githubData.following}`);
            // use .map to get all of the the info into one array? 
        });
    });
            // I want to write into a file, so i need to stringify. .join() means each item in array will be separated by the character I provide (new line in this case)
            // const githubDataStr = githubData.join("\n");

            // write file to pdf or markdown

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


