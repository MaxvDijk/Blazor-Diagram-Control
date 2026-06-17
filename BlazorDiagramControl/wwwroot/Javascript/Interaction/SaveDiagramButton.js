import { createXML } from "../Factories/XMLFactory.js"
import { downloadXML } from "../Services/DownloadXML.js"
export function saveDiagram() {
    let xml = createXML()
    downloadXML(xml)
}