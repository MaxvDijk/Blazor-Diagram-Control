export function createXML(diagram) {
    let xml = `<Designer>
                <Components>`
    for (const shape of diagram.shapes.values()) {
        xml += `<Component DiagramType="${shape.diagramType}" csDescription="${shape.description}">
                    <CSObject Value="${shape.csObject}" />
                    <ID>${shape.id}</ID>
                    <GroupID>${shape.groupId}</GroupID>
                    <Left Value="${shape.left}" />
                    <Top Value="${shape.top}" />
                    <Type>${shape.type.shapeType}</Type>
                </Component>`
    }
    for (const line of diagram.lines.values()) {
        xml += `<Component DiagramType="${line.diagramType}" csDescription="${line.description}">
                    <CSObject Value="${line.csObject}" />
                    <ID>${line.id}</ID>
                    <GroupID>${line.groupId}</GroupID>
                    <Left Value="NaN" />
                    <Top Value="NaN" />
                    <BindingType>${line.bindingType}</BindingType>
                    <StartItemID>${line.startId}</StartItemID>
                    <EndItemID>${line.endId}</EndItemID>
                 </Component>`
    }
    xml += `  </Components>
            </Designer>`;
    return xml;
}