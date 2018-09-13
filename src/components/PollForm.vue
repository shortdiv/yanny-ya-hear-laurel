<template>
  <div>
    <h2>Which did you hear?</h2>
    <form name="yanny-v-laurel" method="post" data-netlify="true" data-netlify-honeypot="bot-field" @submit.prevent="handleSubmit">
      <input type="hidden" name="form-name" value="yanny-v-laurel" />
      <ul>
        <li v-for="(soundBite, index) in soundClips" :key="index">
          <label>
            <input
              type="radio"
              name="sound"
              :value="soundBite"
              :checked="soundBite === form.chosenClip"
              @input="ev => form.chosenClip = ev.target.value"
            >
            <span>{{ soundBite }}</span>
          </label>
        </li>
      </ul>
      <button type="submit">Just tell me already</button>
    </form>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "PollForm",
  data() {
    return {
      soundClips: ["Yanny", "Laurel", "Both"],
      form: {
        chosenClip: "Both"
      }
    };
  },
  methods: {
    ...mapActions("poll", ["fetchSubmissions", "postSubmission"]),
    handleSubmit() {
      this.postSubmission({
        "form-name": "yanny-v-laurel",
        clip: this.form.chosenClip
      })
        .then(() => {
          this.$router.push("thanks");
        })
        .catch(() => {
          this.$router.push("404");
        });
    }
  },
  created() {
    this.fetchSubmissions();
  }
};
</script>

<style>
button {
  text-align: center;
}
li {
  list-style: none;
  max-width: 100px;
  margin: 0 auto;
  text-align: left;
}
ul {
  text-align: center;
  padding: 0;
}
span {
  font-size: 1.35em;
  font-weight: 300;
}
button {
  cursor: pointer;
  display: block;
  margin: 0 auto;
  position: relative;
  display: block;
  margin: 0 auto;
  position: relative;
  border: none;
  border-radius: 5px;
  color: #fff;
  font-size: 1em;
  outline: none;
  padding: 10px 37px;
  background-color: #3eb882;
}
</style>
