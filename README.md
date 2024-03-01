# CSV-RDF-Mapper

Converts tabular data (CSV) to [RDF](https://www.w3.org/RDF/) (Turtle) utilizing [SHACL](https://www.w3.org/TR/shacl/). The CSV-RDF-Mapper is an MVP to showcase a workflow to populate tabular data into a data graph. Current functionalities are mainly for showcase purposes and are not complete. A minimal shape graph and tabular data is included in the examples and embedded into the [Demo](https://winroger.github.io/csv-rdf-mapper/). The app is written as a Vue application and provides TypeScript classes for the data conversion.

## Demo

[Live Demo](https://winroger.github.io/csv-rdf-mapper/)

## Project information

The tool was developed during the NFDI4Ing Seed Fund: [RDM-Workflows for construction engineering and architecture](https://doi.org/10.5281/zenodo.7802981).

## Features

- Conversion of CSV data to RDF format using SHACL for structuring.
- Example datasets and shape graph provided to demonstrate functionality.
- Written in Vue.js with TypeScript.

## Planned Features

- Use SHACL for validation

## Technologies Used

- Vue.js
- TypeScript
- RDF (rdflib)
- SHACL

## Installation

To install CSV-RDF-Mapper, follow these steps:

git clone https://github.com/winroger/csv-rdf-mapper.git
cd csv-rdf-mapper
npm install


## Running the Application

To run the application locally, execute:

npm run serve


## Building for Production

To build the project for production, use:

npm run build


## TypeScript Classes

| Class             | Description |
|-------------------|-------------|
| NodeShape         | TypeScript class to populate the NodeShape class from a shape graph (turtle). |
| NodeShapeProperty | TypeScript class to automatically populate NodeShape Properties from a shape graph (turtle). |
| inputdata         | TypeScript class to populate a dataInput from a table (CSV). |
| mapping           | TypeScript class to create a mapping between CSV and NodeShapes, Column-headers, and Node Shape Properties. |
| constants         | TypeScript class that holds the needed prefixes |



## License

This project is distributed under the MIT License. See `LICENSE` for more information.

## Contact

Your Name - [@your_twitter](https://twitter.com/your_twitter) - email@example.com

Project Link: [https://github.com/winroger/csv-rdf-mapper](https://github.com/winroger/csv-rdf-mapper)