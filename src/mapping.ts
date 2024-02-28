type MappingValue = {
    dataFile: string;
    dataColumn: string;
  };
  
  export class Mapping {
    private mapping: Record<string, Record<string, MappingValue>>;
  
    constructor() {
      this.mapping = {};
    }
  
    addMapping(nodeId: string, nodeProp: string, dataFile: string, dataColumn: string): void {
      if (!this.mapping[nodeId]) {
        this.mapping[nodeId] = {};
      }
      this.mapping[nodeId][nodeProp] = { dataFile, dataColumn };
    }
  
    getMapping(nodeId: string, nodeProp: string): MappingValue | null {
      if (this.mapping[nodeId][nodeProp]) {
        return this.mapping[nodeId][nodeProp];
      }
      else {
        console.log("no mapping found for ", nodeId, nodeProp)
        return null
      }
    }

    getShapes() {
      return Object.keys(this.mapping)
    }

    getProperties(nodeId: string) {
      if (this.mapping[nodeId]) {
        return Object.keys(this.mapping[nodeId]);
      } else {
        return [];
      }
    }
    

    getMappingFile(nodeId: string) {
      const firstProp = Object.keys(this.mapping[nodeId])[0]
      const data = this.mapping[nodeId][firstProp]["dataFile"]
      return data
    }
  
    serializeToJson(): string {
      return JSON.stringify(this.mapping);
    }
  }
  