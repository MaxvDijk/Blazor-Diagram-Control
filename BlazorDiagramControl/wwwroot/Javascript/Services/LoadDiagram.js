import { parseXML } from "./Parser.js"
import { diagramBuilder } from "./Builder.js"
import { renderDiagram } from "../Rendering/RenderDiagram.js";

export async function loadDiagram(file) {
    const response = await fetch(`/Diagrams/${file}`);
    const xmlString = await response.text();

    const components = parseXML(xmlString);
    return diagramBuilder(components);
}