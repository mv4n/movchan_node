import fs from 'fs';
import path from 'path';
import {fileURLToPath} from "url";
import os from 'os';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const systemInfo = {
    platform: os.platform(),
    architecture: os.arch(),
    cpuCores: os.cpus().length,
    cpuModel: os.cpus()[0].model,
    freemem: os.freemem(),
    totalmem: os.totalmem(),
    homedir: os.homedir(),
    uptime: os.uptime()
};

const systemInfoText = `
Platform: ${systemInfo.platform}
Architecture: ${systemInfo.architecture}
CPU Cores: ${systemInfo.cpuCores}
CPU Model: ${systemInfo.cpuModel}
Homedir: ${systemInfo.homedir}
Uptime: ${systemInfo.uptime}
`;


fs.mkdir(path.join(__dirname, 'test1'), err => {
    if (err.code === 'EEXIST') {
        console.log('Вже існує')
    } else if (err) {
        console.error(err);
    }
    else {
        console.log('ПАПКУ СТВОРЕНО!')
    }
});

const filePath = path.join(__dirname, 'test1', 'text.txt');

fs.writeFile(filePath, systemInfoText, err => {
    if (err) {
        console.log(err)
    } else {
        console.log('Файл створено')
    }
})

fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        throw err;
    }
    console.log(data);
})