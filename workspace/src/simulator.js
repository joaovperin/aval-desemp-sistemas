
const { saveFile, readFile } = require('./utils/utils.js');

async function main() {

    const dataPath = 'resources';
    const tcData = await readFile(`${dataPath}/tc.txt`);
    const tsData = await readFile(`${dataPath}/ts.txt`);

    const tc = tcData.trim().split('\n').slice(1).map(line => parseInt(line));
    const ts = tsData.trim().split('\n').slice(1).map(line => parseInt(line));

    console.log(`TC: ${tc.length} lines, TS: ${ts.length} lines`);

    const pairs = [];
    let soFarExpected = 0, soFarDone = 0;
    for (let i = 0; i < tc.length; i++) {
        const tcTime = tc[i], tsTime = ts[i];

        const queriaComecar = soFarExpected + tcTime;
        const queriaTerminar = queriaComecar + tsTime;
        const realmenteComecou = Math.max(queriaComecar, soFarDone + 1);
        const realmenteTerminou = realmenteComecou + tsTime;

        pairs.push({
            i,
            QC: queriaComecar,
            QT: queriaTerminar,
            RC: realmenteComecou,
            RT: realmenteTerminou,
            TF: (realmenteComecou - queriaComecar),
        });

        soFarExpected += tcTime;
        soFarDone = realmenteTerminou;
    }

    console.log(`Pairs: ${pairs.length} lines`);
    console.log('**** PAIRS:');
    console.log(
        Object.values(pairs).map(e => JSON.stringify(e)).join('\n')
    );

    // Save result to file
    const outputPath = 'outputs';
    await saveFile(`${outputPath}/result.json`, JSON.stringify(pairs));
    console.log('The file has been saved!');
}

main();
