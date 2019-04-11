<template>
  <v-form>
    <v-container>
      <v-layout row wrap>

        <v-flex xs12 sm6>
           <v-text-field
            v-model="text"
            solo
            append-icon="tag_faces"
            clearable
            @click:append="clickAppend"
          ></v-text-field>
             <picker set="emojione" v-show="displayEmoji" @select="addEmoji" :style="{ position: 'absolute', top: '97px', left: '138px'}" title="Sample"/>
        </v-flex>
     </v-layout>
      <v-layout>
        <v-flex xs12 sm6>
           <v-text-field
            style="position:absolute;bottom:0px;right:20px;margin-bottom:10px;"
            v-model="text"
            solo
            clearable
          ></v-text-field>
             
        </v-flex>

      </v-layout>
    </v-container>
  </v-form>
</template>
<script>
    import { Picker } from 'emoji-mart-vue'
    export default {
        components: {
            'picker': Picker
        },
        data() {
            return {
                text: '',
                emojiHtml: '',
                displayEmoji: false
            }
        },
        methods: {
            clickAppend() {
                console.log('clickAppends')
                this.displayEmoji = !this.displayEmoji
            },
            addEmoji(emoji) {
                console.log(JSON.stringify(emoji))

                if (this.text===null)
                    this.text = emoji.native
                else this.text += emoji.native
            },
        }
    }
</script>