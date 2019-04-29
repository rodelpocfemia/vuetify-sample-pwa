<template>
    <div>
        <v-text-field v-model="scheduleId" style="width:500px;" label="Enter Scheduling Id"></v-text-field>
        <v-btn @click="addToGroup">Register</v-btn>

        <h3>{{serverResponse}}</h3>
    </div>
</template>

<script src="@aspnet/signalr/dist/browser/signalr.min.js"></script>
<script>

export default {
    data() {
        return {
            scheduleId: null,
            connection: null,
            serverResponse: null
        }
    },
    methods: {
        async addToGroup() {
            console.log('connection.start')
            await this.connection.start()
            console.log('connection started')

            this.connection.invoke('register',  this.scheduleId);

            this.connection.on('dashboardSchedulingMessage', data => {
                console.log('message from DashboardSchedulingMessage')
                console.log(data)
                this.serverResponse = data
            });
        }
    },
    created() {
        console.log('created')
         this.connection = new this.$signalR.HubConnectionBuilder()
                .withUrl(`http://localhost:56941/expertshub`) 
                .configureLogging(this.$signalR.LogLevel.Error)
                .build();
    }
}
</script>