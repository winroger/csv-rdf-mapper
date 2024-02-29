# CSV-RDF-Mapper

## <a href="https://winroger.github.io/csv-rdf-mapper/"> Demo </a>

Mapping tool to convert tabular data (csv) to <a href="https://www.w3.org/RDF/">RDF</a> (turtle) utilizing <a href="https://www.w3.org/TR/shacl/">SHACL</a>. The CSV-RDF-Mapper an MVP to showcase a workflow to populate tabular data into a datagraph. Current functionalities are mainly for show-case purpose and not complete. A minimal shapegraph and tabular data is incuded in the examples and embedded into the <a href="https://winroger.github.io/csv-rdf-mapper/"> Demo</a>.

The tool was developed during the NFDI4Ing Seed Fund: <a href="https://doi.org/10.5281/zenodo.7802981">RDM-Workflows for construction engineering and architecture</a>.

### Typescript classes
Class | Description
---|---
NodeShape | Typescript class to populate a Nodeshape
NodeShapeProperty | Typescript class to populate a Nodeshape Property
inputdata | Typescript class to populate a csv input
mapping | Typescript class to create a mapping between CSV and Nodeshapes, Column-headers and Node Shape Properties.