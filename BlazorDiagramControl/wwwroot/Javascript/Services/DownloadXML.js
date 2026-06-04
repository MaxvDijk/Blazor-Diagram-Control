
export async function downloadXML(xml) {
    const handle = await window.showSaveFilePicker({
        suggestedName: "diagram.xml",
        types: [{
            description: "XML Files",
            accept: { "application/xml": [".xml"] }
        }]
    });

    const writable = await handle.createWritable();
    await writable.write(xml);
    await writable.close();
}
