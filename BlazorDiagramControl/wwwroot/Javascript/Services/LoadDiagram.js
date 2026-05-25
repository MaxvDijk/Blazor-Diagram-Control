import { parseXML } from "../Parser/Parser.js"
import { DiagramBuilder, DiagramRenderer} from "./BuildDiagram.js"

export async function loadDiagram(file) {
    const response = await fetch(`/diagrams/${file}`);
    const xmlString = await response.text();

    const components = parseXML(xmlString);
    DiagramBuilder(components);
    return DiagramRenderer();
}