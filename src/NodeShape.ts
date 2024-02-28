import { NodeShapeProperty } from "./NodeShapeProperty";
import { DCTERMS_PREDICATE_TITLE, DCTERMS_PREDICATE_CREATOR, RDF_PREDICATE_TYPE, DCTERMS_PREDICATE_DESCRIPTION, SHACL_SUBJECT_PROPERTY, SHACL_OBJECT_NODE_SHAPE } from "./constants";
import { NamedNode, Store, graph, parse } from "rdflib"

export class ApplicationProfile {
    classes: string[]
    nodeShapes: NodeShape[]


    constructor() {
        this.classes = []
        this.nodeShapes = []
    }

    addNodeShapes(file: File): Promise<void> {
        return new Promise((resolve, reject) => {
            if (file) {
                const reader = new FileReader();
                reader.onload = async (e: ProgressEvent<FileReader>) => {
                    try {
                        const ttlData = e.target?.result;
                        if (typeof ttlData !== 'string') {
                            throw new Error('File content is not a string');
                        }
                        const store: Store = graph();
                        const baseURI = 'http://example.org';
                
                        parse(ttlData, store, baseURI, 'text/turtle');
                
                        const nodeShapeNodeIds = store.match(null, null, SHACL_OBJECT_NODE_SHAPE, null);
                        nodeShapeNodeIds.forEach((triple) => {
                            if (triple.subject.termType === 'NamedNode') {
                                const newNodeShape = new NodeShape(triple.subject as NamedNode, store);
                                this.nodeShapes.push(newNodeShape);
                            }
                        });    
                    } catch (error) {
                        console.error('Error parsing TTL data:', error);
                        reject(error);
                    }
                    resolve();
                };
                reader.onerror = () => reject(reader.error);
                reader.readAsText(file);
            } else {
                reject('No file provided');
            }
        });
    }

    getNodeShapes(): NodeShape[] {
        return this.nodeShapes
    }
}

export class NodeShape {
    nodeId: NamedNode
    targetClass?: NamedNode
    label?: string
    creator?: string
    description?: string
    properties: NodeShapeProperty[]
 

    static nodeShapeAttributes: { [key: string]: (nodeShape: NodeShape, tripleItem: any) => void } = {
        [DCTERMS_PREDICATE_TITLE.value]: (nodeShape, tripleItem) => nodeShape.label = tripleItem,
        [DCTERMS_PREDICATE_CREATOR.value]: (nodeShape, tripleItem) => nodeShape.creator = tripleItem,
        [DCTERMS_PREDICATE_DESCRIPTION.value]: (nodeShape, tripleItem) => nodeShape.description = tripleItem,
        [RDF_PREDICATE_TYPE.value]: (nodeShape, tripleItem) => nodeShape.targetClass = tripleItem,
        [SHACL_SUBJECT_PROPERTY.value]: (nodeShape, tripleItem) => nodeShape.properties.push(new NodeShapeProperty(tripleItem)),
    }

    constructor(nodeId: NamedNode, store: Store) {
        this.nodeId = nodeId
        this.properties = []
        this.updateNodeShape(nodeId, store);
    }

    updateNodeShape(nodeId: NamedNode, store: Store): void {
        const attributes = store.match(nodeId, null, null, null);
        attributes.forEach((triple) => {
            const action = NodeShape.nodeShapeAttributes[triple.predicate.value];
            if (action) {
                action(this, triple.object);
            } else {
                //console.error('No action defined for predicate:', triple.predicate.value);
            }
        })

        for (const nodeShapeProperty of this.properties) {
            const propAttributes = store.match(nodeShapeProperty.nodeId, null, null, null);
            propAttributes.forEach((triple) => {
                nodeShapeProperty.updateNodeShapeProperties(triple)
            })
            
        }
        
    }

    getPropUrls(): string[] {
        const propertyUrls: string [] = []
        for (const property of this.properties) {
            if(property.path) {
             propertyUrls.push(property.path.value)
            }
            else{
                console.log("error getting property urls")
            }
        }
        return propertyUrls
    }

    getPropNames(): string[] {
        const propNames: string [] = []
        for (const property of this.properties) {
            if(property.name) {
             propNames.push(property.name)
            }
            else{
                console.log("error getting property names")
            }
        }
        return propNames
    }

    getProperties(): NodeShapeProperty[] {
    return this.properties
    }
}
