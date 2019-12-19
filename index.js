const fs = require('fs');
const axios = require('axios');
const inquirer = require('inquirer');
// const util = require('util');
const pdf = require('html-pdf');
// const readFileAsync = util.promisify(fs.readFile);

// will prompt user for github username and to pick favorite color
inquirer
    .prompt([{
        type: "input",
        message: "Please enter GitHub username.",
        name: "username"
    },
    {
        type: "list",
        message: "What is your favorite color?",
        name: "color",
        choices: [
            "Green",
            "Blue",
            "Pink",
            "Red",
        ]
    }
    ])
    // after prompt runs, then it will run function to access github profile based on username supplied
    .then(function ({ username, color }) {
        // variable for query URL from github API
        const queryUrl = `https://api.github.com/users/${username}`;

        //   using axios to retrieve info from github API
        axios.get(queryUrl).then(function (res) {
            const githubData = res.data;
            // console.log(`name: ${githubData.name}`);
            // console.log(`location: ${githubData.location}`);
            // console.log(`avatar URL: ${githubData.avatar_url}`);
            // console.log(`Bio: ${githubData.bio}`);
            // console.log(`# of Repos: ${githubData.public_repos}`);
            // console.log(`# of Followers: ${githubData.followers}`);
            // console.log(`Following: ${githubData.following}`);
            // console.log(`Link to Github: ${githubData.html_url}`);
            // console.log(`Star: ${githubData.html_url}`);

            // writes HTML File
            fs.writeFile('first.html', `<!DOCTYPE html>
            <html>
            <head>
              <meta charset="utf-8">
              <title>Developer Profile</title>
            </head>
            <body>
              <h1><span style="color:${color}"> ${githubData.name}</span></h1>
            <hr>
            <img src="${githubData.avatar_url} alt="profile-pic">
            <br>
            <p><h3>Bio:</h3> ${githubData.bio}
            <br>
            <h3>Location:</h3> ${githubData.location}
            <br>
            <h3>Link to GitHub:</h3><a href="${githubData.html_url}">Click</a>
            <h3>Number of Public Repos:</h3> ${githubData.public_repos}
            <br>
            <h3>Number of Followers:</h3> ${githubData.followers}
            <br>
            <h3>Following:</h3> ${githubData.following}
            </p>  
            </body>
            </html>`, function (err) {
                if (err) throw err;
                console.log('Saved HTML File');

                // creates PDF file
                const html = fs.readFileSync('./first.html', 'utf8');
                const options = { format: 'Letter' };

                pdf.create(html, options).toFile('.devprofile.pdf', function (err, res) {
                    if (err) return console.log(err);
                    console.log(res);
                });
            });


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


