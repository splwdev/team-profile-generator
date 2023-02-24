const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");


// TODO: Write Code to gather information about the development team members, and render the HTML file.
const companyEmployees = [];

const managerQuestions = [
    {
        type: "input",
        message: "What is the manager's name?",
        name: "managerName",
    },
    {
        type: "input",
        message: "What is the manager's id?",
        name: "managerId",
    },
    {
        type: "input",
        message: "What is the manager's email?",
        name: "managerEmail",
    },
    {
        type: "input",
        message: "What is the manager's office number?",
        name: "managerOfficeNumber",
    }
];

const optionQuestion = {
    type: "list",
    message: "What type of team member would you like to add?",
    name: "option",
    choices: [
        "Engineer",
        "Intern",
        "Finish building the team"
    ],
};

const engineerQuestions = [
    {
        type: "input",
        message: "What is the engineer's name?",
        name: "engineerName",
    },
    {
        type: "input",
        message: "What is the engineer's id?",
        name: "engineerId",
    },
    {
        type: "input",
        message: "What is the engineer's email?",
        name: "engineerEmail",
    },
    {
        type: "input",
        message: "What is the engineer's GitHub username?",
        name: "engineerGithub",
    },
];

const internQuestions = [
    {
        type: "input",
        message: "What is the intern's name?",
        name: "internName",
    },
    {
        type: "input",
        message: "What is the intern's id?",
        name: "internId",
    },
    {
        type: "input",
        message: "What is the intern's email?",
        name: "internEmail",
    },
    {
        type: "input",
        message: "What is the intern's school?",
        name: "internSchool",
    },
];

function optionPrompt() { 
    console.log()
    inquirer
        .prompt(optionQuestion)
        .then((response) => {
            if (response.option === "Engineer") {
              createEngineer();
            } else if (response.option === "Intern") {
              createIntern();
            }
            else {
                if (!fs.existsSync(OUTPUT_DIR)) {
                  fs.mkdirSync(OUTPUT_DIR);
                };
                fs.writeFile(outputPath, render(companyEmployees), (err) =>
                  err ? console.log(err) : console.log("Employees Added")
                );
            };
        });
}

function createManager() {
    inquirer.prompt(managerQuestions).then((response) => {
            companyEmployees.push(
              new Manager(
                response.managerName,
                response.managerId,
                response.managerEmail,
                response.managerOfficeNumber
              )
            );
        optionPrompt();
    });
};
function createEngineer() {
    inquirer.prompt(engineerQuestions).then((response) => {
      companyEmployees.push(
        new Engineer(
          response.engineerName,
          response.engineerId,
          response.engineerEmail,
          response.engineerGithub
        )
      );
      optionPrompt();
    });
};
function createIntern() {
    inquirer.prompt(internQuestions).then((response) => {
      companyEmployees.push(
        new Intern(
          response.internName,
          response.internId,
          response.internEmail,
          response.internSchool
        )
      );
      optionPrompt();
    });
};

createManager();