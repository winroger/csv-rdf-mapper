import { Quad_Object, Quad_Predicate, Quad_Subject } from "rdflib/lib/tf-types";
import { IndexedFormula, NamedNode } from 'rdflib';

export class TripleResult {
    s: NamedNode | Quad_Subject | null;
    p: NamedNode | Quad_Predicate | null;
    o: NamedNode | Quad_Object | null;
    store: IndexedFormula;

    constructor(
        s: NamedNode | Quad_Subject | null,
        p: NamedNode | Quad_Predicate | null,
        o: NamedNode | Quad_Object | null,
        store: IndexedFormula,
    ) {
        this.s = s;
        this.p = p;
        this.o = o;
        this.store = store;
    }

    static fromTriple(triple: {subject: NamedNode, predicate: NamedNode, object: NamedNode}, store: IndexedFormula): TripleResult {
        return new TripleResult(triple.subject, triple.predicate, triple.object, store);
    }

    getTriple(): TripleResult | null {
        const triples = this.store.match(this.s, this.p, this.o, null);

        for (const triple of triples) {
            return TripleResult.fromTriple({
                subject: triple.subject as NamedNode,
                predicate: triple.predicate as NamedNode,
                object: triple.object as NamedNode
            }, this.store);
        }

        return null; // Return null if no triples are found
    }
}