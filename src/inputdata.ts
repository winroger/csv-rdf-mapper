import * as Papa from 'papaparse';

export interface DataSource {
  parse(): Promise<void>;
  getDataHeaders(): string[];
  getContentForHeader(header: string): any[];
}

export class InputData {
  data: { [key: string]: DataSource };

  constructor() {
    this.data = {};
  }

  async addCsv(file: File): Promise<void> {
    if (file && file.type === "text/csv") {
      const newCsvData = new CsvData(file);
      try {
        await newCsvData.parse();
        this.data[newCsvData.file.name] = newCsvData;
      } catch (error) {
        console.error("Error parsing CSV file:", error);
      }
    }
  }

  async addAirtable(records: { [key: string]: any }): Promise<void> {
    if (records) {
      for (const recordKey of Object.keys(records)) {
        const newAirtableData = new AirtableData(recordKey, records[recordKey]);
        try {
          await newAirtableData.parse();
          this.data[recordKey] = newAirtableData;
        } catch (error) {
          console.error("Error parsing Airtable records:", error);
        }
      }
    }
    console.log("new Airtable Data: ", this.data)
  }

  getFileNames(): string[] {
    return Object.keys(this.data);
  }

  getFileCount(): number {
    return Object.keys(this.data).length;
  }

  getHeaders(fileName: string): string[] {
    const dataSource = this.data[fileName];
    if (dataSource) {
      return dataSource.getDataHeaders();
    } else {
      return [];
    }
  }

  getContentForHeader(fileName: string, header: string): any[] {
    const dataSource = this.data[fileName];
    if (dataSource) {
      return dataSource.getContentForHeader(header);
    } else {
      return [];
    }
  }
}

export class CsvData implements DataSource {
  file: File;
  name: String;
  headers: string[];
  content: any[][];

  constructor(file: File) {
    this.file = file;
    this.name = this.file.name
    this.headers = [];
    this.content = [];
  }

  async parse(): Promise<void> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target) {
          const csvContent = (e.target.result as string).trim();
      
          Papa.parse(csvContent, {
            complete: (result: any) => {
              this.headers = result.data[0];
              this.content = result.data.slice(1);

              /// FIX THIS !!! ///
              /*
              const stakeholderIndex = this.headers.findIndex(header => header === "StakeholderIDs");
              
              if (stakeholderIndex !== -1) {
                this.content = this.content.map((row) => {
                  if (row[stakeholderIndex] !== undefined && row[stakeholderIndex] !== null) {
                    row[stakeholderIndex] = String(row[stakeholderIndex]).split(",");
                  }
                  return row;
                });
              }
              */
              /// FIX THIS END !!! ///

              resolve();
            },
            header: false,
            dynamicTyping: true,
            skipEmptyLines: true,
            error: (error: any) => {
              console.error("Error parsing CSV:", error);
              reject(error);
            }
          });
        } else {
          reject(new Error("CSV content is null"));
        }
      };
      

      reader.onerror = (e) => {
        console.error("Error reading file:", e);
        reject(e);
      };

      reader.readAsText(this.file);
    });
  }

  getDataHeaders(): string[] {
    return this.headers;
  }

  getContentForHeader(header: string): any[] {
    const headerIndex = this.headers.indexOf(header);
    if (headerIndex !== -1) {
      return this.content.map((row) => row[headerIndex]);
    } else {
      return [];
    }
  }
}

export class AirtableData implements DataSource {
  records: any[];
  name: string;
  headers: string[];
  content: any[][];
  recordIds: string[];

  constructor(name: string, records: any[]) {
    this.records = records;
    this.name = name;
    this.headers = [];
    this.content = [];
    this.recordIds = [];
  }

  async parse(): Promise<void> {
    for (const record of this.records) {
      this.recordIds.push(record.id)
      const recordFields = record.fields;
      if (this.headers.length === 0) {
        this.headers = Object.keys(recordFields);
      }
      const recordContent = this.headers.map(header => recordFields[header]);
      this.content.push(recordContent);
    }
  }

  getDataHeaders(): string[] {
    return this.headers;
  }

  getContentForHeader(header: string): any[] {
    const headerIndex = this.headers.indexOf(header);
    if (headerIndex !== -1) {
      return this.content.map((row) => row[headerIndex]);
    } else {
      return [];
    }
  }
}
