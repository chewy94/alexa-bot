// Run this script once after installing web3 dependencies to fix the issue with timestamps being to large to fit into 54 bits.
const fs = require("fs");
const path = "node_modules/web3-core-helpers/src/formatters.js";
if (fs.existsSync(path)) {
    fs.readFile(path, "utf8", (err, data) => {
        if (err) {
            return console.error(err);
        }
        const result = data.replace(
            /block\.timestamp \= utils\.hexToNumber/gm,
            "block.timestamp = utils.hexToNumberString",
        );

        fs.writeFile(path, result, "utf8", err => {
            if (err) return console.error(err);
        });
    });
}