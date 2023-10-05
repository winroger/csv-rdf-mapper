$(document).ready(function(){
            console.log("Document is ready");

            $(document).on('change', '.csv-file-dropdown', function(){
                console.log("Change event triggered");
                var selected_file = $(this).val();
                console.log("Selected file: ", selected_file);
                var target_column_dropdown = $(this).closest('tr').find('.csv-column-dropdown');
                console.log("Target column dropdown: ", target_column_dropdown);

                var selected_file = $(this).val();

                var target_column_dropdown = $(this).closest('tr').find('.csv-column-dropdown');

                // Clear the column dropdown
                target_column_dropdown.empty();

                // Add the columns for the selected file
                var columns = csv_headers[selected_file];
                $.each(columns, function(index, column){
                    target_column_dropdown.append($("<option></option>").attr("value", index).text(column));
                });
            });
        });

        var csv_headers = {
            {% for filename, headers in csv_headers.items() %}
                "{{ filename }}": {{ headers | tojson }},
            {% endfor %}
        };
        console.log(csv_headers);