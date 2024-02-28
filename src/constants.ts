import { NamedNode } from 'rdflib'

//// PREFIXES ////
export const PREFIX_SHACL = 'http://www.w3.org/ns/shacl#'
export const PREFIX_RDF = 'http://www.w3.org/1999/02/22-rdf-syntax-ns#'
export const PREFIX_DCTERMS = 'http://purl.org/dc/terms/'

//// RDF ////
export const RDF_PREDICATE_TYPE = new NamedNode(PREFIX_RDF + 'type')

//// SHACL NODESHAPE ////
export const SHACL_OBJECT_NODE_SHAPE = new NamedNode(PREFIX_SHACL + 'NodeShape')
export const SHACL_SUBJECT_PROPERTY = new NamedNode(PREFIX_SHACL + 'property')

//// DCTERMS NODESHAPE ////
export const DCTERMS_PREDICATE_TITLE = new NamedNode(PREFIX_DCTERMS + 'title')
export const DCTERMS_PREDICATE_CREATOR = new NamedNode(PREFIX_DCTERMS + 'creator')
export const DCTERMS_PREDICATE_DESCRIPTION = new NamedNode(PREFIX_DCTERMS + 'description')


//// SHACL PROPERTY ////
export const SHACL_OBJECT_PATH = new NamedNode(PREFIX_SHACL + 'path')
export const SHACL_OBJECT_ORDER = new NamedNode(PREFIX_SHACL + 'order')
export const SHACL_OBJECT_NAME = new NamedNode(PREFIX_SHACL + 'name')
export const SHACL_OBJECT_DATATYPE = new NamedNode(PREFIX_SHACL + 'datatype')