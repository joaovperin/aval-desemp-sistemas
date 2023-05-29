const { saveFile, readFile } = require('./utils/utils.js');

async function main() {

    const dataPath = 'resources';
    const tcData = await readFile(`${dataPath}/tc.txt`);
    const tsData = await readFile(`${dataPath}/ts.txt`);

    const tc = tcData.trim().split('\n').slice(1).map(line => parseInt(line));
    const ts = tsData.trim().split('\n').slice(1).map(line => parseInt(line));

    console.log(`TC: ${tc.length} lines, TS: ${ts.length} lines`);

    const histogramTc = {}, histogramTs = {};
    for (let i = 0; i < tc.length; i++) {
        if (histogramTc[tc[i]]) histogramTc[tc[i]]++;
        else histogramTc[tc[i]] = 1;
    }
    for (let i = 0; i < ts.length; i++) {
        if (histogramTs[ts[i]]) histogramTs[ts[i]]++;
        else histogramTs[ts[i]] = 1;
    }

    console.log('\n**** HISTOGRAM TC:');
    console.log(Object.values(histogramTc).toString())
    console.log('\n**** HISTOGRAM TS:');
    console.log(Object.values(histogramTs).toString())
    console.log(histogramTs);


    // Save result to file
    const outputPath = 'outputs';
    await saveFile(`${outputPath}/histograms.json`, JSON.stringify({
        histogramTc,
        histogramTs
    }));
    console.log('The file has been saved!');
}

main();
