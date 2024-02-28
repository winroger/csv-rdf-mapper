import { BlankNode, NamedNode, Literal } from "rdflib";
import { PREFIX_SHACL } from "./constants";
import { Quad } from "rdflib/lib/tf-types";
//import { PropertyMapping } from "./mapping";



// Class for NodeShape Property
export class NodeShapeProperty {
    nodeId: NamedNode | BlankNode;
    name?: string
    description?: Literal
    path?: NamedNode
    node?: NamedNode
    //class?: NamedNode
    //minCount: number
    //maxCount: number
    //minLength: number
    //maxLength: number
    //minInclusive: number
    //maxInclusive: number
    //minExclusive: number
    //maxExclusive: number
    //singleLine: boolean
    pattern?: string
    order?: string
    //nodeKind: NamedNode
    //shaclAnd: string
    //shaclIn: string
    //shaclOr: Term[]
    //languageIn: Term[]
    datatype?: NamedNode
    //hasValue: Term
    //mapping: PropertyMapping

    static nodeShapePropertyPredicates: { [key: string]: (nodeShapeProperty: NodeShapeProperty, tripleItem: any) => void } = {
        [PREFIX_SHACL + "name"]: (nodeShape, tripleItem) => nodeShape.name = tripleItem,
        [PREFIX_SHACL + "description"]: (nodeShape, tripleItem) => nodeShape.description = tripleItem,
        [PREFIX_SHACL + "path"]: (nodeShape, tripleItem) => nodeShape.path = tripleItem,
        [PREFIX_SHACL + "node"]: (nodeShape, tripleItem) => nodeShape.node = tripleItem,
        [PREFIX_SHACL + "pattern"]: (nodeShape, tripleItem) => nodeShape.pattern = tripleItem,
        [PREFIX_SHACL + "order"]: (nodeShape, tripleItem) => nodeShape.order = tripleItem,
        [PREFIX_SHACL + "datatype"]: (nodeShape, tripleItem) => nodeShape.datatype = tripleItem,
    };

    constructor(nodeId: NamedNode | BlankNode) {
        this.nodeId = nodeId;
        //this.mapping = new PropertyMapping
    }

    updateNodeShapeProperties(triple: Quad): void {
        const action = NodeShapeProperty.nodeShapePropertyPredicates[triple.predicate.value];
        if (action) {
            action(this, triple.object);
        }
    }
}