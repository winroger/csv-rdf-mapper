# main.py

from flask import Flask, render_template, request, session, Response, redirect, url_for
from flask_wtf import FlaskForm
from wtforms import FileField
from wtforms.validators import DataRequired
from werkzeug.utils import secure_filename
import os
import csv
from rdflib import Graph, Literal, URIRef
from rdflib.namespace import RDF, SH, DCTERMS
from urllib.parse import quote

app = Flask(__name__)


app.config['UPLOAD_FOLDER'] = './uploads'
app.config['SESSION_TYPE'] = 'filesystem'
app.config['SECRET_KEY'] = '1213'


class SHACLUploadForm(FlaskForm):
    file = FileField('TTL File', validators=[DataRequired()])


class CSVUploadForm(FlaskForm):
    file = FileField('CSV File', validators=[DataRequired()])


def parse_ttl(file_path):
    g = Graph()
    g.parse(file_path, format="turtle")

    prefixes = []
    for prefix, namespace in g.namespaces():
        prefixes.append({'prefix': prefix, 'namespace': str(namespace)})

    shacl_shapes = []
    for s, p, o in g.triples((None, RDF.type, SH.NodeShape)):  # Adjusted line
        shape = {
            "target_class": str(s),
            "properties": [],
            "title": None
        }

        for s1, p1, o1 in g.triples((s, None, None)):
            if p1 == DCTERMS.title:
                shape["title"] = str(o1)

        for s2, p2, o2 in g.triples((s, SH.property, None)):
            prop = {
                "path": None,
                "name": None,
                #"datatype": None,
                #"minCount": None,
                #"maxCount": None,
                #"order": None,
                "node": None
            }
            for s3, p3, o3 in g.triples((o2, None, None)):
                if p3 == SH.path:
                    prop["path"] = str(o3)
                elif p3 == SH.node:
                    prop["node"] = str(o3)
                elif p3 == SH.name:
                    if isinstance(o3, Literal) and o3.language == 'en':
                        prop["name"] = str(o3)
            shape["properties"].append(prop)
        shacl_shapes.append(shape)

    return shacl_shapes, prefixes


@app.route("/", methods=['GET', 'POST'])
def upload_file():
    shacl_form = SHACLUploadForm(prefix='shacl')
    csv_form = CSVUploadForm(prefix='csv')

    shacl_shapes = session.get('shacl_shapes', None)
    csv_files = session.get('csv_files', [])

    if shacl_form.validate_on_submit() and shacl_form.file.data:
        # Handle SHACL file upload
        f = shacl_form.file.data
        filename = secure_filename(f.filename)
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        f.save(filepath)

        shacl_shapes, prefixes = parse_ttl(filepath)
        session['shacl_shapes'] = shacl_shapes
        #print(f"prefixes after parse: {prefixes}")
        session['prefixes'] = prefixes

    if csv_form.validate_on_submit() and csv_form.file.data:
        # Handle CSV file upload
        f = csv_form.file.data
        filename = secure_filename(f.filename)
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        f.save(filepath)

        # Get column count
        with open(filepath, mode='r', encoding='utf-8-sig') as file:
            reader = csv.reader(file)
            num_columns = len(next(reader))

        # Check if the CSV is already in the session
        if filename not in [csv_file['filename'] for csv_file in csv_files]:
            # Save CSV info in session
            csv_files.append({
                "filename": filename,
                "filepath": filepath,
                "num_columns": num_columns
            })
            session['csv_files'] = csv_files
            session.modified = True
        else:
            print(f"CSV file {filename} has already been uploaded.")

    return render_template("upload.html", shacl_form=shacl_form, csv_form=csv_form,
                           shacl_shapes=shacl_shapes, csv_files=csv_files)



@app.route("/map_properties", methods=['GET', 'POST'])
def map_properties():
    shacl_shapes = session.get('shacl_shapes', None)
    #print(shacl_shapes)
    csv_files = session.get('csv_files', [])

    # Provide CSV headers to the mapping interface
    csv_headers = {}
    for file_info in csv_files:
        with open(file_info['filepath'], mode='r', encoding='utf-8-sig') as file:
            reader = csv.reader(file)
            headers = next(reader)  # Get header row
            csv_headers[file_info['filename']] = headers

    return render_template("map_properties.html", shacl_shapes=shacl_shapes, csv_headers=csv_headers, csv_files=csv_files)


def generate_rdf(mappings, csv_files):
    g = Graph()

    # Loop through mappings and create RDF triples
    for rdf_property, mapping in mappings.items():
        #print(rdf_property, mapping)
        csv_file = mapping['file']
        csv_column = mapping['column']
        node_value = mapping['node_path']
        shape_path = mapping['shape_path']
        prop_path = mapping['prop_path']

        #print(node_value)

        # Find the CSV file
        file_path = next(file['filepath'] for file in csv_files if file['filename'] == csv_file)

        # Open the CSV and create triples
        with open(file_path, mode='r', encoding='utf-8-sig') as file:
            reader = csv.reader(file)
            headers = next(reader)  # Get header row

            for row in reader:
                numbers = row[int(csv_column)].split(',')
                # Ensure node_value is a string before concatenation
                if node_value:
                    objects=[]
                    # Concatenate node_value with each number and convert to URIRef
                    for number in numbers:
                        object_temp = URIRef(node_value[0] + number)
                        objects.append(object_temp)
                else:
                    objects = [Literal(row[int(csv_column)])]


                subject = URIRef(shape_path + quote(row[0]))  # Assumes first column is ID
                predicate = URIRef(prop_path)



                #print(subject, predicate, object)
                for object in objects:
                    g.add((subject, predicate, object))

    return g




@app.route("/download_rdf", methods=['POST'])
def download_rdf():
    # Extract mappings from form data
    form_data = request.form.to_dict(flat=False)
    #print(form_data)
    shacl_shapes = session.get('shacl_shapes', None)


    csv_files = session.get('csv_files', [])
    mappings = {}

    for shacl_shape in shacl_shapes:
        #print(shacl_shape)
        for prop in shacl_shape["properties"]:
            shape_path = shacl_shape["target_class"]
            prop_path = prop["path"]
            file_key = f"[{shape_path}_{prop_path}][file]"
            column_key = f"[{shape_path}_{prop_path}][column]"
            node_key = f"[{shape_path}_{prop_path}][target_class]"
            #print(node_key)

            if file_key in form_data and column_key in form_data:
                file_value = form_data[file_key]
                column_value = form_data[column_key]

                # Check if node_key is in form_data, if not assign a default value (None here) to node_value
                node_value = form_data[node_key] if node_key in form_data else None
                #print(node_value)

                for f, c in zip(file_value, column_value):
                    mappings[f"{shape_path}_{prop_path}"] = {"file": f,
                                                             "column": c,
                                                             "node_path": node_value,
                                                             "shape_path": shape_path,
                                                             "prop_path": prop_path
                                                             }

    # Generate the RDF graph
    g = generate_rdf(mappings, csv_files)

    # Match Prefixes
    prefixes = session.get('prefixes', None)
    #print(f"Prefixes after rdg-generation: {prefixes}")
    if prefixes:
        for prefix_dict in prefixes:
            #print(prefix_dict)
            # Extract prefix and namespace from the dictionary
            prefix = prefix_dict['prefix']
            namespace = URIRef(prefix_dict['namespace'])

            # Bind the prefix and namespace to the graph
            #print(f"Adding {prefix} with {namespace} to the Graph")
            g.bind(prefix, namespace)

    # Serialize the graph in a chosen format (e.g., Turtle)
    rdf_data = g.serialize(format='turtle')

    # Create a response with the RDF data
    response = Response(rdf_data, content_type="application/x-turtle;charset=UTF-8")
    response.headers["Content-Disposition"] = "attachment; filename=export.ttl"

    return response


@app.route("/clear_session", methods=['POST'])
def clear_session():
    session.clear()
    return redirect(url_for('upload_file'))


if __name__ == "__main__":
    app.run(debug=True)