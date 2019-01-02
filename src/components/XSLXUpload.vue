<template>
<div id="app">
  <link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/css/bootstrap.min.css'>
  <div class="container-responsive">
    <div class="row bg-primary">
      <div class="col-md-12">
        <h4>Webpage is created with HTML5 Drag and Drop , Excel file , xlsx.full.js , Vue.js </h4>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <h5>How to use:</h5>
        <ol>
          <li>Create Excel file with data...</li>
          <li>Drag Excel file to drop zone</li>
          <li>?</li>
          <li>View your Excel file in your client side only website.</li>
        </ol>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <div id="drop" @drop="handleDrop" @dragover="handleDragover" @dragenter="handleDragover">Drop Here</div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <table class="table table-striped table-hover table-condensed table-responsive">
          <thead>
            <tr>
              <th v-for="item in headers">{{item}}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in tickets">
              <td v-for="key in item">
                <label>{{key}}</label>
                <p>{{item.key}}</p>
              </td>
            </tr>
          </tbody>
          <tfoot></tfoot>
        </table>
      </div>
    </div>
  </div>
</div>
</template>
<script>

</script>