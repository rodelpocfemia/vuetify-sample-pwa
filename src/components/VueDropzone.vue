<template>
    <v-container fluid>
    <v-layout row wrap>
        <v-flex xs12>
            <vue-dropzone ref="myVueDropzone" id="dropzone" :options="dropzoneOptions"></vue-dropzone>
        </v-flex>
    </v-layout>    
    <v-layout row wrap>
        <v-flex xs1>
            <v-btn @click="getFiles">getFiles</v-btn>
        </v-flex>
    </v-layout>    
  </v-container>
</template>
<script>
import XLSX from 'xlsx'
import vue2Dropzone from 'vue2-dropzone'
import 'vue2-dropzone/dist/vue2Dropzone.min.css'

const make_cols = refstr => Array(XLSX.utils.decode_range(refstr).e.c + 1).fill(0).map((x,i) => ({name:XLSX.utils.encode_col(i), key:i}));
const _SheetJSFT = [
	"xlsx", "xlsb", "xlsm", "xls", "xml", "csv", "txt", "ods", "fods", "uos", "sylk", "dif", "dbf", "prn", "qpw", "123", "wb*", "wq*", "html", "htm"
].map(function(x) { return "." + x; }).join(",");


export default {
  name: 'app',
  components: {
    'vue-dropzone': vue2Dropzone
  },
  props: {
      datajson: null
  },
  data () {
      return {
      upload_data: {},
      dropzoneOptions: {
        url: 'https://httpbin.org/post',
        thumbnailWidth: 200,
        addRemoveLinks: true,
        acceptedFiles: ".xls,.xlsx",
        dictDefaultMessage: "<i class='fa fa-cloud-upload'></i>UPLOAD ME",        
        init: function() {
            var self = this;            
            self.on("success", function (file) {               
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
               reader.readAsBinaryString(file);
            });
        }
      }
    }
  },
  methods: {
       _convertToJson(data)
      {
        //console.log(data);
        var arr = JSON.parse(data)			
        var labels = arr[0]
        
        var output = arr.slice(1).map(item => item.reduce((obj, val, index) => {
          obj[labels[index]] = val
          return obj
        }, {}))
        
        console.log(JSON.stringify(output))
      }
    }
  }

</script>