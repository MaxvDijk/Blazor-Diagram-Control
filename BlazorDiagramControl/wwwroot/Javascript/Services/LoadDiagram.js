import { parseXML } from "../Parser/Parser.js"
import {buildDiagram} from "./BuildDiagram.js"

export async function loadDiagram(file) {
    const response = await fetch(`/diagrams/${file}`);
    const xmlString = await response.text();

    const components = parseXML(xmlString);
    return buildDiagram(components);
}