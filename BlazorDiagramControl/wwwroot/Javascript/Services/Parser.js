export function parseXML(xmlString) {
    const xmlDocument = new DOMParser().parseFromString(xmlString, "text/xml");

    const components = xmlDocument.querySelectorAll("Component");

    const rawComponents = [];

    for (const component of components) {
        rawComponents.push(parseComponent(component))
    }
    return rawComponents;
}

function parseComponent(component) {
    return {
        id: component.querySelector("ID")?.textContent,

        diagramType: component.getAttribute("DiagramType"),
        type: component.querySelector("Type")?.textContent,

        CSObject: component.getElementsByTagName("CSObject")[0]?.getAttribute("Value"),
        groupId: component.querySelector("GroupID")?.textContent,
        
        left: parseInt(component.getElementsByTagName("Left")[0]?.getAttribute("Value")?? 0),
        top: parseInt(component.getElementsByTagName("Top")[0]?.getAttribute("Value")?? 0),
        
        BindingType: component.querySelector("BindingType")?.textContent,

        StartItemID: component.querySelector("StartItemID")?.textContent,
        EndItemID: component.querySelector("EndItemID")?.textContent,

        description: component.getAttribute("csDescription")
    };

}

/*function CreateConnection() {
    const id = component.querySelector("ID").textContent;

    const CSObject = component.getElementsByTagName("CSObject")[0].getAttribute("Value");
    const BindingType = component.querySelector("BindingType").textContent;

    const StartItemID = component.querySelector("StartItemID").textContent;
    const EndItemID = component.querySelector("EndItemID").textContent;

    const description = component.getAttribute("csDescription");
   
}

function CreateSolid() {
    const id = component.querySelector("ID").textContent;

    const CSObject = component.getElementsByTagName("CSObject")[0].getAttribute("Value");
    const groupId = component.querySelector("GroupID").textContent;

    const left = parseInt(component.getElementsByTagName("Left")[0].getAttribute("Value"));
    const top = parseInt(component.getElementsByTagName("Top")[0].getAttribute("Value"));

    const type = component.querySelector("Type").textContent;
    const description = component.getAttribute("csDescription");

}*/