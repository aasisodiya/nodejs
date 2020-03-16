var fs = require('fs').promises;
var AdmZip = require('adm-zip');
var spawnsync = require('child_process').spawnSync;
// var spawn = require('child_process').spawn;

exports.handler = async (event) => {
	status = "Done"
	responseCode = 200
	try {
		// reading & extracting archives
		var zip = new AdmZip("./myscript.zip");
		zip.extractAllTo(/*target path*/"/tmp/", /*overwrite*/true);

		// Check if your files are extracted to /tmp
		var fileslistintmp = await fs.readdir("/tmp");
		console.log(fileslistintmp)

		// Giving access to our extracted executable file
		var chmodExec = spawnsync("chmod", ["777", "/tmp/path_to_your_executable_file"]);
		console.log(String(chmodExec.stdout));

		// Run the executable file
		var args = ['arg1', 'arg2'];
		var fileExec = spawnsync("/tmp/path_to_your_executable_file", args);
		console.log(String(fileExec.stdout));
	} catch (err) {
		status = "Failed"
		responseCode = 500
	}
	const response = {
		statusCode: responseCode,
		body: status
	}
	return response;
}