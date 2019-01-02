<template>
  <div style="padding:10px 10px 10px 10px;">
    <v-layout row wrap>
        <v-flex xs12>
            <b-form-file @change="this.readfile" accept=".xls, .xlsx" v-model="file" :state="Boolean(file)" placeholder="Browse or drag your upload here..."></b-form-file>
        </v-flex>
        </v-layout>
    </div>
</template>
<script>
import XLSX from 'xlsx'

const make_cols = refstr => Array(XLSX.utils.decode_range(refstr).e.c + 1).fill(0).map((x,i) => ({name:XLSX.utils.encode_col(i), key:i}));
const _SheetJSFT = [
	"xlsx", "xlsb", "xlsm", "xls", "xml", "csv", "txt", "ods", "fods", "uos", "sylk", "dif", "dbf", "prn", "qpw", "123", "wb*", "wq*", "html", "htm"
].map(function(x) { return "." + x; }).join(",");

export default {
  data () {
    return {
      file: null
    }
  },
  methods: {
      readfile (event) {
        //this.file = event.target.files
        this.file = event.target.files[0]
        console.log(this.file)
        const reader = new FileReader();
        reader.onload = (e) => {
        
            /* Parse data */
            const bstr = e.target.result;
            const wb = XLSX.read(bstr, {type:'binary'});

            /* Get first worksheet */
            const wsname = wb.SheetNames[0];
            const ws = wb.Sheets[wsname];

            /* Convert array of arrays */
            var range = XLSX.utils.decode_range(ws['!ref']);               
            const data = XLSX.utils.sheet_to_json(ws, {header:1});         
            /* Update state */
            this.data = JSON.stringify(data);
            this.cols = make_cols(ws['!ref']);
            this.datajson = this.data
            
            //convert to JSON
            var arr = JSON.parse(this.data)			
            var labels = arr[0]                
            var output = arr.slice(1).map(item => item.reduce((obj, val, index) => {
                            obj[labels[index]] = val
                            return obj
                        }, {}))
            
            console.log(JSON.stringify(output))
        }
        reader.readAsBinaryString(this.file);
      }
  }
}
</script>