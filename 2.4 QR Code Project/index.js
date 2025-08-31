import inquirer from 'inquirer';
import qr from 'qr-image';
import fs from 'fs';

inquirer
  .prompt([
    { message: "Type in your URL:", name: "URL" }
  ])
  .then((answers) => {
    const url = answers.URL;

    // Generate QR code and save it as png
    qr.image(url, { type: 'png' })
      .pipe(fs.createWriteStream("qr_img.png"));

    // Save the URL to a text file
    fs.writeFile("URL.txt", url, (err) => {
      if (err) throw err;
      console.log("The URL has been saved!");
    });
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });
