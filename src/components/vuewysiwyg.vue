<template>
  <div>
      <!--https://github.com/chmln/vue-wysiwyg-->
      <wysiwyg v-model="myHTML" />
        <v-btn icon @click="clickAppend">
            <v-icon>tag_faces</v-icon>
        </v-btn>

        <!--https://github.com/jm-david/emoji-mart-vue-->
        <picker set="emojione" v-show="displayEmoji" @select="addEmoji" style="position:absolute;top:220px;left:50px;z-index:1;" title="Sample"/>
        <v-btn @click="writeData">Sample</v-btn>    
  </div>
</template>
<script>
import { Picker } from 'emoji-mart-vue'
export default {
    components: {
            'picker': Picker
        },
    data() {
        return {
            myHTML: null,
            text: '',
            emojiHtml: '',
            displayEmoji: false
        }
    },
    methods: {
        writeData() {
            console.log(this.myHTML)
        },
        clickAppend() {
            console.log('clickAppends')
            this.displayEmoji = !this.displayEmoji
        },
        addEmoji(emoji) {
            console.log(JSON.stringify(emoji))

            if (this.myHTML===null)
                this.myHTML = emoji.native
            else this.myHTML += emoji.native
        },
    }
}
</script>
<style>
@import "~vue-wysiwyg/dist/vueWysiwyg.css";
</style>