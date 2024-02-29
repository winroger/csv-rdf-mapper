# CSV-RDF-Mapper
Converts tabular data (csv) to <a href="https://www.w3.org/RDF/">RDF</a> (turtle) utilizing <a href="https://www.w3.org/TR/shacl/">SHACL</a>. 

## <a href="https://winroger.github.io/csv-rdf-mapper/"> Demo </a>

## Background
The CSV-RDF-Mapper an MVP to showcase a workflow to populate tabular data into a datagraph. Current functionalities are mainly for show-case purpose and not complete. A minimal shapegraph and tabular data is incuded in the examples and embedded into the <a href="https://winroger.github.io/csv-rdf-mapper/"> Demo</a>. The app is written as Vue application and provides typescript classes to the data conversion.

The tool was developed during the NFDI4Ing Seed Fund: <a href="https://doi.org/10.5281/zenodo.7802981">RDM-Workflows for construction engineering and architecture</a>.

## Typescript classes
Class | Description
---|---
NodeShape | Typescript class to populate the Nodeshape class from a shapegraph (turtle)
NodeShapeProperty | Typescript class to automatically populate Nodeshape Properties from a shapegraph (turtle)
inputdata | Typescript class to populate a dataInput from a table (csv)
mapping | Typescript class to create a mapping between CSV and Nodeshapes, Column-headers and Node Shape Properties.